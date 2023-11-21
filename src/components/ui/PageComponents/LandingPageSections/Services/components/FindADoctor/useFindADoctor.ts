'use client';
import dayjs from 'dayjs';
import { requiredRule, createFieldConfig } from '@/helpers';
import { useRouter } from 'next/navigation';

const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type I_OnSubmitParam = {
	preferredDay?: string,
	hospital?: string;
	speciality?: string;
	doctorName?: string;
};

const useFindADoctor = () => {
	const router = useRouter();
	const findADoctorField = {
		doctorName: {
			...createFieldConfig({
				name: 'doctorName',
				type: 'text'
			}),
			validationRules: [
				requiredRule('doctorName'),
			],
		},
		hospital: {
			...createFieldConfig({
				name: 'hospital',
				type: 'select'
			}),
			validationRules: [
				requiredRule('hospital'),
			],
		},
		speciality: {
			...createFieldConfig({
				name: 'speciality',
				type: 'select',
			}),
			validationRules: [
				requiredRule('speciality'),
			],
			placeholder: 'speciality',
		},
		preferredDay: {
			...createFieldConfig({
				name: 'preferredDay',
				type: 'date'
			}),
			validationRules: [
				requiredRule('preferredDay'),
			],
		}
	};

	const onSubmitHandler = (doctorName: string, hospital: string, speciality: string, preferredDay: string, isTelemedicine: boolean) => {
		const search: Record<string, string> = {};
		if (preferredDay) search['day'] = Days[dayjs(preferredDay).get('day') ?? 0];
		if (hospital) search['hospital_code'] = hospital;
		if (doctorName) search['keyword'] = doctorName;
		if (speciality) search['clinic_code'] = speciality;
		if (isTelemedicine) search['telemedicine'] = 'true';
		search['ref'] = 'landing';
		const searchParam = new URLSearchParams(search);

		router.push('/find-a-doctor' + `?${ searchParam.toString() }`);
	};

	return {
		findADoctorField,
		dayConfig: Days,
		onSubmitHandler,
	};
};

export default useFindADoctor;
