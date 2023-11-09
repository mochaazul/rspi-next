export interface MedicalSpecialitiesState {
	medicalSpecialities: MedicalSpecialities[];
	detail: MedicalSpecialities[];
	loading: boolean;
}

export interface MedicalSpecialities {
	id?: number;
	title?: string;
	slug?: string;
	sub_title?: string;
	content?: string;
	author?: string;
	img_url?: string[];
	footer_category?: string;
	is_publish?: boolean;
	posted_date?: string;
	created_date?: string;
	updated_date?: string;
}

export interface GetMedicalSpecialitiesParams {
	slug?: string;
	footer_category?: string;
	limit?: number;
}