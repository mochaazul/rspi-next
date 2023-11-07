import { ResponseStatus } from 'interface';

export interface ContactUsState {
	loading: boolean;
	error: ResponseStatus;
	customMessage: string;
}

export type ContactUsSubmitType = {
	hospital_code: string;
	full_name: string;
	gender: string;
	email: string;
	phone: string;
	title: string;
	content: string;
};