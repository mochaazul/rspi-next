'use client';
import { ItemType } from '@/components/ui/Combobox';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const useFindADoctor = () => {
	const router = useRouter();

	const onSubmitHandler = (doctorName: ItemType | null, hospital: string, speciality: ItemType | null, preferredDay: string, isTelemedicine: boolean) => {
		const search: Record<string, string> = {};
		if (preferredDay) search['day'] = Days[dayjs(preferredDay).get('day') ?? 0];
		if (hospital) search['hospital_code'] = hospital;
		if (doctorName) search['keyword'] = `${doctorName.value}`;
		// if (speciality) search['specialty'] = `${speciality.label}`;
		if (speciality) search['clinic_category'] = `${speciality.value}`;
		if (isTelemedicine) search['telemedicine'] = 'true';
		search['ref'] = 'landing';
		const searchParam = new URLSearchParams(search);
		router.push('/find-a-doctor' + `?${ searchParam.toString() }`);
	};

	return {
		dayConfig: Days,
		onSubmitHandler,
	};
};

export default useFindADoctor;
