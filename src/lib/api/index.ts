import {
	BannerDetail, CenterOfExcellenceDetail,  CenterOfExcellenceState,  ForgotPasswordType,  HospitalState,  LoginType,  NewPasswordPayload, OTPType, Pagination,     RegisterOnboardType,     RegisterType,     ResendEmailVerificationType,     UpdatePasswordType,     UserData
} from '@/interface';
import fetcher from './utils/fetcher';

export const login = (payload: LoginType) => {
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

export const register = (payload: RegisterType) => {
	return fetcher<UserData>('register', { body: payload });
};

export const verifyEmail = (token: string) => {
	return fetcher<any>('verifyEmail', { query: token });
};

export const reVerifyEmail = (payload: ResendEmailVerificationType) => {
	return fetcher<any>('reVerifyEmail', { body: payload });
};

export const getUserProfile = () => {
	return fetcher<UserData>('profile');
};

export const validateOtp = (payload: OTPType) => {
	return fetcher<any>('otp', { body: payload });
};

export const registerOnboarding = (payload: RegisterOnboardType) => {
	return fetcher<any>('registerOnboard', { body: payload });
};

export const forgotPassword = (payload: ForgotPasswordType) => {
	return fetcher<UserData>('forgotPassword', { body: payload });
};

export const updatePassword = (payload: UpdatePasswordType) => {
	return fetcher<UserData>('updatePassword', { body: payload });
};

export const getBanner = (query?:any, pagination?: Pagination) => {
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