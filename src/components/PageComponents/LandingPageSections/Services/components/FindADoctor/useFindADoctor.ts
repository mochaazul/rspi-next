'use client';
import dayjs from 'dayjs';
import { requiredRule, createFieldConfig } from '@/helpers';

const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type I_OnSubmitParam = {
	preferredDay?: string,
	hospital?: string;
	speciality?: string;
	doctorName?: string;
};

const useFindADoctor = () => {
	const findADoctorField = {
		doctorName: {
			...createFieldConfig({
				name: 'doctorName',
				type: 'text'
			}),
			validationRules: [
				requiredRule('doctorName'),
			],
			label: 'doctorname'
		},
		hospital: {
			...createFieldConfig({
				name: 'hospital',
				type: 'select'
			}),
			validationRules: [
				requiredRule('hospital'),
			],
			placeholder: 'hospital',
			label: 'hospital'
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
			label: 'speciality'
		},
		preferredDay: {
			...createFieldConfig({
				name: 'preferredDay',
				type: 'date'
			}),
			validationRules: [
				requiredRule('preferredDay'),
			],
			label: 'date'
		}
	};
	// const { hospitals } = useTypedSelector<HospitalState>('hospital');
	// const { specialities } = useTypedSelector<I_SpecialitiesState>('specialities');
	// const { clinics } = useTypedSelector<I_SpecialitiesState>('specialities');

	// const { masterDoctors, pagination } = useTypedSelector<FindDoctorState>('findDoctor');

	// const getDoctorList = useAppDispatch(getDoctorListDropdown);
	// const getSpecialitiesDispatch = useAppDispatch(getSpecialities);
	// const getClinicsDispatch = useAppDispatch(getClinics);

	// const { navigate } = navigation();
	const onSubmitHandler = (doctorName: string, hospital: string, speciality: string, preferredDay: string, isTelemedicine: boolean) => {
		const search: Record<string, string> = {};

		if (preferredDay) search['day'] = Days[dayjs(preferredDay).get('day') ?? 0];
		if (hospital) search['hospital'] = hospital;
		if (doctorName) search['keyword'] = doctorName;
		if (speciality) search['specialty'] = speciality;
		if (isTelemedicine) search['telemedicine'] = 'true';
		search['ref'] = 'landing';

		// navigate({
		// 	pathname: '/find-a-doctor',
		// 	search: `?${ createSearchParams(search) }`
		// });
	};

	return {
		doctors: {
			// data: masterDoctors,
			// get: getDoctorList,
			// pagination
		},
		specialities: {
			// data: specialities,
			// get: getSpecialitiesDispatch
		},
		clinics: {
			// data: clinics,
			// get: getClinicsDispatch
		},
		findADoctorField,
		// hospitals,
		dayConfig: Days,
		onSubmitHandler,
	};
};

export default useFindADoctor;
