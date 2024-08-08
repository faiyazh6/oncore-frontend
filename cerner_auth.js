async function(accessToken, ctx, cb) {
  const jwt = require('jsonwebtoken');
  const xml2js = require('xml2js');

  let profile = {};
  console.log("access token\n");
  console.log(accessToken);
  console.log("id token\n");
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
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/fhir+json'
      }
    }, (error, response, body) => {
      if (error) {
        console.error('Error fetching user details:', error);
        return cb(null, profile);
      }
      
      body = JSON.parse(body);

      // Set user_id
profile.user_id = body.id;

// Parse and set user profile information
if (body.name && body.name.length > 0) {
  const name = body.name[0];
  if (name.given && name.given.length > 0) {
    profile.given_name = name.given[0];
  }
  if (name.family) {
    profile.family_name = name.family;
  }
}

// Check if photo exists and set profile picture
if (body.photo && body.photo.length > 0) {
  profile.picture = body.photo[0].url;
}

// Check if telecom exists and set phone number and email
if (body.telecom && body.telecom.length > 0) {
  const emailTelecom = body.telecom.find(t => t.system === 'email');
  if (emailTelecom) {
    profile.email = emailTelecom.value;
  }

  const phoneTelecom = body.telecom.find(t => t.system === 'phone');
  if (phoneTelecom) {
    profile.phone_number = phoneTelecom.value;
  }
}

// Construct full name and nickname
profile.name = profile.given_name + " " + profile.family_name;
profile.nickname = profile.given_name;
      
      console.log(profile);

        // Call OAuth2 API with the accessToken and create the profile
        cb(null, profile);
      });

  } catch (error) {
    console.error('Error processing user registration:', error);
    cb(null, profile);
}
}
