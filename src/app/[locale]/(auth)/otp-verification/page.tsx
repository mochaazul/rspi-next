'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormikProps, useFormik } from 'formik';
import Image from 'next/image';

import { colors, icons } from '@/constant';

import { OTPType } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import { OTPSchema } from '@/validator/auth';
import useSession from '@/session/client';
import { useCreateOTP, useRegisterOnboard } from '@/lib/api/client/auth';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Text from '@/components/ui/Text';
import NotificationPanel from '@/components/ui/NotificationPanel';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';
import { getProfile } from '@/lib/api/profile';

import { WarningNote } from './style';
import { ContainerStyle, Box } from '../style';

type Props = {
	onResend?: () => void,
	count: number,
	setCount: React.Dispatch<React.SetStateAction<number>>;
	resendOtpText: string;
	resendWarnText: string;
};

const CountDownText = ({
	onResend,
	count,
	setCount,
	resendOtpText,
	resendWarnText
}: Props) => {

	useEffect(() => {
		if (count <= 0) return;
		setTimeout(() => {
			setCount(count - 1);
		}, 1000);
	}, [count]);

	const getCountFormatted = () => {
		const jsDate = new Date(count * 1000);
		const [minutes, seconds] = [jsDate.getMinutes(), jsDate.getSeconds()];
		return `${ String(minutes).padStart(2, '0') }:${ String(seconds).padStart(2, '0') }`;
	};

	if (!count) return (
		<>
			<Text
				onClick={ onResend }
				text={ resendOtpText }
				fontSize={ '20px' }
				lineHeight={ '24px' }
				fontWeight={ '400' }
				className='my-3 sm:my-4 cursor-pointer'
				subClassName='max-sm:text-base'
				color={ colors.paradiso.default }
				textAlign='center'
			/>
			<WarningNote>
				<icons.ExclamationGreen />
				<Text
					text={ resendWarnText }
					fontSize={ '14px' }
					subClassName='leading-normal font-semibold sm:font-normal max-sm:text-xs max-sm:leading-[18px]'
					color={ colors.black.ink }
				/>
			</WarningNote>
		</>
	);

	return (
		<Text
			text={ getCountFormatted() }
			fontSize={ '20px' }
			lineHeight={ '24px' }
			fontWeight={ '400' }
			className='mt-[16px] mb-[62px]'
			color={ colors.paradiso.default }
			textAlign='center'
		/>
	);
};

const OTPPage = () => {
	const navigate = useRouter();
	const searchParams = useSearchParams()!;

	const { trigger: createOTP } = useCreateOTP();
	const { trigger: registerOnboard } = useRegisterOnboard();

	const [count, setCount] = useState(60);
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
	const [errorMessageApi, setErrorMessageApi] = useState<string>('');

	const t = useScopedI18n('page.otpVerification');
	const tValidation = useScopedI18n('validation.formValidation');
	const session = useSession();

	const formikOtp: FormikProps<OTPType> = useFormik<OTPType>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: OTPSchema,
		initialValues: { otp: '' },
		onSubmit: async (formOtp: OTPType) => {
			try {
				setLoadingSubmit(true);

				await createOTP(formOtp);
				await getProfile(true);

				if (session?.user?.pin_status) {
					navigate.replace('/');
				} else {
					navigate.replace('/pin-create');
				}
			} catch (error: any) {
				setErrorMessageApi(error?.message ?? '');
			} finally {
				setLoadingSubmit(false);
				setEnableValidation(false);
			}
		},
	});

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setEnableValidation(true);
		setErrorMessageApi('');
		formikOtp.handleSubmit();
	};

	const resendOtpHandler = async () => {
		setCount(60);
		await registerOnboard({
			birth_date: searchParams.get('bod') ?? '',
			medical_record: searchParams.get('mr') ?? '',
			name: '',
			phone: searchParams.get('phone') ?? ''
		});
	};

	const onChangeInputValue = (data: { name?: string; value?: string; }) => {
		if (data?.name) {
			formikOtp.setFieldValue(data?.name, data?.value ?? '');
		}
	};

	return (
		<ContainerStyle>
			<Box className='md:w-auto md:max-w-[618px]'>
				<div className='hidden md:flex justify-center mb-8'>
					<Image
						src='/images/logo_rspi.svg'
						alt='rspi-logo'
						width={ 132 }
						height={ 60 }
					/>
				</div>
				<Text
					text={ t('heading') }
					fontSize={ '32px' }
					lineHeight={ '48px' }
					fontWeight={ '900' }
					subClassName='max-md:leading-8 max-md:text-[20px]'
					textAlign='center'
				/>
				<Text fontSize={ '20px' } fontWeight={ '400' } textAlign='center' color={ colors.grey.darkOpacity } subClassName='mt-3 max-md:text-base md:!leading-normal'>
					{ t('subHeading') }
					<span className='text-base md:text-xl italic'>&nbsp;{ t('handphone') } &nbsp;</span>
					{
						t('yourlabel') !== 'yourlabel' && <span className='text-base md:text-xl'>{ t('yourlabel') }</span>
					}
				</Text>
				<CountDownText
					onResend={ resendOtpHandler }
					count={ count }
					setCount={ setCount }
					resendOtpText={ t('resendOtp') }
					resendWarnText={ t('resendWarn') }
				/>

				{
					errorMessageApi &&
					<div className='w-full mb-[32px]'>
						<NotificationPanel
							mode='error'
							visible={ !!errorMessageApi && !loadingSubmit }
							text={ errorMessageApi }
							onClickRightIcon={ () => setErrorMessageApi('') }
						/>
					</div>
				}

				<Form onSubmit={ onSubmitHandler } autoComplete='off'>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextFieldPin
							id='otp'
							name='otp'
							className='input'
							digitLength={ 6 }
							label={ t('form.otpFieldLabel') }
							type='text'
							value={ formikOtp.values.otp }
							errorMessage={ getValidationTranslation(tValidation, formikOtp.errors.otp, { label: t('form.otpFieldLabel') }) }
							isError={ !!formikOtp.errors.otp }
							onChangeValue={ onChangeInputValue }
						/>
					</Form.FormGroup>
					<Button className='mt-8' theme='primary' type='submit' disabled={ loadingSubmit }>{ t('form.submitBtnLabel') }</Button>
				</Form>
			</Box>
		</ContainerStyle>
	);
};

export default OTPPage;
