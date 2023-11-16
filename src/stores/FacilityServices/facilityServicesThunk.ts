/* eslint-disable @typescript-eslint/no-unused-vars */
import { FacilityServicesDetail, PayloadFacilityServices } from '@/interface';
import { endpoints } from '@/constant';
import { thunkUtils } from '@/utils';

export const getFacilityServices = thunkUtils<FacilityServicesDetail[], PayloadFacilityServices>({
	type: 'facilityServices/facilityServices',
	method: 'GET',
	endpoint: endpoints.facilities,
});

export const getFacilityRelatedNews = thunkUtils({
	type: 'facilityServices/getFacilityRelatedNews',
	method: 'GET',
	endpoint: endpoints.newsFacilities,
});

export const getFacilityHospital = thunkUtils({
	type: 'facilityServices/getFacilityHospital',
	method: 'GET',
	endpoint: endpoints.facilityHospital,
});
