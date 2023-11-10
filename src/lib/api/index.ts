import {
	BannerDetail,
	CenterOfExcellenceDetail,
	CenterOfExcellenceState,
	FacilityServicesState,
	ForgotPasswordPayload,
	HospitalState,
	LoginPayload,
	NewPasswordPayload,
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