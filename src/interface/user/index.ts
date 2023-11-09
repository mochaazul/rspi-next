import { ResponseStatus } from 'interface';

export interface UserState {
	user: UserData;
	userDetail: UserDataDetail;
	loading: boolean;
	registerOnboard: boolean;
	error: ResponseStatus;
	customMessage?: string;
	token: string;
	stat_msg?: string;
	familyProfiles: FamilyProfile[];
	userAppointmentList?: [];
	newPasswordLoading: boolean;
}
export interface FamilyProfile {
	id: number;
	patient_code: string;
	name: string;
	parent_email: string;
	email: string;
	phone: string;
	birthdate: string;
	gender: string;
	no_mr: string;
	created_date: string;
	updated_date: string;
}

export interface FamilyProfilePayload {
	email: string;
	parent_email: string;
	phone: string;
	birthdate: string;
	gender: string;
	name: string;
}

export interface UserData {
	token?: string;
	patient_code?: string;
	email?: string;
	expired_at?: string;
	created_date?: string;
	medical_record: string,
	pin_status: boolean;
}
export interface UserDataDetail {
	id?: number;
	patient_code?: string;
	name?: string;
	email?: string;
	phone?: string;
	birthdate?: string;
	gender?: string;
	no_mr?: string;
	img_url?: string;
	is_verified?: boolean;
	created_date?: string;
	updated_date?: string;
	deleted_date?: string;
}

export type ResendEmailVerificationPayload = {
	email: string;
};

export type LoginPayload = {
	email: string;
	password: string;
};

export type RegisterPayload = {
	email: string;
	password: string;
	confirm_password: string;
};

export type PinType = {
	pin: string;
	confirm_pin: string;
};

export type CheckPinType = {
	pin: string;
};

export type OTPPayload = {
	otp: string;
};

export type RegisterOnboardPayload = {
	medical_record: string;
	phone: string;
	birth_date: string;
	name: string;
};

export type ForgotPasswordPayload = {
	email: string;
};

export type UpdatePasswordPayload = {
	new_password: string;
	confirm_password: string;
};

export type ChangeEmailPayload = {
	email: string;
};

export type NewPasswordPayload = {
	new_password: string;
	confirm_password: string;
};

export type UpdateAvatarType = {
	image_url: string;
};

export type UpdateProfileType = {
	name: string;
	birthdate: string;
	gender: string;
	phone: string;
};

export type UpdateEmailType = {
	email: string;
};
