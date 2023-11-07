import dayjs from 'dayjs';

import { I_VisitHistory, LastVisitedHospital } from 'interface/PatientProfile';

export const getLastVisitedHospitalHelper = (data: I_VisitHistory[]) => {
	return data.sort((a, b) => {
		const dateTimeA = dayjs(`${a.visit_date} ${a.visit_time}`).unix();
		const dateTimeB = dayjs(`${b.visit_date} ${b.visit_time}`).unix();
		return dateTimeB - dateTimeA;
	})[0];
};