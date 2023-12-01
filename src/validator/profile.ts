import * as yup from 'yup';

import { DefaultPinYup, DefaultEmailYup } from './defaultYup';

export const UpdateProfileSchema = yup.object().shape({
	name: yup.string(),
	phone: yup.string(),
	birth_date: yup.string(),
	gender: yup.string()
});

export const UpdateEmailSchema = yup.object().shape({
	email: DefaultEmailYup
});

export const CheckPinSchema = yup.object().shape({
	pin: DefaultPinYup
});

export const UploadPhotoSchema = yup.object().shape({
	photo_file: yup
		.mixed()
		.test('type', 'fileNotValid', (value: any) => {
			return value && (['image/jpg', 'image/jpeg', 'image/png']?.includes(value?.type));
		})
		.test('fileSize', 'maxFileSize_800k', (value: any) => {
			return value && value?.size / 1024 / 1024 <= 0.8;
		})
		.required('required')
});