import { endpoints } from 'constant';
import { LastVisitedHospital, PatientProfile, PatientUploadPhoto } from 'interface/PatientProfile';
import { thunkUtils } from 'utils';

// function that accepts a Redux action type string and a callback function that should return a promise

export const getProfileDetail = thunkUtils<PatientProfile>({
	type: 'patient/profile',
	endpoint: endpoints.patients + '/profile',
	method: 'GET',
});

export const getLastVisitHospital = thunkUtils<LastVisitedHospital[]>({
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