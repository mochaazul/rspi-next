// Put your global configuration here
// example: Endpoint base url , assets endpoint, etc...

// eslint-disable-next-line no-undef
/* eslint-disable no-undef */
// Put your global configuration here
// example: Endpoint base url , assets endpoint, etc...

const environment = {
	dev: {
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL_DEV,
		version: '1.1.150-next'
	},
	staging: {
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL_STAGING,
		version: '1.0.60'
	},
	prod: {
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL_PROD,
		version: 'n'
	}
};

export const appStage = process.env.NEXT_PUBLIC_STAGE as keyof typeof environment;

export const config = environment[appStage];

export const baseUrl = config?.baseUrl;