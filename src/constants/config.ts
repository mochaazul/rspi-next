// Put your global configuration here
// example: Endpoint base url , assets endpoint, etc...

// eslint-disable-next-line no-undef
/* eslint-disable no-undef */
// Put your global configuration here
// example: Endpoint base url , assets endpoint, etc...

const environment = {
	dev: {
		baseUrl: process.env.REACT_APP_BASE_URL_DEV,
		version: '1.0.81'
	},
	staging: {
		baseUrl: process.env.REACT_APP_BASE_URL_STAGING,
		version: '1.0.60'
	},
	prod: {
		baseUrl: process.env.REACT_APP_BASE_URL_PROD,
		version: 'n/a'
	}
};

export const appStage = process.env.REACT_APP_STAGE as keyof typeof environment;

export const config = environment['dev'];

export const baseUrl = config.baseUrl ?? 'localhost:3000/v1';