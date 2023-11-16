import { HospitalDetail, PayloadHospital } from '@/interface';
import { endpoints } from '@/constant';
import { thunkUtils } from '@/utils';
import { I_AppointmentPayload } from '@/interface/appointment';

export const getHospitals = thunkUtils<HospitalDetail[], PayloadHospital>({
	type: 'hospital/getHospitals',
	method: 'GET',
	endpoint: endpoints.hospital,
});

export const bookAppointment = thunkUtils<unknown, I_AppointmentPayload>({
	type: 'book/appointment',
	method: 'POST',
	endpoint: endpoints.bookAppointment
});
