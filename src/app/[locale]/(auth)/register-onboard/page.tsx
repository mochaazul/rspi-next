'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormikProps, useFormik } from 'formik';
import Image from 'next/image';

import { colors } from '@/constant';
import { RegisterOnboardType, ResponseStatus } from '@/interface';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import NotificationPanel from '@/components/ui/NotificationPanel';
import Spinner from '@/components/ui/Spinner';
import useSession from '@/session/client';
import { useScopedI18n } from '@/locales/client';
import { RegisterOnboardSchema } from '@/validator/auth';
import { useCheckPhonePatient, useRegisterOnboard } from '@/lib/api/client/auth';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';

import { ContainerStyle, Box } from '../style';

const regexPhone = (phone: string) => {
	let phoneNumber =
		phone
			.replace(/^0/, '').replace(/^62/, '');
	return phoneNumber;
};

const RegisterOnboard = () => {
	const navigate = useRouter();
	const searchParams = useSearchParams()!;
	const t = useScopedI18n('page.registerOnboard');
	const tValidation = useScopedI18n('validation.formValidation');
	const { trigger: checkPhonePatient } = useCheckPhonePatient();
	const { trigger: registerOnboard } = useRegisterOnboard();

	const [loadingUser, setLoadingUser] = useState<boolean>(false);
	const [errorUser, setErrorUser] = useState<ResponseStatus>({
		stat_code: '',
		stat_msg: ''
	});
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [isDuplicatePhoneNumber, setIsDuplicatePhoneNumber] = useState<boolean>(false);

	const onCheckPhonePatient = async (phone: string) => {
		try {
			const responseCheckPhone = await checkPhonePatient({ phone: '62' + phone });

			return responseCheckPhone;
		} catch (error: any) {
			setErrorUser({ stat_msg: error?.message ?? '' });
			setLoadingUser(false);
		}
	};

	const formikRegister: FormikProps<RegisterOnboardType> = useFormik<RegisterOnboardType>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: RegisterOnboardSchema,
		initialValues: {
			birth_date: '',
			medical_record: '',
			phone: '',
			name: ''
		},
		onSubmit: async (formRegister: RegisterOnboardType) => {
			try {
				setLoadingUser(true);
				const formRegisterPayload = {
					...formRegister,
					phone: `62${ formRegister.phone }`
				};

				// const responseCheckPhone = await onCheckPhonePatient(formRegisterPayload.phone);

				// if (!responseCheckPhone?.data) {
				// 	setIsDuplicatePhoneNumber(false);

				await registerOnboard(formRegisterPayload);

				const {
					medical_record,
					phone,
					birth_date,
					name
				} = formRegisterPayload;

				navigate.push(`/otp-verification?mr=${ medical_record }&phone=${ phone }&bod=${ birth_date }&name=${ name }`);
				// } else {
				// 	setIsDuplicatePhoneNumber(true);
				// 	setErrorUser({
				// 		stat_msg: 'your phone number has been registered. please change with new phone number'
				// 	});
				// }
			} catch (error: any) {
				setErrorUser({ stat_msg: error?.message ?? '' });
			} finally {
				setLoadingUser(false);
			}
		}
	});

	const getMappedErrorMessage = (msg: string) => {
		let mappedMsg = '';
		switch (msg?.toLowerCase()) {
			case 'mr not found':
				mappedMsg = t('errors.mrNotFound');
				break;
			case 'phone number not match':
				mappedMsg = t('errors.phoneNotMatch');
				break;
			case 'sent otp failed':
				mappedMsg = t('errors.sendOtpFailed');
				break;
			case 'field undefined':
				mappedMsg = t('errors.fieldIsEmpty');
				break;
			case 'mr and dob not match':
			case 'trakcare: MR and DOB not match':
				mappedMsg = t('errors.dobNotMatch');
				break;
			case 'your medical records has been registered':
				mappedMsg = t('errors.mrHasBeenRegistered');
				break;
			case 'your phone number has been registered. please change with new phone number':
				mappedMsg = t('errors.phoneHasBeenRegistered');
				break;
		}

		return mappedMsg;
	};

	const handleNotifError = (msg: string) => {
		if (errorUser.stat_msg?.toLowerCase() === msg) {
			const mappedMsg = getMappedErrorMessage(msg) || errorUser?.stat_msg;

			return (
				<div className='w-full mb-[24px] mt-[8px]'>
					<NotificationPanel
						showIconLeft={ false }
						showIconRight={ false }
						mode={ 'error' }
						visible={ true }
					>
						<Text
							fontType={ null }
							fontSize='14px'
							fontWeight='500'
							text={ mappedMsg }
							color={ colors.red.default }
						/>
					</NotificationPanel>
				</div>
			);
		}
	};

	const onChangeInputValue = (data: { name?: string; value?: string; }) => {
		if (data?.name) {
			formikRegister.setFieldValue(data?.name, data?.value ?? '');
		}
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		if (e.target.id === 'phone') {
			formikRegister.setFieldValue(e.target.id, regexPhone(e.target.value));
			return;
		}
		formikRegister.setFieldValue(e.target.id, e.target.value);
	};

	const getInputErrorMessage = (key?: string, label?: string) => {
		return getValidationTranslation(tValidation, key, { label });
	};

	return (
		<ContainerStyle>
			<Box>
				<Form autoComplete='off'>
					<div className='mb-8 max-md:hidden flex justify-center'>
						<Image
							src='/images/logo_rspi.svg'
							alt='rspi-logo'
							width={ 132 }
							height={ 60 }
						/>
					</div>
					<Text
						fontType={ 'h1' }
						text={ t('heading') }
						fontSize={ '32px' }
						lineHeight={ '48px' }
						fontWeight={ '900' }
						textAlign='center'
						subClassName='max-md:leading-8 max-md:text-[20px]'
					/>
					<Text
						text={ t('subHeading') }
						fontSize={ '20px' }
						fontWeight={ '400' }
						className='mt-2 md:mt-4 mb-[42px] md:mb-[62px]'
						subClassName='max-md:text-base md:!leading-normal'
						color={ colors.grey.pencil }
						textAlign='center'
					/>
					{
						errorUser?.stat_msg
						&& !getMappedErrorMessage(errorUser?.stat_msg)
						&& handleNotifError(errorUser?.stat_msg?.toLowerCase())
					}

					<div className='mb-8 md:mb-4'>
						<Form.TextField
							id='medical_record'
							name='medical_record'
							placeholder={ t('form.mrPlaceholder') }
							label={ t('form.mrlabel') }
							value={ formikRegister.values.medical_record }
							onChange={ onChangeInput }
							errorMessage={ getInputErrorMessage(formikRegister.errors?.medical_record, t('form.mrlabel')) }
							isError={ !!formikRegister.errors?.medical_record }
							isNumber
						/>
					</div>
					{
						handleNotifError('mr not found')
					}
					{
						handleNotifError('your medical records has been registered')
					}
					{
						handleNotifError('trakcare: MR and DOB not match')
					}

					<Form.PhoneNumberInput
						id='phone'
						name='phone'
						className='input'
						placeholder={ t('form.phonePlaceholder') }
						label={ t('form.phoneLabel') }
						value={ formikRegister.values.phone }
						onChange={ onChangeInput }
						errorMessage={ getInputErrorMessage(formikRegister.errors?.phone, t('form.phoneLabel')) }
						isError={ !!formikRegister.errors?.phone }
					/>
					<Text
						text={ t('form.phoneHint') }
						className='mb-8 md:mb-4'
						color={ colors.grey.dark }
						fontSize='12px'
						fontWeight='400'
						subClassName='!text-xs !leading-normal'
						textAlign='left'
					/>
					{
						handleNotifError('phone number not match')
					}
					{
						isDuplicatePhoneNumber && handleNotifError('your phone number has been registered. please change with new phone number')
					}
					<div className='mb-8 md:mb-4'>
						<Form.DateField
							id='birth_date'
							name='birth_date'
							className='input'
							iconName='CalendarIcon'
							iconPosition='right'
							label={ t('form.birthDateLabel') }
							placeholder='yyyy-mm-dd'
							value={ formikRegister.values.birth_date }
							onChangeValue={ onChangeInputValue }
							applyMaxDateForDoB={ true }
							errorMessage={ getInputErrorMessage(formikRegister.errors?.birth_date, t('form.birthDateLabel')) }
							isError={ !!formikRegister.errors?.birth_date }
						/>
						{
							handleNotifError('MR and DOB not match')
						}
					</div>
					{ /* <div className='mb-[32px]'>
						<Checkbox
							label={ renderDisclaimerText() }
						/>
					</div> */ }
					<Button
						disabled={ !formikRegister.values.phone || !formikRegister.values.birth_date || !formikRegister.values.medical_record || loadingUser }
						onClick={ () => {
							setEnableValidation(true);
							setErrorUser({
								stat_code: '',
								stat_msg: ''
							});
							formikRegister.handleSubmit();
						} }
						className='max-md:text-sm'
					>
						{
							loadingUser
								? <Spinner />
								: t('submitBtnLabel')
						}
					</Button>
					<Button
						theme='text'
						className='md:mt-4 mt-6 max-md:!py-0'
						onClick={ () => {
							const isHome: string = searchParams.get('isHome') ?? '';
							if (isHome === 'true') {
								navigate.replace('/');
							} else {
								navigate.replace('/pin-create');
							}
						} }
					>
						<Text
							text={ t('mrNotAvailableBtnLabel') }
							className='cursor-pointer'
							fontSize={ '16px' }
							lineHeight={ '19px' }
							fontWeight={ 'bold' }
							textAlign='center'
							color={ colors.grey.dark }
						/>
					</Button>
				</Form>
			</Box>
		</ContainerStyle>
	);
};

export default RegisterOnboard;