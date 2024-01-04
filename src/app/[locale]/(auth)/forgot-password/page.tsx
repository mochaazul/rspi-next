'use client';

import { useState } from 'react';
import { useFormik, FormikProps } from 'formik';
import Link from 'next/link';
import Image from 'next/image';

import { ForgotPasswordSchema } from '@/validator/auth';
import { colors } from '@/constant';
import { ForgotPasswordType } from '@/interface';
import ConfirmationModal from '@/components/ui/PageComponents/ForgotPasswordSections/ConfirmationModal';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import NotificationPanel from '@/components/ui/NotificationPanel';
import { useScopedI18n } from '@/locales/client';
import { useForgotPassword } from '@/lib/api/client/auth';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';

import { ContainerStyle, Box } from '../style';

const ForgotPassword = () => {
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [errorMessageApi, setErrorMessageApi] = useState<string>('');
	const [notifVisible, setNotifVisible] = useState<boolean>(false);

	const { trigger: forgotPassword, isMutating: loading } = useForgotPassword();

	const formikForgotPassword: FormikProps<ForgotPasswordType> = useFormik<ForgotPasswordType>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: ForgotPasswordSchema,
		initialValues: { email: '' },
		onSubmit: async (formForgotPassword: ForgotPasswordType) => {
			try {
				await forgotPassword(formForgotPassword);
				setNotifVisible(true);
			} catch (error: any) {
				setErrorMessageApi(error?.message ?? '');
			} finally {
				setEnableValidation(false);
			}
		}
	});

	const t = useScopedI18n('page.forgotPassword');
	const tValidation = useScopedI18n('validation.formValidation');

	const handleShowModal = () => setNotifVisible(!notifVisible);

	const getInputErrorMessage = (key?: string, label?: string) => {
		return getValidationTranslation(tValidation, key, { label });
	};

	return (
		<ContainerStyle>
			<Box className={ `
				md:py-8 md:px-16
				px-4
				max-sm:w-full
			` }>
				<Form
					onSubmit={ e => {
						e.preventDefault();
						setEnableValidation(true);
						setErrorMessageApi('');
						formikForgotPassword.handleSubmit();
					} }
					autoComplete='off'
				>
					<div className='hidden md:flex justify-center mb-8'>
						<Link href='/'>
							<Image
								src='/images/logo_rspi.svg'
								alt='rspi-logo'
								width={ 132 }
								height={ 60 }
							/>
						</Link>
					</div>
					<Text text={ t('heading') } fontSize={ '32px' } lineHeight={ '48px' } fontWeight={ '900' } textAlign='center' subClassName='md:text-[32px] text-[20px]' />
					<Text
						text={ t('subHeading') }
						fontSize={ '20px' }
						fontWeight={ '400' }
						className='mt-2 md:mt-4 mb-8 md:mb-[62px]'
						subClassName='max-md:text-base md:!leading-normal'
						color={ colors.grey.darkOpacity }
						textAlign='center'
					/>
					{
						errorMessageApi &&
						<div className='w-full mb-8'>
							<NotificationPanel
								mode='error'
								visible={ !!errorMessageApi && !loading }
								onClickRightIcon={ () => setErrorMessageApi('') }
							>
								<Text
									fontType={ null }
									fontSize='14px'
									fontWeight='500'
									text={ errorMessageApi }
									color={ colors.red.default }
								/>
							</NotificationPanel>
						</div>
					}
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextField
							id='email'
							placeholder={ t('form.emailPlaceholder') }
							className='w-full'
							type='email'
							label={ t('form.emailLabel') }
							name='email'
							value={ formikForgotPassword.values.email }
							onChange={ formikForgotPassword.handleChange }
							errorMessage={ getInputErrorMessage(formikForgotPassword.errors.email, t('form.emailLabel')) }
							isError={ !!formikForgotPassword.errors.email }
						/>
					</Form.FormGroup>
					<Button
						className='mt-[32px]'
						theme='primary'
						type='submit'
						disabled={ !formikForgotPassword.values.email || loading }
					>
						{ t('resetBtnlabel') }
					</Button>
				</Form>
			</Box>
			{ !loading && notifVisible ?
				<ConfirmationModal
					visible={ notifVisible }
					onClose={ handleShowModal }
					email={ formikForgotPassword.values.email }
					errorMsg={ errorMessageApi }
				/>
				: null
			}
		</ContainerStyle>
	);
};

export default ForgotPassword;