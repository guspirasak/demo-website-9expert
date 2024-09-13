/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@mdxeditor/editor'],
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
    // experimental: {
    //     instrumentationHook: true
    // },
    images: {
        minimumCacheTTL: 604800,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
            {
                protocol: "http",
                hostname: "*",
            },
        ],
        
    },
    eslint: {
        // TODO: remove this when deploy production
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    webpack(config) {
        config.resolve.fallback = { fs: false, child_process: false, }
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
}

module.exports = nextConfig
