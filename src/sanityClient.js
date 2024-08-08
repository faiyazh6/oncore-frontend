import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'bh4x7js3', // Replace with your project ID
  dataset: 'production',
  useCdn: true
});