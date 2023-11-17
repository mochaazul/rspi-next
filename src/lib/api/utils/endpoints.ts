
// These are endpoints that will be used to call Backend endpoints services
const endpointData = {
	auth: { path: '/auths/login', method: 'POST' },
	verifyResetToken: { path: '/auths/verify-token', method: 'POST' },
	verifyChangeEmailToken: { path: '/auths/verify-email', method: 'POST' },
	newPassword: { path: '/auths/new-pass', method: 'POST' },
	register: { path: '/auths/register', method: 'POST' },
	verifyEmail: { path: '/auths/verify-email', method: 'POST' },
	reVerifyEmail: { path: '/auths/request-verify', method: 'POST' },
	registerOnboard: { path: '/patients/on-boarding', method: 'POST' },
	forgotPassword: { path: '/auths/forgot-pass', method: 'POST' },
	otp: { path: '/auths/validate-otp', method: 'POST' },
	cancelBooking: { path: '/books/cancel-booking', method: 'POST' },
	bookAppointment: { path: '/books', method: 'POST' },
	contactUs: { path: '/contact-us', method: 'POST' },
	generalUploads: { path: '/uploads', method: 'POST' },
	footerCategories: { path: '/footer-categories', method: 'POST' },
	notification: { path: '/notification', method: 'POST' },
	readNotification: { path: '/notification/seen', method: 'POST' },
	createFamilyProfile: { path: '/patients/family', method: 'POST' },
	changeEmail: { path: '/auths/request-verify', method: 'POST' },
	checkPin: { path: '/patients/pin', method: 'POST' },
	checkPatientPhone: { path: '/patients/check-patient-phone', method: 'POST' },
	doctorRating: { path: '/patients/patient-portal/visit-histories', method: 'POST' },

	// PUT
	updatePassword: { path: '/patients/update-password', method: 'PUT' },
	updateProfile: { path: '/patients/update-profile', method: 'PUT' },
	updatePin: { path: '/patients/update-pin', method: 'PUT' },
	updateEmail: { path: '/patients/update-email', method: 'PUT' },
	createPin: { path: '/patients/pin', method: 'PUT' },
	updateAvatar: { path: '/patients/update-avatar', method: 'PUT' },

	// GET
	patients: { path: '/patients', method: 'GET' },
	visitHistory: { path: '/patients/patient-portal/visit-histories', method: 'GET' },
	labHistory: { path: '/patients/patient-portal/lab-histories', method: 'GET' },
	vaccineHistory: { path: '/patients/patient-portal/vaccine-histories', method: 'GET' },
	banner: { path: '/banners', method: 'GET' },
	profile: { path: '/patients/profile', method: 'GET' },
	facilities: { path: '/facilities', method: 'GET' },
	centerOfExcellences: { path: '/center-of-excellences', method: 'GET' },
	awards: { path: '/awards', method: 'GET' },
	newsFacilities: { path: '/news-facilities', method: 'GET' },
	facilityHospital: { path: '/facilities-hospitals/facility', method: 'GET' },
	newsCenterOfExcellence: { path: '/center-of-excellences-news/news', method: 'GET' },
	doctorSchedule: { path: '/books/doctor-detail', method: 'GET' },
	doctorTimeSlot: { path: '/books/time-slot', method: 'GET' },
	doctorCalendar: { path: '/books/calendar', method: 'GET' },
	appointmentList: { path: '/patients/patient-portal/appointments', method: 'GET' },
	clinics: { path: '/clinics/clinic-category', method: 'GET' },
	hospital: { path: '/hospital', method: 'GET' },
	events: { path: '/events', method: 'GET' },
	article: { path: '/news', method: 'GET' },
	getFooter: { path: '/footer-pages', method: 'GET' },
	masterDoctor: { path: '/doctors/master', method: 'GET' },
	familyProfile: { path: '/patients/family', method: 'GET' },

	deleteFamilyProfile: { path: '/patients/family', method: 'DELETE' },

	getNotification: { path: '/notification', method: 'GET' },
	getNews: { path: '/news', method: 'GET' },
	getNewsSpecialtyByID: { path: '/specialities/related-specialities', method: 'GET' },
	getRelatedNews: { path: '/news/related-news', method: 'GET' },
	// No implementation / not yet implemented
	// pin: { path: '/patients/pin', method: 'POST' },
	// doctors: '/doctors' -> replaced by masterdoctor,
	// findDoctor: { path: '/find/doctor', method: 'GET' }, -> Replaced by master doctor since master doctor enpoint accept filtering
	// specialities: '/specialities',

} as const;

// Typing schema, do not modify if not necessary

type EndpointDefinition<T extends string> = {
	[key in T]: {
		method: 'GET' | 'POST' | 'PUT' | 'DELETE';
		path: string;
		payload?: any;
		params?: any;
	};
};
export type EndpointKey = keyof typeof endpointData;

export type EndpointDefs = EndpointDefinition<EndpointKey>;

const endpoints = endpointData;

export default endpoints;
