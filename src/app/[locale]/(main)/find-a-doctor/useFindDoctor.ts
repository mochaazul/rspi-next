import { PickerItem } from '@/components/ui/DropdownSearch';
import { createFieldConfig, maxLengthRule, minLengthRule, requiredRule } from '@/helpers';
import { useTypedSelector } from '@/hooks';
import { HospitalState } from '@/interface';
import { I_SpecialitiesState } from '@/interface/specialities';
import { useSearchParams } from 'next/navigation';

export const searchFilterField = {
	day: {
		...createFieldConfig({
			name: 'day',
			type: 'select'
		}),
		validationRules: [
		]
	},
	hospital: {
		...createFieldConfig({
			name: 'hospital',
			type: 'checkbox'
		}),
		validationRules: [
		]
	}
};

const useFindDoctor = () => {
	const hospitalSelector = useTypedSelector<HospitalState>('hospital');
	const { specialities } = useTypedSelector<I_SpecialitiesState>('specialities');
	const { clinics } = useTypedSelector<I_SpecialitiesState>('specialities');
	const searchParams = useSearchParams()!;
	const params = new URLSearchParams(searchParams);

	const filterHospital = () => {
		const obj = searchParams.get('hospital')?.split(',') ?? [];
		return hospitalSelector.hospitals.filter(hospital => obj?.includes(hospital.hospital_code)).map(item => ({
			hospital_code: item.hospital_code,
			id: item.id
		}));
	};

	const deleteHospitalFilter = (hospital_code: string) => {
		const values = searchParams.get('hospital')?.split(',') ?? [];
		const filteredValues = values.filter(item => item !== hospital_code);
		params.set('hospital', filteredValues.toString());
	};

	const clearHospitalFilter = () => {
		params.delete('hospital');
	};

	const addSpecialty = (item: PickerItem) => {
		const prevSpecialty = params.get('clinic_code');
		params.set('clinic_code', prevSpecialty ? prevSpecialty + ',' + item.speciality_code : item.speciality_code);
	};

	const deleteSpecialty = (item: PickerItem) => {
		const values = searchParams.get('clinic_code')?.split(',') ?? [];
		if (values.length < 2) {
			params.delete('clinic_code');
			return;
		}
		const filteredSpecialty = values.filter(sp => sp !== item.label);
		params.set('clinic_code', filteredSpecialty.toString());
	};

	const getSpecialty = (): PickerItem[] => {
		const values = searchParams.get('clinic_code')?.split(',') ?? [];
		return specialities.filter(sp => values.includes(sp?.speciality ?? '')).map((sp, index) => ({
			id: sp.id,
			label: sp?.speciality ?? ''
		}));
	};

	const getClinic = (): PickerItem[] => {
		const values = searchParams.get('clinic_code')?.split(',') ?? [];
		return clinics.filter(sp => values.includes(sp?.clinic_code ?? '')).map((sp, index) => ({
			id: sp.id,
			label: sp?.clinic_name ?? ''
		}));
	};

	const onDeletePills = (pillValue: { id: string, text: string, key: string; }) => {
		const currentParams = Object.fromEntries(searchParams);
		const removedParams = removeFromString(currentParams[pillValue.key], pillValue.id);
		if (pillValue.key === 'telemedicine') {
			params.set('telemedicine', 'false');
		} else {
			params.set(pillValue.key, removedParams);
		}

	};

	const removeFromString = (currentVal: string, value: string) => {
		return currentVal
			.split(',')
			.filter(item => item !== value)
			.toString();
	};

	const getTelemedicineFIlter = () => {
		const values = searchParams.get('telemedicine');
		return values ? JSON.parse(values) : false;
	};

	const shouldRenderTelemedicine = () => {
		const pageRef = searchParams.get('ref');
		const isTelemedicine = searchParams.get('telemedicine') ?? 'false';
		if (pageRef && pageRef === 'landing' && JSON.parse(isTelemedicine)) return false;
		return true;
	};

	return {
		hospitalFilter: {
			delete: deleteHospitalFilter,
			clear: clearHospitalFilter,
			getAll: filterHospital
		},
		specialtyFilter: {
			add: addSpecialty,
			delete: deleteSpecialty,
			getAll: getSpecialty
		},
		clinicFilter: {
			add: addSpecialty,
			delete: deleteSpecialty,
			getAll: getClinic
		},
		telemedicineFilter: {
			get: getTelemedicineFIlter,
			shouldRender: shouldRenderTelemedicine
		},
		onDeletePills
	};
};

export default useFindDoctor;