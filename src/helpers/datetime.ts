import dayjs from 'dayjs';
import { localStorage } from '@/helpers';
import { I_MasterDoctorClinicSchedule } from '@/interface';
import moment from 'moment';

type CalendarDayItem = {
	dayName: string,
	dates: Date[];
};

export type I_SerializedTimeSchedule = {
	day: string;
	time_frame: {
		time_from: string;
		time_to: string;
	}[];
};

export const formatTime = (time: string) => {
	return moment(time, 'HH:mm:ss').format('HH:mm');
};

export const splitDate = (time: string) => {
	return time?.split(' ')[0];
};

export const sortDays = (data: I_SerializedTimeSchedule[]) => {
	const lang = localStorage.getLanguage() ?? 'idn';
	const dayOrder = lang === 'idn'
		? ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
		: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

	return dayOrder.map(day => {
		const found = data.find(item => item.day.toLowerCase() == day);
		if (found) return { ...found };
	}).filter(item => item);
};

export const formatTimeslot = (timeSlot: string) => {
	return dayjs(timeSlot, 'HH:mm:ss').format('HH:mm');
};