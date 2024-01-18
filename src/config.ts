// Put your global configuration here
// example: Endpoint base url , assets endpoint, etc...

// eslint-disable-next-line no-undef
/* eslint-disable no-undef */
// Put your global configuration here
// example: Endpoint base url , assets endpoint, etc...

const environment = {
	dev: {
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL_DEV,
		version: '1.1.196-next'
	},
	staging: {
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL_STAGING,
		version: '1.1.166-next'
	},
	production: {
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION,
		version: 'n'
	}
};

export const appStage = process.env.STAGE as keyof typeof environment;

export const config = environment[appStage];

export const baseUrl = config?.baseUrl;