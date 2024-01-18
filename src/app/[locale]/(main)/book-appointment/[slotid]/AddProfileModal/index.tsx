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
import { useScopedI18n } from '@/locales/client';
import { AddProfileSchema } from '@/validator/booking';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';
import { addFamilyProfile, editFamilyProfile, updateProfile } from '@/lib/api/profile';
import { useFormStatus } from 'react-dom';
import dayjs from 'dayjs';

type Props = {
	onClose: (profile: ProfilePayload, isMain?: boolean) => void;
	visible: boolean;
	isMain?: boolean,
	selfProfile?: UserDataDetail;
	type: string;
	isAddProfile: boolean;
	selectedProfile?: UserDataDetail;
};

export type ProfilePayload = {
	dob: string;
	email: string;
	gender: string;
	name: string;
	phone: string;
};

const AddProfileModal = ({ onClose, visible, isMain, selfProfile, type, isAddProfile = true, selectedProfile }: Props) => {
	const { pending } = useFormStatus();

	const t = useScopedI18n('page.bookingAppointment');
	const tValidation = useScopedI18n('validation.formValidation');
	const [error, setError] = useState<string>('');
	const [disabledEmail, setDisabledEmail] = useState<boolean>(false);
	const [enableValidation, setEnableValidation] = useState<boolean>(false);

	const formikProfile: FormikProps<ProfilePayload> = useFormik<ProfilePayload>({
		enableReinitialize: true,
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
			try {
				const { dob, email, gender, name, phone } = values;
				if (isAddProfile) {
					if (type === 'other') {
						const res = await addFamilyProfile({
							birthdate: dob,
							parent_email: selfProfile?.email ?? '',
							email: email,
							name: name,
							phone: `62${ cleanUpMask(phone) }`,
							gender: gender
						});

						if (res.stat_code === 'ERR:BAD_REQUEST') throw res.stat_msg;

					} else {
						const res = await updateProfile({
							name: name,
							birthdate: dob,
							gender: gender,
							phone: `62${ cleanUpMask(phone) }`
						});

						if (res.stat_code === 'ERR:BAD_REQUEST') throw res.stat_msg;
					}
				} else {
					/// todo edit profile
					if (selectedProfile?.id) {
						const res = await editFamilyProfile({
							birthdate: dob,
							email: email,
							name: name,
							phone: `62${ cleanUpMask(phone) }`,
							gender: gender,
						}, selectedProfile.patient_code);
						if (res.stat_code === 'ERR:BAD_REQUEST') throw res.stat_msg;
					}
				}

				closeHandler();

			} catch (error: any) {
				setError(error);
			}

		},
	});

	useEffect(() => {
		if (!visible) {
			setError('');
		}
	}, [visible]);

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
			let phoneNumber = selfProfile?.phone;
			if (phoneNumber?.substring(0, 2) === '62') {
				phoneNumber = phoneNumber.slice(2);
			}
			formikProfile.setFieldValue('email', selfProfile?.email);
			formikProfile.setFieldValue('phone', phoneNumber);
			formikProfile.setFieldValue('name', selfProfile?.name);
			formikProfile.setFieldValue('gender', selfProfile?.gender);
			if (selfProfile?.birthdate
				&& selfProfile?.birthdate !== '0001-01-01'
				&& selfProfile?.birthdate !== '0001-01-01 00:00:00 +0000 UTC') {
				formikProfile.setFieldValue('dob', selfProfile?.birthdate);
			}
			setDisabledEmail(true);
		} else {
			setDisabledEmail(false);
		}
	}, [type]);

	useEffect(() => {
		formikProfile.resetForm();
		if (!isAddProfile) {
			let phoneNumber = selectedProfile?.phone;
			if (phoneNumber?.substring(0, 2) === '62') {
				phoneNumber = phoneNumber.slice(2);
			}
			formikProfile.setFieldValue('email', selectedProfile?.email);
			formikProfile.setFieldValue('phone', phoneNumber);
			formikProfile.setFieldValue('name', selectedProfile?.name);
			formikProfile.setFieldValue('gender', selectedProfile?.gender);
			if (selectedProfile?.birthdate
				&& selectedProfile?.birthdate !== '0001-01-01'
				&& selectedProfile?.birthdate !== '0001-01-01 00:00:00 +0000 UTC') {
				formikProfile.setFieldValue('dob', selectedProfile?.birthdate);
			}
		}
	}, [selectedProfile, visible, isAddProfile]);

	const regexPhone = (phone: string) => {
		const phoneNumber =
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
	const modalTitle = () => {
		if (isAddProfile) {
			return type === 'self' ? t('profileSelector.addSelfProfile') : t('profileSelector.addOtherProfile');
		} else {
			return `${ t('profileSelector.editOtherProfile') } "${ selectedProfile?.name }" :`;
		}
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
		<ProfileModalContainer className='items-start md:items-center'>
			<ModalHeader className='mb-[12px] md:mb-[24px]'>
				<Text
					subClassName='max-sm:text-[16px]'
					fontSize='24px'
					fontWeight='700'
					lineHeight='28px'
					text={ modalTitle() }
				/>
			</ModalHeader>
			<NotificationPanel
				showIconLeft={ false }
				showIconRight={ false }
				mode={ 'error' }
				visible={ !!error }
			>
				<Text
					fontType={ null }
					fontSize='14px'
					fontWeight='500'
					text={ error }
					color={ colors.red.default }
				/>
			</NotificationPanel>
			<Form onSubmit={ onSubmitHandler } className='mt-[8px]' action={ '' }>
				<FormRow className='flex flex-col md:grid md:grid-cols-2 gap-[12px] md:gap-[24px]'>
					<Form.TextField
						labelClassName='font-normal'
						className='w-[300px] md:w-full'
						labelGap={ 8 }
						id='name'
						name='name'
						value={ formikProfile.values.name }
						onChange={ formikProfile.handleChange }
						label={ t('profileSelector.form.name') }
						placeholder={ t('profileSelector.form.name') }
						isError={ !!formikProfile.errors.name }
						errorMessage={ getInputErrorMessage(formikProfile.errors.name, t('profileSelector.form.name')) }
						wrapperClassName={ 'text-sm md:text-base' }
					/>
					<Form.DateField
						labelClassName='font-normal'
						iconName={ 'Calendar16' }
						labelGap={ 8 }
						id='dob'
						name='dob'
						value={ dayjs(formikProfile.values.dob).format('DD MMMM YYYY') ?? formikProfile.values.dob }
						onChangeValue={ onChangeInputValue }
						dateFormat='DD MMMM YYYY'
						label={ t('profileSelector.form.dob') }
						placeholder={ t('profileSelector.form.dob') }
						isError={ !!formikProfile.errors.dob }
						applyMaxDateForDoB={ true }
						errorMessage={ getInputErrorMessage(formikProfile.errors.dob, t('profileSelector.form.dob')) }
						wrapperClassName={ 'text-sm md:text-base' }
					/>
				</FormRow>
				<FormRow className='flex flex-col md:grid md:grid-cols-2 gap-[12px] md:gap-[24px]'>
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
						wrapperClassName={ 'text-sm md:text-base' }
						max={ 13 }
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
						wrapperClassName={ 'text-sm md:text-base' }
					/>
				</FormRow>
				<FormRow className='flex flex-col md:grid md:grid-cols-2 gap-[12px] md:gap-[24px]'>
					<Form.Dropdown
						labelClassName='font-normal'
						labelGap={ 8 }
						menuItems={ [
							{ key: 'M', value: 'Male', label: t('profileSelector.form.genderLabel.male') },
							{ key: 'F', value: 'Female', label: t('profileSelector.form.genderLabel.female') }
						] }
						id='gender'
						name='gender'
						defaultValue={ formikProfile.values.gender }
						onChange={ formikProfile.handleChange }
						label={ t('profileSelector.form.gender') }
						placeholder={ t('profileSelector.form.gender') }
						isError={ !!formikProfile.errors.gender }
						errorMessage={ getInputErrorMessage(formikProfile.errors.gender, t('profileSelector.form.gender')) }
						subClassName={ '!text-sm md:!text-base' }
					// className='w-[174px] block'
					/>
				</FormRow>
				<Button type='submit' label={ isAddProfile ? t('profileSelector.form.submit') : t('profileSelector.form.edit') } className='mt-[8px] md:mt-[32px] text-sm md:text-base' />
			</Form>
		</ProfileModalContainer>
	</Modal>;
};

export default AddProfileModal;