import {
	ArticleDetail,
	ArticleState,
	BannerDetail,
	CenterOfExcellenceDetail,
	ContactUsState,
	ContactUsSubmitType,
	FooterDetail,
	ForgotPasswordType,
	HospitalDetail,
	NotificationResponse,
	OTPType,
	Pagination,
	PayloadBanner,
	UpdatePasswordType,
	UserData,
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

export const getCoe = (param?: ApiOptions) => {
	return fetcher<CenterOfExcellenceDetail[]>('centerOfExcellences', { ...param, query: { ...param?.query, is_publish: true, limit: param?.limit } });
};

export const getCenterOfExcellenceNewsByID = (param?: ApiOptions) => {
	return fetcher<any>('newsCenterOfExcellence', { ...param, query: { ...param?.query, is_publish: true } });
};

export const getHospitals = (params?: ApiOptions) => {
	return fetcher<HospitalDetail[]>('hospital', params);
};

export const getCenterOfExcellence = (param?: ApiOptions) => {
	return fetcher<CenterOfExcellenceDetail[]>('centerOfExcellences', { ...param, query: { ...param?.query, is_publish: true } });
};
export const getNotificationResponse = (param: ApiOptions) => {
	return fetcher<NotificationResponse>('getNotification', param);
};

export const postMarkNotifAllRead = (param: ApiOptions) => {
	return fetcher('readNotification', param);
};

// Footer
export const getFooterSlug = (params?: ApiOptions) => {
	return fetcher<FooterDetail[]>('getFooter', params);
};
// Contact
export const postContactUs = (param: { body: ContactUsSubmitType; }) => {
	return fetcher<ContactUsState>('contactUs', { body: param.body });
};

// Article
export const getArticle = (param?: ApiOptions) => {
	return fetcher<ArticleState>('getNews', param);
};

export const getNewsSpecialtyByID = (param?: ApiOptions) => {
	return fetcher<ArticleState['specialty']>('getNewsSpecialtyByID', param);
};

export const getArticleById = (param?: ApiOptions) => {
	return fetcher<ArticleDetail[]>('getNews', param);
};

export const getRelatedNews = (param?: ApiOptions) => {
	return fetcher<ArticleState['relatedNews']>('getRelatedNews', { ...param, query: { ...param?.query, is_publish: true } });
};