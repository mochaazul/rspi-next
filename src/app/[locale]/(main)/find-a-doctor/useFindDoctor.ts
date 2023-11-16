import { PickerItem } from '@/components/ui/DropdownSearch';
import { createFieldConfig } from '@/helpers';
import { HospitalDetail } from '@/interface';
import { ClinicResponse } from '@/interface/clinic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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

type Props = {
	hospitals: HospitalDetail[],
	clinics: ClinicResponse[]
}

const useFindDoctor = ({ hospitals, clinics }:Props) => {

	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const createQueryString = (name: string, value: string): void => {
		const params = new URLSearchParams(searchParams);
		params.set(name, value);
		router.push(`${pathName}?${params.toString()}`, { scroll: false });
	};

	const deleteQueryString = (name: string): void => {
		const params = new URLSearchParams(searchParams);
		params.delete(name);
		router.push(`${pathName}?${params.toString()}`);
	};

	const filterHospital = () => {
		const obj = searchParams.get('hospital_code')?.split(',') ?? [];
		return hospitals.filter(hospital => obj?.includes(hospital.hospital_code)).map(item => ({
			hospital_code: item.hospital_code,
			id: item.id
		}));
	};

	const deleteHospitalFilter = (hospital_code: string) => {
		const values = searchParams.get('hospital_code')?.split(',') ?? [];
		const filteredValues = values.filter(item => item !== hospital_code);
		createQueryString('hospital_code', filteredValues.toString());
	};

	const clearHospitalFilter = () => {
		deleteQueryString('hospital_code');
	};

	const addSpecialty = (item: PickerItem) => {
		const prevSpecialty = searchParams.get('specialty_category');
		createQueryString('specialty_category', prevSpecialty ? prevSpecialty + ',' + item.speciality_code : item.speciality_code);
	};

	const deleteSpecialty = (item: PickerItem) => {
		const values = searchParams.get('clinic_code')?.split(',') ?? [];
		if (values.length < 2) {
			deleteQueryString('specialty_category');
			return;
		}
		const filteredSpecialty = values.filter(sp => sp !== item.specialty_code);
		createQueryString('specialty_category', filteredSpecialty.toString());
	};

	const getSpecialty = (): PickerItem[] => {
		const values = searchParams.get('specialty_category')?.split(',') ?? [];
		return clinics.filter(sp => values.includes(sp.clinic_code ?? '')).map((sp, index) => ({
			id: sp.id,
			label: sp?.clinic_name ?? '',
			specialty_code: sp.clinic_code
		}));
	};

	const getClinic = (): PickerItem[] => {
		const values = searchParams.get('clinic_code')?.split(',') ?? [];
		return clinics.filter(sp => values.includes(sp?.clinic_code ?? '')).map((sp, index) => ({
			id: sp.id,
			label: sp?.clinic_name ?? '',
			specialty_code: sp.clinic_code
		}));
	};

	const onDeletePills = (pillValue: { id: string, text: string, key: string; }) => {
		const currentParams = Object.fromEntries(searchParams);
		const removedParams = removeFromString(currentParams[pillValue.key], pillValue.id);
		if (pillValue.key === 'telemedicine') {
			createQueryString('telemedicine', 'false');
		} else {
			createQueryString(pillValue.key, removedParams);
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
	const clearSearchParams = () => {
		router.push(pathName);
	};
	const setDoctorName = (value: string) => {
		createQueryString('keyword', value);
	};
	const getDoctorName = () => {
		return searchParams.get('keyword');
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
		doctorNameFilter: {
			set: setDoctorName,
			get: getDoctorName
		},
		onDeletePills,
		createQueryString,
		clearSearchParams
	};
};

export default useFindDoctor;