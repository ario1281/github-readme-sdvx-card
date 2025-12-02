import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  turbopack: {
    root: path.resolve("./"),
  }
};

export default nextConfig;
