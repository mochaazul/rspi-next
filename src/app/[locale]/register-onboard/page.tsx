'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormikProps, useFormik } from 'formik';

import { Images, colors } from '@/constant';
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

import { RegisterOnboardStyle, Box } from './style';

const regexPhone = (phone: string) => {
	let phoneNumber;
	if (phone.trim().substring(0, 2) ==
		'62') {
		phoneNumber = phone;
	} else {
		phoneNumber = '62' +
			phone
				.replace(/^0/, '');
	}
	return phoneNumber;
};

const RegisterOnboard = () => {
	const navigate = useRouter();
	const session = useSession();
	const languages = useScopedI18n('page.registerOnboard');
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
			const responseCheckPhone = await checkPhonePatient({ phone: regexPhone(phone) });

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

				const responseCheckPhone = await onCheckPhonePatient(formRegister.phone);

				if (!responseCheckPhone?.data) {
					setIsDuplicatePhoneNumber(false);

					await registerOnboard(formRegister);

					const {
						medical_record,
						phone,
						birth_date,
						name
					} = formRegister;

					navigate.push(`/otp-verification?mr=${ medical_record }&phone=${ phone }&bod=${ birth_date }&name=${ name }`);
				} else {
					setIsDuplicatePhoneNumber(true);
					setErrorUser({
						stat_msg: 'your phone number has been registered. please change with new phone number'
					});
				}
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
				mappedMsg = languages('errors.mrNotFound');
				break;
			case 'phone number not match':
				mappedMsg = languages('errors.phoneNotMatch');
				break;
			case 'sent otp failed':
				mappedMsg = 'Send OTP Failed';
				break;
			case 'field undefined':
				mappedMsg = languages('errors.fieldIsEmpty');
				break;
			case 'mr and dob not match':
				mappedMsg = languages('errors.dobNotMatch');
				break;
			case 'your medical records has been registered':
				mappedMsg = languages('errors.mrHasBeenRegistered');
				break;
			case 'your phone number has been registered. please change with new phone number':
				mappedMsg = languages('errors.phoneHasBeenRegistered');
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

	const onChangeInputValue = useCallback((data: { name?: string; value?: string; }) => {
		if (data?.name) {
			formikRegister.setFieldValue(data?.name, data?.value ?? '');
		}
	}, []);

	const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		formikRegister.setFieldValue(e.target.id, e.target.value);
	}, []);

	return (
		<RegisterOnboardStyle>
			<Box>
				<Form autoComplete='off'>
					<div className='mb-[32px] logo-image'>
						<Images.LogoRSPI />
					</div>
					<Text text={ languages('heading') } fontSize={ '32px' } lineHeight={ '48px' } fontWeight={ '900' } textAlign='center' />
					<Text
						text={ languages('subHeading') }
						fontSize={ '20px' }
						lineHeight={ '24px' }
						fontWeight={ '400' }
						className='mt-[16px] mb-[62px]'
						color={ colors.grey.pencil }
						textAlign='center'
					/>
					{
						errorUser?.stat_msg
						&& !getMappedErrorMessage(errorUser?.stat_msg)
						&& handleNotifError(errorUser?.stat_msg?.toLowerCase())
					}

					<div className='mb-8'>
						<Form.TextField
							id='medical_record'
							name='medical_record'
							placeholder={ languages('form.mrPlaceholder') }
							label={ languages('form.mrlabel') }
							value={ formikRegister.values.medical_record }
							onChange={ onChangeInput }
							errorMessage={ formikRegister.errors?.medical_record }
							isError={ !!formikRegister.errors?.medical_record }
							mask='9999999999'
							isNumber
						/>
					</div>
					{
						handleNotifError('mr not found')
					}
					{
						handleNotifError('your medical records has been registered')
					}

					<Form.PhoneNumberInput
						id='phone'
						name='phone'
						className='input'
						placeholder={ languages('form.phonePlaceholder') }
						label={ languages('form.phoneLabel') }
						value={ formikRegister.values.phone }
						onChange={ onChangeInput }
						errorMessage={ formikRegister.errors?.phone }
						isError={ !!formikRegister.errors?.phone }
					/>
					<Text
						text={ languages('form.phoneHint') }
						className='mb-8'
						fontSize={ '12px' }
						lineHeight={ '15px' }
						fontWeight={ '400' }
						textAlign={ 'left' }
					/>
					{
						handleNotifError('phone number not match')
					}
					{
						isDuplicatePhoneNumber && handleNotifError('your phone number has been registered. please change with new phone number')
					}
					<div className='mb-8'>
						<Form.DateField
							id='birth_date'
							name='birth_date'
							className='input'
							iconName='CalendarIcon'
							iconPosition='right'
							label={ languages('form.birthDateLabel') }
							placeholder='yyyy-mm-dd'
							value={ formikRegister.values.birth_date }
							onChangeValue={ onChangeInputValue }
							errorMessage={ formikRegister.errors?.birth_date }
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
						className='mt-[32px]'
						disabled={ loadingUser }
						onClick={ () => {
							setEnableValidation(true);
							setErrorUser({
								stat_code: '',
								stat_msg: ''
							});
							formikRegister.handleSubmit();
						} }
					>
						{
							loadingUser
								? <Spinner />
								: languages('submitBtnLabel')
						}
					</Button>
					<Button theme='outline'
						className='mt-[12px]'
						onClick={ () => {
							// check if logged user or register user
							const data = session?.user;
							if (data) {
								navigate.replace('/');
							} else {
								navigate.replace('/pin-create');
							}
						} }>
						<Text
							text={ languages('mrNotAvailableBtnLabel') }
							className='cursor-pointer'
							fontSize={ '16px' }
							lineHeight={ '19px' }
							fontWeight={ 'bold' }
							textAlign='center'
							color={ colors.green.default }
						/>
					</Button>
				</Form>
			</Box>
		</RegisterOnboardStyle>
	);
};

export default RegisterOnboard;