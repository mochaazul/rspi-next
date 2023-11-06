/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	FindDoctorDetail, I_MasterDoctorParams, I_MasterDoctor, PayloadFindDoctor, I_DoctorListDropdown, DoctorTimeSlot, TimeSlot
} from 'interface';
import { endpoints } from 'constant';
import { thunkUtils } from 'utils';

export const getDoctor = thunkUtils<FindDoctorDetail[], PayloadFindDoctor>({
	type: 'findDoctor/getDoctor',
	method: 'GET',
	endpoint: endpoints.findDoctor,
});

export const getDoctorDetail = thunkUtils<FindDoctorDetail, PayloadFindDoctor>({
	type: 'getDoctor/getDoctorDetail',
	method: 'GET',
	endpoint: endpoints.doctorSchedule,
});

export const getDoctorTimeSlot = thunkUtils<TimeSlot[]>({
	type: 'getDoctor/getDoctorTimeSlot',
	method: 'GET',
	endpoint: endpoints.doctorTimeSlot,
});

export const getAllDoctor = thunkUtils<I_MasterDoctor[]>({
	type: 'findDoctor/masterDoctor',
	method: 'GET',
	endpoint: endpoints.doctors + '/master'
});

// ONLY USED ON DROPDOWN
export const getDoctorListDropdown = thunkUtils<I_DoctorListDropdown[]>({
	type: 'findDoctor/doctorListDropdown',
	method: 'GET',
	endpoint: endpoints.doctors + '/list'
});