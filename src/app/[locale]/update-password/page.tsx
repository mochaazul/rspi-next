'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik, FormikProps } from 'formik';

import { Images, colors } from '@/constant';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import NotificationPanel from '@/components/ui/NotificationPanel';
import { useScopedI18n } from '@/locales/client';
import { UpdatePasswordSchema } from '@/validator/auth';
import { useUpdatePassword } from '@/lib/api/client/auth';
import { UpdatePasswordType, ResponseStatus } from '@/interface';

import { UpdatePasswordPageStyle, Box } from './style';

const UpdatePasswordPage = () => {
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

	const languages = useScopedI18n('page.updatePassword');

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

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		formikUpdatePassword.setFieldValue(e.target.id, e.target.value);
	};

	return (
		<UpdatePasswordPageStyle>
			<Box>
				<div className='w-full flex flex-col items-center'>
					<Link href='/' className='mb-2 lg:mb-8'>
						<Images.LogoRSPI />
					</Link>
					<Text
						fontType='h1'
						fontSize='32px'
						fontWeight='900'
						color={ colors.grey.darker }
						lineHeight='48px'
						subClassName='max-lg:leading-8 max-lg:text-[20px]'
					>
						{ languages('heading') }
					</Text>
					<Text
						fontType='h4'
						fontSize='20px'
						color={ colors.grey.dark }
						className='mt-2 sm:mt-4'
						subClassName='max-lg:text-base max-lg:leading-6'
					>
						{ languages('subHeading') }
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
								placeholder={ languages('resetForm.oldPasswordPlaceHolder') }
								value={ formikUpdatePassword.values.old_password }
								onChange={ onChangeInput }
								errorMessage={ formikUpdatePassword.errors.old_password }
								isError={ !!formikUpdatePassword.errors.old_password }
								label={ languages('resetForm.oldPasswordLabel') }
								iconName={ inputPasswordType.old_password === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								type={ inputPasswordType.old_password }
								onIconClick={ () => togglePasswordShow('old_password') }
							/>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full'>
							<Form.TextField
								id='new_password'
								placeholder={ languages('resetForm.newPasswordPlaceHolder') }
								value={ formikUpdatePassword.values.new_password }
								onChange={ onChangeInput }
								errorMessage={ formikUpdatePassword.errors.new_password }
								isError={ !!formikUpdatePassword.errors.new_password }
								label={ languages('resetForm.newPasswordLabel') }
								iconName={ inputPasswordType.new_password === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								type={ inputPasswordType.new_password }
								onIconClick={ () => togglePasswordShow('new_password') }
							/>
						</Form.FormGroup>
						<Form.FormGroup className='group-wrapper w-full !mb-0'>
							<Form.TextField
								id='confirm_password'
								placeholder={ languages('resetForm.newPasswordConfirmationPlaceholder') }
								label={ languages('resetForm.newPasswordConfirmationLabel') }
								value={ formikUpdatePassword.values.confirm_password }
								onChange={ onChangeInput }
								type={ inputPasswordType.confirm_password }
								iconName={ inputPasswordType.confirm_password === 'password' ? 'EyeClosed' : 'Eye' }
								iconPosition='right'
								errorMessage={ formikUpdatePassword.errors.confirm_password }
								isError={ !!formikUpdatePassword.errors.confirm_password }
								onIconClick={ () => togglePasswordShow('confirm_password') }
							/>
						</Form.FormGroup>
					</section>
					<Button
						label={ languages('resetForm.resetBtnLabel') }
						theme='primary'
						hoverTheme='outline'
						type='submit'
						className='w-full mt-8 sm:mt-12'
						disabled={ loadingSubmit }
					/>
				</Form>
			</Box>
		</UpdatePasswordPageStyle>
	);
};

export default UpdatePasswordPage;