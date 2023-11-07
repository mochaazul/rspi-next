import { endpoints } from '@/constant';
import {
	I_LabResults, I_VaccineHistory, I_VisitHistory, LastVisitedHospital, PatientProfile, PatientUploadPhoto
} from '@/interface/PatientProfile';
import { thunkUtils } from '@/utils';

// function that accepts a Redux action type string and a callback function that should return a promise

export const getProfileDetail = thunkUtils<PatientProfile>({
	type: 'patient/profile',
	endpoint: endpoints.patients + '/profile',
	method: 'GET',
});

export const getLastVisitHospital = thunkUtils<I_VisitHistory[]>({
	type: 'patient/last-visited-hospital',
	endpoint: endpoints.patients + '/patient-portal/visit-histories',
	method: 'GET'
});

export const uploadPhotoProfile = thunkUtils<null, PatientUploadPhoto>({
	type: 'patient/photo',
	endpoint: endpoints.generalUploads,
	method: 'POST',
	isUpload: true,
});

export const getVaccineHistory = thunkUtils<I_VaccineHistory[]>({
	type: 'patient/vaccine-history',
	endpoint: endpoints.patients + '/patient-portal/vaccine-histories',
	method: 'GET',
});

export const getLabResults = thunkUtils<I_LabResults[]>({
	type: 'patient/lab-results',
	endpoint: endpoints.patients + '/patient-portal/lab-histories',
	method: 'GET'
});

export const getAppointmentList = thunkUtils<any[]>({
	type: 'patient/appointment-list',
	endpoint: endpoints.patients + '/patient-portal/appointments',
	method: 'GET'
});

export const getVisitHistories = thunkUtils<I_VisitHistory[]>({
	type: 'patient/visit-histories',
	endpoint: endpoints.patients + '/patient-portal/visit-histories',
	method: 'GET'
});

export const giveDoctorRating = thunkUtils({
	type: 'patient/visit-histories/give-ratings',
	endpoint: endpoints.patients + '/patient-portal/visit-histories',
	method: 'POST'
});