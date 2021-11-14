/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  images: {
    domains: [
      'localhost',
      'www.cdc.gov',
      'paaws-bucket.s3.eu-west-1.amazonaws.com',
      'paaws-storage-s3.s3.amazonaws.com',
    ],
  },
};
