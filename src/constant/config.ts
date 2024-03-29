// Put your global configuration here
// example: Endpoint base url , assets endpoint, etc...

// eslint-disable-next-line no-undef
/* eslint-disable no-undef */
// Put your global configuration here
// example: Endpoint base url , assets endpoint, etc...

const environment = {
	dev: {
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL_DEV,
		version: '1.0.81'
	},
	staging: {
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL_STAGING,
		version: '1.0.60'
	},
	prod: {
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL_PROD,
		version: 'n/a'
	}
};

export const appStage = process.env.NEXT_PUBLIC_STAGE as keyof typeof environment;

export const config = environment['dev'];

export const baseUrl = config.baseUrl ?? 'localhost:3000/v1';

export const appStoreMobileUrl = 'https://apps.apple.com/id/app/rspi-mobile/id1181707029';
export const playStoreMobileUrl = 'https://play.google.com/store/apps/details?id=id.co.rspondokindah';

export const protectedRoutes = ['/patient-portal', '/user-information'];

export const blacklistedRouteMedicalRecordReminder = [
	'/patient-portal',
	'/doctor-detail',
	'/book-appointment',
	'/user-information',
	'/update-password'
];