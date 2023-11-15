import {
	ArticleDetail,
	ArticleState,
	BannerDetail,
	CenterOfExcellenceDetail,
	CenterOfExcellenceState,
	ContactUsState,
	ContactUsSubmitType,
	FacilityServicesState,
	FooterState,
	ForgotPasswordPayload,
	HospitalState,
	LoginPayload,
	NewPasswordPayload,
	NotificationResponse,
	NotificationState,
	OTPPayload,
	RegisterOnboardPayload,
	RegisterPayload,
	ResendEmailVerificationPayload,
	UpdatePasswordPayload,
	UserData
} from '@/interface';
import fetcher from './utils/fetcher';

export const login = (payload: LoginPayload) => {
	return fetcher<UserData>('auth', { body: payload });
};

export const verifyResetToken = (token: string) => {
	return fetcher<any>('verifyResetToken', { query: token });
};
export const verifyChangeEmailToken = (token: string) => {
	return fetcher<any>('verifyChangeEmailToken', { query: token });
};

export const newPassword = (payload: NewPasswordPayload, token: string) => {
	return fetcher<any>('newPassword', { body: payload, query: { token } });
};

export const register = (payload: RegisterPayload) => {
	return fetcher<UserData>('register', { body: payload });
};

export const verifyEmail = (token: string) => {
	return fetcher<any>('verifyEmail', { query: token });
};

export const reVerifyEmail = (payload: ResendEmailVerificationPayload) => {
	return fetcher<any>('reVerifyEmail', { body: payload });
};

export const getUserProfile = () => {
	return fetcher<UserData>('profile');
};

export const validateOtp = (payload: OTPPayload) => {
	return fetcher<any>('otp', { body: payload });
};

export const registerOnboarding = (payload: RegisterOnboardPayload) => {
	return fetcher<any>('registerOnboard', { body: payload });
};

export const forgotPassword = (payload: ForgotPasswordPayload) => {
	return fetcher<UserData>('forgotPassword', { body: payload });
};

export const updatePassword = (payload: UpdatePasswordPayload) => {
	return fetcher<UserData>('updatePassword', { body: payload });
};

export const getBanner = () => {
	return fetcher<BannerDetail[]>('banner');
};

export const getCoe = () => {
	return fetcher<CenterOfExcellenceDetail[]>('centerOfExcellences');
};

export const getHospitals = () => {
	return fetcher<HospitalState>('hospital');
};

export const getCenterOfExcellence = () => {
	return fetcher<CenterOfExcellenceState>('centerOfExcellences');
};

export const getNotificationResponse = (param: { body?: any; param?: any; query?: any; } | undefined) => {
	return fetcher<NotificationResponse>('getNotification', param);
};

export const postMarkNotifAllRead = (param: { body?: any; param?: any; query?: any; } | undefined) => {
	return fetcher('readNotification', param);
};

// Footer
export const getFooterSlug = () => {
	return fetcher<FooterState>('getFooter');
};
// Contact
export const postContactUs = (param: { param: null; query: null; body: ContactUsSubmitType; }) => {
	return fetcher<ContactUsState>('contactUs', param);
};

// Article
export const getArticle = (param: { body?: any; param?: any; query?: any; } | undefined) => {
	return fetcher<ArticleState>('getNews', param);
};

export const getNewsSpecialtyByID = (param: { body?: any; param?: any; query?: any; } | undefined) => {
	return fetcher<ArticleState['specialty']>('getNewsSpecialtyByID', param);
};

export const getArticleById = (param: { body?: any; param?: any; query?: any; } | undefined) => {
	return fetcher<ArticleState['selectedArticle']>('getNews', param);
};