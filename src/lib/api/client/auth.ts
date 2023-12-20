import useSWRMutation from 'swr/mutation';

import {
	CheckPhoneType,
	ForgotPasswordType,
	OTPType,
	PinType,
	RegisterOnboardType,
	RegisterType,
	ResendEmailVerificationType,
	UpdatePasswordType,
	UserData,
	CheckPinType
} from '@/interface';

import fetcher, { ApiOptions } from '../utils/fetcher';

export const useVerifyChangeEmailToken = (options?: ApiOptions) => {
	return useSWRMutation('verifyChangeEmailToken', (key, { arg }: { arg: { token: string; }; }) => fetcher<any>('verifyChangeEmailToken', { ...options, query: arg }));
};

export const useSetNewPassword = (options?: ApiOptions) => {
	return useSWRMutation('newPassword', (key, { arg }: { arg: ApiOptions; }) => fetcher<any>('newPassword', { ...options, ...arg }));
};

export const useUpdatePassword = (options?: ApiOptions) => {
	return useSWRMutation('updatePassword', (key, { arg }: { arg: UpdatePasswordType; }) => fetcher<any>('updatePassword', { ...options, body: arg }));
};

export const useVerifyResetToken = (options?: ApiOptions) => {
	return useSWRMutation('verifyResetToken', (key, { arg }: { arg: { token: string; }; }) => fetcher<any>('verifyResetToken', { ...options, query: arg }));
};

export const useRequestVerifyEmail = (options?: ApiOptions) => {
	return useSWRMutation('reVerifyEmail', (key, { arg }: { arg: ResendEmailVerificationType; }) => fetcher<any>('reVerifyEmail', { ...options, body: arg }));
};

export const useForgotPassword = (options?: ApiOptions) => {
	return useSWRMutation('forgotPassword', (key, { arg }: { arg: ForgotPasswordType; }) => fetcher<any>('forgotPassword', { ...options, body: arg }));
};

export const useRegister = (options?: ApiOptions) => {
	return useSWRMutation('register', (key, { arg }: { arg: RegisterType; }) => fetcher<UserData>('register', { ...options, body: arg }));
};

export const useCreatePin = (options?: ApiOptions) => {
	return useSWRMutation('createPin', (key, { arg }: { arg: PinType; }) => fetcher<any>('createPin', { ...options, body: arg }));
};

export const useUpdatePin = (options?: ApiOptions) => {
	return useSWRMutation('updatePin', (key, { arg }: { arg: PinType; }) => fetcher<any>('updatePin', { ...options, body: arg }));
};

export const useCreateOTP = (options?: ApiOptions) => {
	return useSWRMutation('otp', (key, { arg }: { arg: OTPType; }) => fetcher<any>('otp', { ...options, body: arg }));
};

export const useRegisterOnboard = (options?: ApiOptions) => {
	return useSWRMutation('registerOnboard', (key, { arg }: { arg: RegisterOnboardType; }) => fetcher<any>('registerOnboard', { ...options, body: arg }));
};

export const useCheckPhonePatient = (options?: ApiOptions) => {
	return useSWRMutation('checkPatientPhone', (key, { arg }: { arg: CheckPhoneType; }) => fetcher<any>('checkPatientPhone', { ...options, body: arg }));
};

export const usePostCheckPinMutation = (options?: ApiOptions) => {
	return useSWRMutation('checkPin', (key, { arg }: { arg: CheckPinType; }) => fetcher<UserData[]>('checkPin', { ...options, body: arg }));
};

export const usePostRequestEmailVerifPinMutation = (options?: ApiOptions) => {
	return useSWRMutation('reqEmailPin', (key) => fetcher<UserData[]>('reqEmailPin', { ...options }));
};

export const usePostVerificationEmailVerifPinMutation = (options?: ApiOptions) => {
	return useSWRMutation('verifyEmailPin', (key, { arg }: { arg: { token: string; }; }) => fetcher<any>('verifyEmailPin', { ...options, query: arg }));
};