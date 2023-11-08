import { PickerItem } from '@/components/DropdownSearch';
import { createFieldConfig, maxLengthRule, minLengthRule, requiredRule } from '@/helpers';
import { useTypedSelector } from '@/hooks';
import { HospitalState } from '@/interface';
import { I_SpecialitiesState } from '@/interface/specialities';
import { useSearchParams } from 'react-router-dom';

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
	const [searchParams, setSearchParams] = useSearchParams();

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
		setSearchParams(prev => {
			prev.set('hospital', filteredValues.toString());
			return prev;
		});
	};

	const clearHospitalFilter = () => {
		setSearchParams(prev => {
			prev.delete('hospital');
			return prev;
		});
	};

	const addSpecialty = (item: PickerItem) => {
		setSearchParams(prev => {
			const prevSpecialty = prev.get('specialty_category');
			prev.set('specialty_category', prevSpecialty ? prevSpecialty + ',' + item.speciality_code : item.speciality_code);
			return prev;
		});

	};

	const deleteSpecialty = (item: PickerItem) => {
		const values = searchParams.get('specialty_category')?.split(',') ?? [];
		if (values.length < 2) {
			setSearchParams(prev => {
				prev.delete('specialty_category');
				return prev;
			});
			return;
		}
		const filteredSpecialty = values.filter(sp => sp !== item.label);
		setSearchParams(prev => {
			prev.set('specialty_category', filteredSpecialty.toString());
			return prev;
		});
	};

	const getSpecialty = (): PickerItem[] => {
		const values = searchParams.get('specialty_category')?.split(',') ?? [];
		return specialities.filter(sp => values.includes(sp?.speciality ?? '')).map((sp, index) => ({
			id: sp.id,
			label: sp?.speciality ?? ''
		}));
	};

	const getClinic = (): PickerItem[] => {
		const values = searchParams.get('specialty_category')?.split(',') ?? [];
		return clinics.filter(sp => values.includes(sp?.clinic_code ?? '')).map((sp, index) => ({
			id: sp.id,
			label: sp?.clinic_name ?? ''
		}));
	};

	const onDeletePills = (pillValue: { id: string, text: string, key: string; }) => {
		const currentParams = Object.fromEntries(searchParams);
		const removedParams = removeFromString(currentParams[pillValue.key], pillValue.id);
		if (pillValue.key === 'telemedicine') {
			setSearchParams(prev => {
				prev.set('telemedicine', 'false');
				return prev;
			});
		} else {
			setSearchParams(prev => {
				prev.set(pillValue.key, removedParams);
				return prev;
			});
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