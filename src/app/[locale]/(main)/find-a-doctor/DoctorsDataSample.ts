import { Images } from '@/constant';

import DoctorsType from './DoctorsType';

export const DoctorScheduleSample: DoctorsType['hospitals'][0]['clinics'][0]['schedule'] = [
	{
		day: 'Senin',
		time: ['09:00 - 12:00', '13:00 - 14:00']
	},
	{
		day: 'Selasa',
		time: ['09:00 - 12:00', '13:00 - 15:00']
	},
	{
		day: 'Rabu',
		time: ['09:00 - 12:00', '13:00 - 14:00']
	},
	{
		day: 'Kamis',
		time: ['09:00 - 12:00']
	},
	{
		day: 'Jum\'at',
		time: ['09:00 - 12:00']
	},
	{
		day: 'Sabtu',
		time: ['09:00 - 12:00', '13:00 - 14:00']
	},
	{
		day: 'Minggu',
		time: ['09:00 - 12:00']
	},
];

export const DoctorDataSamples: DoctorsType[] = [
	{
		doctorName: 'Prof. Dr. dr. Aman Bhakti Pulungan, Sp.A, (K), FAAP, FRCPI (Hon.)',
		specialty: 'Anak',
		totalExperience: '10 yrs exp',
		isTelemedicine: true,
		photo: Images.Doctor1,
		hospitals: [
			{
				title: 'RSPI - Pondok Indah',
				clinics: [
					{
						name: 'Klinik Laktasi',
						schedule: DoctorScheduleSample
					},
					{
						name: 'Klinik Anak',
						schedule: DoctorScheduleSample
					}
				],
			},
			{
				title: 'RSPI - Puri Indah',
				clinics: [
					{
						name: 'Klinik Laktasi',
						schedule: DoctorScheduleSample
					},
					{
						name: 'Klinik Anak',
						schedule: DoctorScheduleSample
					}
				],
			},
			{
				title: 'RSPI - Bintaro Jaya',
				clinics: [
					{
						name: 'Klinik Laktasi',
						schedule: DoctorScheduleSample
					},
					{
						name: 'Klinik Anak',
						schedule: DoctorScheduleSample
					}
				],
			},
		]
	},
	{
		doctorName: 'Dr. John Doe',
		specialty: 'Radiology',
		totalExperience: '10 yrs exp',
		isTelemedicine: false,
		photo: Images.Doctor2,
		hospitals: [
			{
				title: 'RSPI - Pondok Indah',
				clinics: [
					{
						name: 'Klinik Radiologi',
						schedule: DoctorScheduleSample
					},
					{
						name: 'Klinik Saraf',
						schedule: DoctorScheduleSample
					}
				],
			},
			{
				title: 'RSPI - Puri Indah',
				clinics: [
					{
						name: 'Klinik Radiologi',
						schedule: DoctorScheduleSample
					},
					{
						name: 'Klinik Saraf',
						schedule: DoctorScheduleSample
					}
				],
			}
		]
	},
	{
		doctorName: 'Prof. Dr. Lorem Ipsum',
		specialty: 'Radiology',
		totalExperience: '100 yrs exp',
		isTelemedicine: true,
		photo: Images.Doctor3,
		hospitals: [
			{
				title: 'RSPI - Pondok Indah',
				clinics: [
					{
						name: 'Klinik Radiologi',
						schedule: DoctorScheduleSample
					},
					{
						name: 'Klinik Saraf',
						schedule: DoctorScheduleSample
					}
				],
			},
			{
				title: 'RSPI - Bintaro Jaya',
				clinics: [
					{
						name: 'Klinik Radiologi',
						schedule: DoctorScheduleSample
					},
					{
						name: 'Klinik Saraf',
						schedule: DoctorScheduleSample
					}
				],
			}
		]
	},
];