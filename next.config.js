/** @type {import('next').NextConfig} */

const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true
	},
	webpack(config) {
		config.module.rules.push({
			loader: '@svgr/webpack',
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: { removeViewBox: false },
							},
						},
					],
				},
				titleProp: true,
			},
			test: /\.svg$/,
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
				// hostname: 'rebel-env.s3.us-west-2.amazonaws.com',
				hostname: '**',
			},
			// {
			// 	protocol: 'https',
			// 	hostname: 'rspi-assets.s3-ap-southeast-1.amazonaws.com',
			// 	// hostname: '**',
			// },
			// {
			// 	protocol: 'https',
			// 	hostname: 'storage.googleapis.com'
			// }
		],
	},
	output: 'standalone',
};

module.exports = nextConfig;