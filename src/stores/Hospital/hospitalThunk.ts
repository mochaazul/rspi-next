import { HospitalDetail, PayloadHospital } from 'interface';
import { endpoints } from 'constant';
import { thunkUtils } from 'utils';

export const getHospitals = thunkUtils<HospitalDetail[], PayloadHospital>({
	type: 'hospital/getHospitals',
	method: 'GET',
	endpoint: endpoints.hospital,
});