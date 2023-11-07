import dayjs from 'dayjs';

import { LastVisitedHospital } from 'interface/PatientProfile';

export const getLastVisitedHospitalHelper = (data: LastVisitedHospital[]) => {
	return data.sort((a, b) => {
		const dateTimeA = dayjs(`${a.adm_date} ${a.adm_time}`).unix();
		const dateTimeB = dayjs(`${b.adm_date} ${b.adm_time}`).unix();
		return dateTimeA - dateTimeB;
	})[0];
};