/** @type {import('next').NextConfig} */

const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	reactStrictMode: false,
	compiler: {
		styledComponents: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	}
};

module.exports = nextConfig;