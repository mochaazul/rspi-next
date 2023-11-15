/* eslint-disable @typescript-eslint/no-unused-vars */
import { endpoints } from '@/constant';
import { thunkUtils } from '@/utils';
import { GetMedicalSpecialitiesParams, MedicalSpecialities } from '@/interface/MedicalSpecialities';

export const getMedicalSpecialitiesDispatch = thunkUtils<MedicalSpecialities[], GetMedicalSpecialitiesParams>({
	type: 'medicalSpecialities/getAll',
	method: 'GET',
	endpoint: endpoints.getFooter,
});