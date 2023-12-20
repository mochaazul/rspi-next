export interface I_AppointmentPayload {
	patient_id: string;
	patient_name: string;
	patient_gender: string;
	patient_dob: string;
	patient_phone: string;
	patient_email: string;
	book_doctor: string;
	book_location: string;
	book_date: string;
	book_time: string;
	book_slot: string;
	book_note: string;
	book_service: string;
	UserName: string;
	IpAddress: string;
}

export interface BookingPayload {
	patient_name: string;
	patient_code: string;
	slot_id: string;
	location: string;
	time_slot: string;
	date: string;
	user_name: string;
	type: string;
	doctor_code: string;
	gender: string;
	date_of_birth: string;
	phone: string;
	main_complaint: string;
	necessity_action: string;
	payment_method_idn: string;
	payment_method_en: string;
	service: string;
	hospital_code: string;
	insurance_name: string;
	insurance_number: string;
	insurance_front_img: string;
	insurance_back_img: string;
}