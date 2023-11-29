import { FormikProps, useFormik } from 'formik';
import { ModalHeader, ProfileModalContainer } from './style';
import { colors, icons } from '@/constant';
import { FormRow } from '@/app/[locale]/(main)/book-appointment/style';
import { UserDataDetail } from '@/interface';

import NotificationPanel from '@/components/ui/NotificationPanel';
import { useEffect, useState } from 'react';
import Form from '@/components/ui/Form';
import Modal from '@/components/ui/Modal';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useFamilyProfileMutation, useGetProfile } from '@/lib/api/client/profile';
import { useScopedI18n } from '@/locales/client';
import { AddProfileSchema } from '@/validator/booking';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';

type Props = {
	onClose: (profile: ProfilePayload, isMain?: boolean) => void;
	visible: boolean;
	isMain?: boolean,
	selfProfile?: UserDataDetail;
	type: string;
};

export type ProfilePayload = {
	dob: string;
	email: string;
	gender: string;
	name: string;
	phone: string;
};

const AddProfileModal = ({ onClose, visible, isMain, selfProfile, type }: Props) => {

	const t = useScopedI18n('page.bookingAppointment');
	const tValidation = useScopedI18n('validation.formValidation');

	// TODO: migrate
	const { data: userProfile } = useGetProfile();
	// const clikUpdateProfile = useAppDispatch<UpdateProfileType>(updateProfile);
	// const getUserDetail = useAppAsyncDispatch<UserDataDetail>(userDetailAction);

	// const addFamilyProfileDispatch = useAppAsyncDispatch<FamilyProfilePayload>(addFamilyProfile);
	// End migrate

	const { data, trigger: createFamilyProfile, isMutating, error: createFamilyMutationError, reset: resetMutation } = useFamilyProfileMutation();
	const [error, setError] = useState<string>('');
	const [disabledEmail, setDisabledEmail] = useState<boolean>(false);
	const [enableValidation, setEnableValidation] = useState<boolean>(false);

	const formikProfile: FormikProps<ProfilePayload> = useFormik<ProfilePayload>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: AddProfileSchema,
		initialValues: {
			dob: '',
			email: '',
			gender: '',
			name: '',
			phone: ''
		},
		onSubmit: async (values: ProfilePayload) => {
			const { dob, email, gender, name, phone } = values;
			// if (type === 'other') {
			await createFamilyProfile({
				birthdate: dob,
				parent_email: selfProfile?.email ?? '',
				email: email,
				name: name,
				phone: cleanUpMask(phone),
				gender: gender
			});
			closeHandler();
			// } else {
			// 	const payload = {
			// 		name: name.value,
			// 		birthdate: dob.value,
			// 		gender: gender.value,
			// 		phone: cleanUpMask(phone.value)
			// 	};
			// 	TODO: migrate;
			// 	const response = await clikUpdateProfile({
			// 		payload
			// 	});
			// 	if (response.payload.stat_msg === 'Success') {
			// 		setDisabledEmail(false);
			// 		await getUserDetail();
			// 		onClose({
			// 			dob: dob.value,
			// 			email: email.value,
			// 			gender: gender.value,
			// 			name: name.value,
			// 			phone: phone.value
			// 		});
			// 		// TODO: migrate;
			// 	}
			// 	setError(response.payload.stat_msg);
			// }
			// setFieldsValue({
			// 	email: '',
			// 	name: '',
			// 	birthdate: '',
			// 	gender: '',
			// 	phone: ''
			// });
		},
	});

	useEffect(() => {
		resetMutation(); // we need this to clear errors
	}, []);

	const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setEnableValidation(true);
		formikProfile.handleSubmit();
	};

	const cleanUpMask = (value: string) => {
		return value
			.replace('+62', '0')
			.replaceAll(' ', '')
			.replaceAll('-', '')
			.trim();
	};

	const mapError = () => {
		if (createFamilyMutationError && createFamilyMutationError.message.toLowerCase() === 'validation error') return t('validationError');
		return createFamilyMutationError && createFamilyMutationError.message;
	};

	const closeHandler = () => {
		onClose({
			dob: '',
			email: '',
			gender: '',
			name: '',
			phone: ''
		});
		formikProfile.resetForm();
	};

	useEffect(() => {
		if (type === 'self') {
			// TODO: migrate
			// setFieldsValue({
			// 	email: userProfile?.data?.email
			// });
			setDisabledEmail(true);
		}
	}, [type]);

	const regexPhone = (phone: string) => {
		let phoneNumber =
			phone
				.replace(/^0/, '').replace(/^62/, '');
		return phoneNumber;
	};

	const onChangeInputValue = (data: { name?: string; value?: string; }) => {
		if (data?.name) {
			formikProfile.setFieldValue(data?.name, data?.value ?? '');
		}
	};

	const onChangeInputPhone = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		formikProfile.setFieldValue(e.target.id, regexPhone(e.target.value));
	};

	const getInputErrorMessage = (key?: string, label?: string) => {
		return getValidationTranslation(tValidation, key, { label });
	};

	return <Modal
		visible={ visible }
		noPadding
		width='526px'
		onClose={ closeHandler }
		borderRadius='12px'
		overflow='none'
		containerClassName='m-[10px]'
	>
		<ProfileModalContainer>
			<ModalHeader>
				<Text
					subClassName='max-sm:text-[16px]'
					fontSize='24px'
					fontWeight='700'
					lineHeight='28px'
					text={ selfProfile ? t('profileSelector.selfLabel') : t('profileSelector.other') } />
				<div className='cursor-pointer' onClick={ closeHandler }>
					<icons.Close alt='' />
				</div>
			</ModalHeader>
			<NotificationPanel
				showIconLeft={ false }
				showIconRight={ false }
				mode={ 'error' }
				visible={ !!createFamilyMutationError }
			>
				<Text
					fontType={ null }
					fontSize='14px'
					fontWeight='500'
					text={ mapError() }
					color={ colors.red.default }
				/>
			</NotificationPanel>
			<Form onSubmit={ onSubmitHandler } className='mt-[8px]'>
				<FormRow
					className='grid grid-cols-2 gap-[16px] md:gap-[24px]'
				>
					<Form.TextField
						labelClassName='font-normal'
						labelGap={ 8 }
						id='name'
						name='name'
						value={ formikProfile.values.name }
						onChange={ formikProfile.handleChange }
						label={ t('profileSelector.form.name') }
						placeholder={ t('profileSelector.form.name') }
						isError={ !!formikProfile.errors.name }
						errorMessage={ getInputErrorMessage(formikProfile.errors.name, t('profileSelector.form.name')) }
					/>
					<Form.DateField
						labelClassName='font-normal'
						labelGap={ 8 }
						id='dob'
						name='dob'
						value={ formikProfile.values.dob }
						onChangeValue={ onChangeInputValue }
						dateFormat='DD MMMM YYYY'
						label={ t('profileSelector.form.dob') }
						placeholder={ t('profileSelector.form.dob') }
						isError={ !!formikProfile.errors.dob }
						applyMaxDateForDoB={ true }
						errorMessage={ getInputErrorMessage(formikProfile.errors.dob, t('profileSelector.form.dob')) }
					/>
				</FormRow>
				<FormRow className='grid grid-cols-2 gap-[16px] md:gap-[24px]'>
					<Form.PhoneNumberInput
						labelClassName='font-normal'
						labelGap={ 8 }
						id='phone'
						name='phone'
						value={ formikProfile.values.phone }
						onChange={ onChangeInputPhone }
						label={ t('profileSelector.form.phone') }
						placeholder={ t('profileSelector.form.phone') }
						isError={ !!formikProfile.errors.phone }
						errorMessage={ getInputErrorMessage(formikProfile.errors.phone, t('profileSelector.form.phone')) }
						isNumber
					/>
					<Form.TextField
						labelClassName='font-normal'
						labelGap={ 8 }
						id='email'
						name='email'
						value={ formikProfile.values.email }
						onChange={ formikProfile.handleChange }
						label={ t('profileSelector.form.email') }
						placeholder={ t('profileSelector.form.email') }
						isError={ !!formikProfile.errors.email }
						errorMessage={ getInputErrorMessage(formikProfile.errors.email, t('profileSelector.form.email')) }
						disabled={ disabledEmail } // Notes: jika disabledEmail, pastikan set formikProfile.values.email
					/>
				</FormRow>
				<FormRow className='grid grid-cols-2 gap-[16px] md:gap-[24px]'>
					<Form.Dropdown
						labelClassName='font-normal'
						labelGap={ 8 }
						menuItems={ [
							{ key: 'M', value: 'M', label: t('profileSelector.form.genderLabel.male') },
							{ key: 'F', value: 'F', label: t('profileSelector.form.genderLabel.female') }
						] }
						id='gender'
						name='gender'
						value={ formikProfile.values.gender }
						onChange={ formikProfile.handleChange }
						label={ t('profileSelector.form.gender') }
						placeholder={ t('profileSelector.form.gender') }
						isError={ !!formikProfile.errors.gender }
						errorMessage={ getInputErrorMessage(formikProfile.errors.gender, t('profileSelector.form.gender')) }
					// className='w-[174px] block'
					/>
				</FormRow>
				<Button type='submit' label={ t('profileSelector.form.submit') } className='mt-[32px]' />
			</Form>
		</ProfileModalContainer>
	</Modal>;
};

export default AddProfileModal;