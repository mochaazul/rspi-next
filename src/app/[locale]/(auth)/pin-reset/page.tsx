'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormikProps, useFormik } from 'formik';
import Image from 'next/image';

import { colors } from '@/constant';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import NotificationPanel from '@/components/ui/NotificationPanel';
import Text from '@/components/ui/Text';
import { PinType, ResponseStatus } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import { useUpdatePin } from '@/lib/api/client/auth';
import { PinSchema } from '@/validator/auth';
import useSession from '@/session/client';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';

import { ContainerStyle, Box } from '../style';

const ResetPinPage = () => {
	const navigate = useRouter();
	const { trigger: updatePin, isMutating: loadingUser } = useUpdatePin();

	const [notifVisible, setNotifVisible] = useState<boolean>(false);
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [errorUser, setErrorUser] = useState<ResponseStatus | null>(null);

	const formikPin: FormikProps<PinType> = useFormik<PinType>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: PinSchema,
		initialValues: {
			pin: '',
			confirm_pin: ''
		},
		onSubmit: async (formPin: PinType) => {
			try {
				await updatePin(formPin);

				navigate.replace('/');
			} catch (error: any) {
				setErrorUser({ stat_msg: error?.message ?? '' });
			} finally {
				setNotifVisible(true);
			}
		}
	});

	const t = useScopedI18n('page.pinPage');
	const tValidation = useScopedI18n('validation.formValidation');
	const session = useSession();

	const handleNotifOnClose = () => {
		setNotifVisible(false);
	};

	const onChangeInputValue = (data: { name?: string; value?: string; }) => {
		if (data?.name) {
			formikPin.setFieldValue(data?.name, data?.value ?? '');
		}
	};

	const getInputErrorMessage = (key?: string, label?: string) => {
		return getValidationTranslation(tValidation, key, { label });
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
					text={ t('headingReset') }
					fontSize={ '32px' }
					lineHeight={ '48px' }
					fontWeight={ '900' }
					subClassName='max-md:leading-8 max-md:text-[20px]'
					textAlign='center'
				/>
				<Text
					text={ t('subHeadingReset') }
					fontSize={ '20px' }
					fontWeight={ '400' }
					className='mt-2 md:mt-3 mb-[62px]'
					subClassName='max-md:text-base md:!leading-normal'
					color={ colors.grey.darkOpacity }
					textAlign='center'
				/>
				{
					notifVisible &&
					<div className='w-full mb-[32px]'>
						<NotificationPanel
							mode={ errorUser?.stat_msg ? 'error' : 'success' }
							visible={ notifVisible && !loadingUser }
							text={ errorUser?.stat_msg ? errorUser?.stat_msg : session?.token ? t('notification.onSuccessMsgUpdatePin') : t('notification.onErrorMsg') }
							onClickRightIcon={ handleNotifOnClose }
						/>
					</div>
				}
				<Form
					onSubmit={ e => {
						e.preventDefault();
						setEnableValidation(true);
						setNotifVisible(false);
						setErrorUser(null);

						formikPin.handleSubmit();
					} }
					autoComplete='off'
				>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextFieldPin
							id='pin'
							name='pin'
							className='input'
							digitLength={ 6 }
							semiSecure={ false }
							onChangeValue={ onChangeInputValue }
							label={ t('form.pinFieldLabel') }
							errorMessage={ getInputErrorMessage(formikPin.errors.pin, t('form.pinFieldLabel')) }
							isError={ !!formikPin.errors.pin }
							value={ formikPin.values.pin }
							type='password'
							password
							inputClassName='max-sm:!w-full max-sm:!h-12 max-md:w-full max-sm:rounded-[10px] max-sm:text-2xl max-sm:leading-[48px]'
							wrapperClassName='max-sm:!gap-x-2.5'
						/>
					</Form.FormGroup>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextFieldPin
							id='confirm_pin'
							name='confirm_pin'
							className='input'
							digitLength={ 6 }
							semiSecure={ false }
							onChangeValue={ onChangeInputValue }
							label={ t('form.pinConfirmLabel') }
							errorMessage={ getInputErrorMessage(formikPin.errors.confirm_pin, t('form.pinConfirmLabel')) }
							isError={ !!formikPin.errors.confirm_pin }
							value={ formikPin.values.confirm_pin }
							type='password'
							password
							inputClassName='max-sm:!w-full max-sm:!h-12 max-md:w-full max-sm:rounded-[10px] max-sm:text-2xl max-sm:leading-[48px]'
							wrapperClassName='max-sm:!gap-x-2.5'
						/>
					</Form.FormGroup>
					<Button
						className='mt-8'
						theme='primary'
						disabled={ loadingUser }
						type='submit'
					>
						{ loadingUser ? t('form.changeBtnLabel.loading') : t('form.changeBtnLabel.default') }
					</Button>
				</Form>
			</Box>
		</ContainerStyle>
	);
};

export default ResetPinPage;
