/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  images: {
    domains: ['localhost', 'www.cdc.gov', 'paaws-storage-s3.s3.amazonaws.com'],
  },
};
