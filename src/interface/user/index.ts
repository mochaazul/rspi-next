import { ResponseStatus } from '@/interface';

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
	medical_record?: string,
	pin_status?: boolean;
}
export interface UserDataDetail {
	birthdate: string;
	created_date: string;
	deleted_date: string;
	email: string;
	gender: string;
	id: number;
	img_url: string;
	is_verified: boolean;
	name: string;
	no_mr: string;
	patient_code: string;
	patient_id_rspi: string;
	phone: string;
	updated_date: string;
}

export type ResendEmailVerificationType = {
	email: string;
};

export type LoginType = {
	email: string;
	password: string;
};

export type RegisterType = {
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

export type OTPType = {
	otp: string;
};

export type RegisterOnboardType = {
	medical_record: string;
	phone: string;
	birth_date: string;
	name: string;
};

export type ForgotPasswordType = {
	email: string;
};

export type UpdatePasswordType = {
	old_password: string;
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
	img_url: string;
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

export type UserSessionData = {
	user: (UserDataDetail & UserData) | null;
	token: string;
	isAuthenticated: boolean;
};

export type CheckPhoneType = {
	phone: string;
};
