import { endpoints } from 'constant';
import {
	LoginType,
	RegisterType,
	PinType,
	UserData,
	RegisterOnboardType,
	OTPType,
	ForgotPasswordType,
	ResendEmailVerificationType,
	UpdatePasswordType,
	UpdateAvatarType,
	FamilyProfile,
	CheckPinType,
} from 'interface';
import { thunkUtils } from 'utils';

// function that accepts a Redux action type string and a callback function that should return a promise

export const login = thunkUtils<UserData, LoginType>({
	type: 'auth/login',
	endpoint: endpoints.auth,
	method: 'POST',
});

export const userDetail = thunkUtils<UserData, LoginType>({
	type: 'auth/userDetail',
	endpoint: endpoints.profile,
	method: 'GET',
});

export const register = thunkUtils<UserData, RegisterType>({
	type: 'auth/register',
	endpoint: endpoints.register,
	method: 'POST',
});

export const verifyEmail = thunkUtils<string>({
	type: 'auth/verify-email',
	endpoint: endpoints.verifyEmail,
	method: 'POST',
});

export const requestVerifyEmail = thunkUtils<null, ResendEmailVerificationType>({
	type: 'auth/resend-verify-email',
	endpoint: endpoints.reVerifyEmail,
	method: 'POST',
});

export const createPin = thunkUtils<UserData, PinType>({
	type: 'auth/pin',
	endpoint: endpoints.pin,
	method: 'PUT',
});

export const checkPin = thunkUtils<UserData, CheckPinType>({
	type: 'auth/check/pin',
	endpoint: endpoints.pin,
	method: 'POST',
});

export const createOTP = thunkUtils<UserData, OTPType>({
	type: 'auth/otp',
	endpoint: endpoints.otp,
	method: 'POST'
});

export const registerOnboard = thunkUtils<null, RegisterOnboardType>({
	type: 'auth/registerOnboard',
	endpoint: endpoints.registerOnboard,
	method: 'POST',
});

export const forgotPassword = thunkUtils<UserData, ForgotPasswordType>({
	type: 'auth/forgot-pass',
	endpoint: endpoints.forgotPassword,
	method: 'POST',
});

export const updatePassword = thunkUtils<UserData, UpdatePasswordType>({
	type: 'auth/update-password',
	endpoint: endpoints.updatePassword,
	method: 'PUT',
});

export const updateProfile = thunkUtils<UserData, UpdateAvatarType>({
	type: 'auth/update-profile',
	endpoint: endpoints.updateProfile,
	method: 'PUT',
});

export const updateEmail = thunkUtils<UserData, UpdateAvatarType>({
	type: 'auth/update-email',
	endpoint: endpoints.updateEmail,
	method: 'PUT',
});

export const changeEmail = thunkUtils({
	type: 'auths/request-verify',
	endpoint: endpoints.changeEmail,
	method: 'POST',
});

export const updatePin = thunkUtils<UserData, PinType>({
	type: 'auth/pin',
	endpoint: endpoints.updatePin,
	method: 'PUT',
});

export const getFamilyProfiles = thunkUtils<FamilyProfile[]>({
	type: 'profile/familyProfile',
	endpoint: endpoints.familyProfile,
	method: 'GET'
});

export const addFamilyProfile = thunkUtils<FamilyProfile>({
	type: 'profile/addFamilyProfile',
	endpoint: endpoints.familyProfile,
	method: 'POST'
});

export const deleteFamilyProfile = thunkUtils<FamilyProfile>({
	type: 'profile/deleteFamilyProfile',
	endpoint: endpoints.familyProfile,
	method: 'DELETE'
});

export const getAppointmentList = thunkUtils<[]>({
	type: 'profile/appointment-list',
	endpoint: endpoints.appointmentList,
	method: 'GET'
});

export const verifyResetToken = thunkUtils({
	type: 'profile/verify-reset-token',
	endpoint: endpoints.verifyResetToken,
	method: 'POST'
});

export const verifyEmailToken = thunkUtils({
	type: 'auths/verify-email',
	endpoint: endpoints.verifyChangeEmailToken,
	method: 'POST'
});

export const setNewPassword = thunkUtils({
	type: 'profile/new-password',
	endpoint: endpoints.newPassword,
	method: 'POST'
});