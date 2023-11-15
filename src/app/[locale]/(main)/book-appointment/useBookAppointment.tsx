import { createFieldConfig, requiredRule } from '@/helpers';

export const bookAppointmentFields = {
	name: {
		...createFieldConfig({
			name: 'name',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Name'
	},
	gender: {
		...createFieldConfig({
			name: 'gender',
			type: 'text'
		}),
		validationRules: [],

		placeholder: 'Gender'
	},
	dob: {
		...createFieldConfig({
			name: 'dob',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Date of Birth'
	},
	phone: {
		...createFieldConfig({
			name: 'phone',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Phone number / Whatsapp'
	},
	email: {
		...createFieldConfig({
			name: 'email',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'E-mail'
	},
	layanan: {
		...createFieldConfig({
			name: 'layanan',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Layanan'
	},
	klinik: {
		...createFieldConfig({
			name: 'klinik',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Klinik'
	},
	keluhan: {
		...createFieldConfig({
			name: 'keluhan',
			type: 'text'
		}),
		validationRules: [],

		placeholder: 'Keluhan utama saat ini'
	},
	tindakan: {
		...createFieldConfig({
			name: 'tindakan',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Keperluan Tindakan'
	},
	pembayaran: {
		...createFieldConfig({
			name: 'pembayaran',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Metode pembayaran'
	},
	asuransi: {
		...createFieldConfig({
			name: 'asuransi',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Nama asuransi'
	},
	noAsuransi: {
		...createFieldConfig({
			name: 'noAsuransi',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Nomor Asuransi'
	},
};

const useBookAppointment = () => {

	return {
		bookAppointmentFields
	};
};

export default useBookAppointment;