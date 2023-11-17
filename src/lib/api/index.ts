import {
	ArticleState,
	BannerDetail,
	CenterOfExcellenceDetail,
	CenterOfExcellenceState,
	ContactUsState,
	FooterState,
	ForgotPasswordType,
	HospitalState,
	NotificationResponse,
	OTPType,
	Pagination,
	PayloadBanner,
	UpdatePasswordType,
	UserData
} from '@/interface';
import fetcher, { ApiOptions } from './utils/fetcher';

export const verifyChangeEmailToken = (token: string) => {
	return fetcher<any>('verifyChangeEmailToken', { query: { token } });
};

export const getUserProfile = () => {
	return fetcher<UserData>('profile');
};

export const validateOtp = (payload: OTPType) => {
	return fetcher<any>('otp', { body: payload });
};

export const forgotPassword = (payload: ForgotPasswordType) => {
	return fetcher<UserData>('forgotPassword', { body: payload });
};

export const updatePassword = (payload: UpdatePasswordType) => {
	return fetcher<UserData>('updatePassword', { body: payload });
};

export const getBanner = (query?: PayloadBanner, pagination?: Pagination) => {
	return fetcher<BannerDetail[]>('banner', { pagination, query });
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
export const getNotificationResponse = (param: ApiOptions| undefined) => {
	return fetcher<NotificationResponse>('getNotification', param);
};

export const postMarkNotifAllRead = (param: ApiOptions| undefined) => {
	return fetcher('readNotification', param);
};

// Footer
export const getFooterSlug = () => {
	return fetcher<FooterState>('getFooter');
};
// Contact
export const postContactUs = (param: ApiOptions | undefined) => {
	return fetcher<ContactUsState>('contactUs', param);
};

// Article
export const getArticle = (param: ApiOptions| undefined) => {
	return fetcher<ArticleState>('getNews', param);
};

export const getNewsSpecialtyByID = (param: ApiOptions| undefined) => {
	return fetcher<ArticleState['specialty']>('getNewsSpecialtyByID', param);
};

export const getArticleById = (param: ApiOptions| undefined) => {
	return fetcher<ArticleState['selectedArticle']>('getNews', param);
};

export const getRelatedNews = (param: ApiOptions| undefined) => {
	return fetcher<ArticleState['relatedNews']>('getRelatedNews', param);
};