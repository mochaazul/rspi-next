'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik, FormikProps } from 'formik';
import dayjs from 'dayjs';

import { colors } from '@/constant';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import NotificationPanel from '@/components/ui/NotificationPanel';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { UpdatePasswordSchema } from '@/validator/auth';
import { useUpdatePassword } from '@/lib/api/client/auth';
import { UpdatePasswordType, ResponseStatus, UserDataDetail } from '@/interface';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';

import { ContainerStyle, Box } from '../../style';

type UpdatePasswordContentProps = {
	patientProfile: UserDataDetail | null;
};

const UpdatePasswordContent = ({ patientProfile }: UpdatePasswordContentProps) => {
	const navigate = useRouter();

	const { trigger: updatePassword, isMutating: loadingSubmit } = useUpdatePassword();

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [error, setError] = useState<ResponseStatus>({
		stat_code: '',
		stat_msg: ''
	});
	const [inputPasswordType, setInputPasswordType] = useState<Record<string, string>>({
		old_password: 'password',
		new_password: 'password',
		confirm_password: 'password'
	});
	const formikUpdatePassword: FormikProps<UpdatePasswordType> = useFormik<UpdatePasswordType>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: UpdatePasswordSchema,
		initialValues: {
			old_password: '',
			new_password: '',
			confirm_password: ''
		},
		onSubmit: async (formUpdatePassword: UpdatePasswordType) => {
			try {
				await updatePassword(formUpdatePassword);

				navigate.replace('/login?ref=reset&stat=true');
			} catch (error: any) {
				setError({ stat_msg: error?.message });
			} finally {
				setEnableValidation(false);
			}
		}
	});

	const t = useScopedI18n('page.updatePassword');
	const tValidation = useScopedI18n('validation.formValidation');
	const currentLang = useCurrentLocale();

	const lastUpdatedPasswordLabel = patientProfile?.password_updated_date && patientProfile?.password_updated_date !== '0001-01-01 00:00:00'
		? t('lastUpdatedPasswordLabel', { date: `${ dayjs(patientProfile?.password_updated_date).locale(currentLang).format('DD MMMM YYYY') }` })
		: '';

	const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setEnableValidation(true);
		setError({
			stat_code: '',
			stat_msg: ''
		});
		formikUpdatePassword.handleSubmit();
	};

	const togglePasswordShow = (inputKey: string) => {
		setInputPasswordType(prevType => ({
			...prevType,
			[inputKey]: prevType[inputKey] === 'password' ? 'text' : 'password'
		}));
	};

	const getInputErrorMessage = (key?: string, label?: string) => {
		return getValidationTranslation(tValidation, key, { label });
	};

	return (
		<ContainerStyle>
			<Box>
				<div className='w-full flex flex-col items-center'>
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
					<Text
						fontType='h1'
						fontSize='32px'
						fontWeight='900'
						color={ colors.grey.darker }
						lineHeight='48px'
						subClassName='max-lg:leading-8 max-lg:text-[20px]'
					>
						{ t('heading') }
					</Text>
					<Text
						fontType='h4'
						fontSize='20px'
						color={ colors.grey.dark }
						className='mt-2 sm:mt-3'
						subClassName='max-lg:text-base max-lg:leading-6'
					>
						{ t('subHeading') }
					</Text>
				</div>
				{
					error?.stat_msg &&
					<div className='w-full my-4'>
						<NotificationPanel
							mode={ 'error' }
							visible={ true }
							showIconRight={ false }
						// onClickRightIcon={ handleNotifOnClose }
						>
							{ error && <span>{ error.stat_msg }</span> }
						</NotificationPanel>
					</div>
				}
				<Form
					autoComplete='off'
					onSubmit={ onSubmitForm }
					className='w-full'
				>
					<section className='mt-[42px] sm:mt-8 w-full'>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='old_password'
								name='old_password'
								placeholder={ t('resetForm.oldPasswordPlaceHolder') }
								value={ formikUpdatePassword.values.old_password }
								onChange={ formikUpdatePassword.handleChange }
								errorMessage={ getInputErrorMessage(formikUpdatePassword.errors.old_password, t('resetForm.oldPasswordLabel')) }
								isError={ !!formikUpdatePassword.errors.old_password }
								label={ t('resetForm.oldPasswordLabel') }
								iconName={ inputPasswordType.old_password === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								type={ inputPasswordType.old_password }
								onIconClick={ () => togglePasswordShow('old_password') }
							/>
							<div className='flex max-sm:flex-col justify-start sm:justify-between gap-1'>
								<Text
									fontSize='14px'
									color={ colors.grey.dark }
									subClassName='text-xs sm:text-sm !leading-normal'
								>{ lastUpdatedPasswordLabel }</Text>

								<Link href='/forgot-password'>
									<Text
										fontSize='14px'
										color={ colors.paradiso.default }
										fontWeight='700'
										subClassName='leading-normal'
									>{ t('forgotPasswordLabel') }</Text>
								</Link>
							</div>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='new_password'
								name='new_password'
								placeholder={ t('resetForm.newPasswordPlaceHolder') }
								value={ formikUpdatePassword.values.new_password }
								onChange={ formikUpdatePassword.handleChange }
								errorMessage={ getInputErrorMessage(formikUpdatePassword.errors.new_password, t('resetForm.newPasswordLabel')) }
								isError={ !!formikUpdatePassword.errors.new_password }
								label={ t('resetForm.newPasswordLabel') }
								iconName={ inputPasswordType.new_password === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								type={ inputPasswordType.new_password }
								onIconClick={ () => togglePasswordShow('new_password') }
							/>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full !mb-0'>
							<Form.TextField
								id='confirm_password'
								name='confirm_password'
								placeholder={ t('resetForm.newPasswordConfirmationPlaceholder') }
								label={ t('resetForm.newPasswordConfirmationLabel') }
								value={ formikUpdatePassword.values.confirm_password }
								onChange={ formikUpdatePassword.handleChange }
								type={ inputPasswordType.confirm_password }
								iconName={ inputPasswordType.confirm_password === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								errorMessage={ getInputErrorMessage(formikUpdatePassword.errors.confirm_password, t('resetForm.newPasswordConfirmationLabel')) }
								isError={ !!formikUpdatePassword.errors.confirm_password }
								onIconClick={ () => togglePasswordShow('confirm_password') }
							/>
						</Form.FormGroup>
					</section>
					<Button
						label={ t('resetForm.resetBtnLabel') }
						theme='primary'
						type='submit'
						className='w-full mt-8 sm:mt-12'
						disabled={ loadingSubmit }
					/>
				</Form>
			</Box>
		</ContainerStyle>
	);
};

export default UpdatePasswordContent;