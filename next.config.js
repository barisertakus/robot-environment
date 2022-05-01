/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images:{
    domains: ["st3.depositphotos.com"]
  }
}

module.exports = nextConfig
