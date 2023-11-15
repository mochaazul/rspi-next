/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindDoctorDetail, I_MasterDoctorParams, I_MasterDoctor, PayloadFindDoctor } from '@/interface';
import { endpoints } from '@/constant';
import { thunkUtils } from '@/utils';
import { I_ClinicsResponse, I_SpecialitiesResponse, PayloadClinic } from '@/interface/specialities';

export const getSpecialities = thunkUtils<I_SpecialitiesResponse[]>({
	type: 'specialities/getAll',
	method: 'GET',
	endpoint: endpoints.specialities + '/list',
});

export const getClinics = thunkUtils<I_ClinicsResponse[], PayloadClinic>({
	type: 'clinics/getAll',
	method: 'GET',
	endpoint: endpoints.clinics,
});
