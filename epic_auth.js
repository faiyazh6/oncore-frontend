async function(accessToken, ctx, cb) {
  const jwt = require('jsonwebtoken');
  const xml2js = require('xml2js');

  let profile = {};

  console.log(ctx.id_token);

  try {
    // Decode the id_token to extract the payload
    const decodedToken = jwt.decode(ctx.id_token);

    // Extract fhirUser URL from the decoded token
    const fhirUserUrl = decodedToken.fhirUser;

    console.log(fhirUserUrl);

    if (!fhirUserUrl) {
      console.log('No fhirUser URL found in the id_token');
      return cb(null, profile);
    }

    // Fetch user details from FHIR API with Authorization header
    request.get({
      url: fhirUserUrl,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }, (error, response, body) => {
      if (error) {
        console.error('Error fetching user details:', error);
        return cb(null, profile);
      }

      // Convert XML to JSON
      xml2js.parseString(body, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          return cb(null, profile);
        }

        const fhirUserDetails = result.Practitioner;
        
        profile.user_id = fhirUserDetails.id.$.value;

        // Parse and set user profile information
        if (fhirUserDetails.name) {
          const { given, family } = fhirUserDetails.name;
          if (given && given.$ && given.$.value) {
            profile.given_name = given.$.value;
          }
          if (family && family.$ && family.$.value) {
            profile.family_name = family.$.value;
          }
        }

        // Assuming photo and telecom have a similar structure if they exist
        if (fhirUserDetails.photo && fhirUserDetails.photo.length > 0) {
          profile.picture = fhirUserDetails.photo[0].url;
        }

        if (fhirUserDetails.telecom && fhirUserDetails.telecom.$) {
          profile.phone_number = fhirUserDetails.telecom.$.value;
        }
        
        profile.name = profile.given_name + " " + profile.family_name;
        profile.nickname = profile.given_name;

        // Call OAuth2 API with the accessToken and create the profile
        cb(null, profile);
      });
    });

  } catch (error) {
    console.error('Error processing user registration:', error);
    cb(null, profile);
  }
}
