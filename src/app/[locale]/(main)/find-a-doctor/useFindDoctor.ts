import { ItemType } from '@/components/ui/Combobox';
import { PickerItem } from '@/components/ui/DropdownSearch';
import { createFieldConfig } from '@/helpers';
import { HospitalDetail } from '@/interface';
import { ClinicResponse } from '@/interface/clinic';
import { I_SpecialtyDropdownResponse } from '@/interface/specialities';
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
	clinics: I_SpecialtyDropdownResponse[];
};

const useFindDoctor = ({ hospitals, clinics }: Props) => {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();
	
	const createQueryString = (name: string, value: string): void => {
		const params = new URLSearchParams(searchParams);
		params.set(name, value);
		router.push(`${ pathName }?${ params.toString() }`, {});
	};
	
	const createQueryStringArray = (items: any[]): void => {
		const params = new URLSearchParams(searchParams);
		
		items.map(item => {
			params.set(item.key, item.value);
		});
		router.push(`${ pathName }?${ params.toString() }`, {});
	};

	const deleteQueryString = (name: string): void => {
		const params = new URLSearchParams(searchParams);
		params.delete(name);
		router.push(`${ pathName }?${ params.toString() }`);
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

	const addSpecialty = (item: ItemType | null) => {
		
		// Mengambil param berdasarkan nama param
		const prevSpecialty = searchParams.get('specialty');
		const prevClinicCat = searchParams.get('clinic_category');

		// memeriksa & membuat variable untuk menampung data param baru / menambah param yang sudah ada
		const itemSpecialty = prevSpecialty ? prevSpecialty + ',' + `${item?.label ?? ''}` : `${item?.label ?? ''}`;
		const itemClinicCat = prevClinicCat ? prevClinicCat + ',' + `${item?.value ?? ''}` : `${item?.value ?? ''}`;
		
		// Memanggil array baru, untuk memuat multi param, karena banyak data specialty/clinic_category yang dobel, jadi untuk filter harus di compare dengan 2 data (specialty & clinic_category)
		const createArrayMultiParam = [
			{
				key: 'clinic_category',
				value: itemClinicCat,
			},
			{
				key: 'specialty',
				value: itemSpecialty
			}
		];
		createQueryStringArray(createArrayMultiParam);
		
	};

  	const deleteSpecialty = (item: ItemType | null) => {
		const values = searchParams.get('clinic_category')?.split(',') ?? [];
		if (values.length < 2) {
			deleteQueryString('clinic_category');
			deleteQueryString('specialty');
			return;
		}
		const filteredSpecialty = values.filter(sp => sp !== item?.label);
		const filteredClinicCat = values.filter(sp => sp !== item?.value);
		// Memanggil array baru, untuk memuat multi param, karena banyak data specialty/clinic_category yang dobel, jadi untuk filter harus di compare dengan 2 data (specialty & clinic_category)
		const createArrayMultiParam = [
			{
				key: 'clinic_category',
				value: filteredClinicCat.toString(),
			},
			{
				key: 'specialty',
				value: filteredSpecialty.toString()
			}
		];
		
		createQueryStringArray(createArrayMultiParam);
	};

	const getSpecialty = (): ItemType[] => {
		const values = searchParams.get('clinic_category')?.split(',') ?? [];
		return clinics.filter(sp => values.includes(sp.clinic_category ?? '')).map((sp, index) => ({
			id: sp.specialty,
			label: sp?.specialty ?? '',
			value: sp.clinic_category
		}));
	};

	const getMatchSpecialty = (): ItemType[] => {
		// Memanggil 2 param clinic_category & specialty
		const valuesClinicCat = searchParams.get('clinic_category')?.split(',') ?? [];
		const valuesSpecialty = searchParams.get('specialty')?.split(',') ?? [];

		// Melakukan filter dengan dengan kriteria clinic_category & specialty sesuai dengan param
		return clinics.filter(sp => valuesClinicCat.includes(sp.clinic_category ?? '') && valuesSpecialty.includes(sp.specialty ?? '')).map((sp, index) => ({
			id: sp.specialty,
			label: sp?.specialty ?? '',
			value: sp.clinic_category
		}));
	};

	const getClinic = (): ItemType[] => {
		const values = searchParams.get('clinic_category')?.split(',') ?? [];
		return clinics.filter(sp => values.includes(sp?.clinic_category ?? '')).map((sp, index) => ({
			id: sp.specialty,
			label: sp?.specialty ?? '',
			value: sp.clinic_category
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
			getAll: getSpecialty,
			getMatch: getMatchSpecialty,
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