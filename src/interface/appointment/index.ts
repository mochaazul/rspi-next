export interface I_AppointmentPayload{
	'slot_id': string,
	'location': string, // clinic code
	'time_slot': string,
	'date': string,
	'user_name':string, // terserah
	'type': string, // self or other
	'doctor_code': string,
	'gender': string,
	'patient_name': string,
	'date_of_birth':string,
	'phone':string,
	'email':string,
	'main_complaint':string,
	'necessity_action':string,
	'payment_method':string,
	'service': string, // TEL / APP
	'hospital_code': string
}