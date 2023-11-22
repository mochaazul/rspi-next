'use client';

import { useState } from 'react';
import { useFormik, FormikProps } from 'formik';

import { ForgotPasswordSchema } from '@/validator/auth';
import { Images, colors } from '@/constant';
import { ForgotPasswordType } from '@/interface';
import ConfirmationModal from '@/components/ui/PageComponents/ForgotPasswordSections/ConfirmationModal';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import { useScopedI18n } from '@/locales/client';
import { useForgotPassword } from '@/lib/api/client/auth';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';

import { ForgotPasswordStyle, Box } from './style';

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
			} catch (error: any) {
				setErrorMessageApi(error?.message ?? '');
			} finally {
				setEnableValidation(false);
				setNotifVisible(true);
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
		<ForgotPasswordStyle>
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
					<div className='mb-[32px] flex flex-col items-center'>
						<Images.LogoRSPI />
					</div>
					<Text text={ t('heading') } fontSize={ '32px' } lineHeight={ '48px' } fontWeight={ '900' } textAlign='center' subClassName='md:text-[32px] text-[20px]' />
					<Text
						text={ t('subHeading') }
						fontSize={ '20px' }
						lineHeight={ '24px' }
						fontWeight={ '400' }
						className='mt-[8px] md:mt-[32px] mb-8 md:mb-[62px]'
						color={ colors.grey.pencil }
						textAlign='center'
					/>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextField
							id='email'
							placeholder={ t('form.emailPlaceholder') }
							className='w-full'
							type='email'
							label={ t('form.emailLabel') }
							value={ formikForgotPassword.values.email }
							onChange={ e => formikForgotPassword.setFieldValue(e.target.id, e.target.value) }
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
			{ !loading ?
				<ConfirmationModal
					visible={ notifVisible }
					onClose={ handleShowModal }
					email={ formikForgotPassword.values.email }
					errorMsg={ errorMessageApi }
				/>
				: null
			}
		</ForgotPasswordStyle>
	);
};

export default ForgotPassword;