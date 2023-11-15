'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormikProps, useFormik } from 'formik';

import { Images, colors } from '@/constant';
import { PinType, ResponseStatus } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import NotificationPanel from '@/components/ui/NotificationPanel';
import Text from '@/components/ui/Text';
import useSession from '@/session/client';
import { createPin } from '@/lib/api/auth';
import { PinSchema } from '@/validator/auth';

import PinPageStyle, { Box } from './style';

const PinPage = () => {
	const navigate = useRouter();

	const [notifVisible, setNotifVisible] = useState<boolean>(false);
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [loadingUser, setLoadingUser] = useState<boolean>(false);
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
			setLoadingUser(true);

			const response = await createPin(formPin);

			setNotifVisible(true);

			if (response?.stat_code === 'APP:SUCCESS') {
				navigate.replace('/');
			} else {
				setErrorUser({
					stat_code: response?.stat_code,
					stat_msg: response?.stat_msg
				});
			}

			setLoadingUser(false);
		}
	});

	const languages = useScopedI18n('page.pinPage');
	const session = useSession();

	const handleNotifOnClose = () => {
		setNotifVisible(false);
	};

	const onChangeInput = useCallback((data: { name?: string; value?: string; }) => {
		if (data?.name) {
			formikPin.setFieldValue(data?.name, data?.value ?? '');
		}
	}, []);

	return (
		<PinPageStyle>
			<Box>
				<div className='mb-[32px]'>
					<Images.LogoRSPI />
				</div>
				<Text text={ languages('heading') } fontSize={ '32px' } lineHeight={ '48px' } fontWeight={ '900' } />
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
					notifVisible &&
					<div className='w-full mb-[32px]'>
						<NotificationPanel
							mode={ errorUser?.stat_msg ? 'error' : 'success' }
							visible={ notifVisible && !loadingUser }
							text={ errorUser?.stat_msg ? errorUser?.stat_msg : session?.token ? languages('notification.onSuccessMsg') : languages('notification.onErrorMsg') }
							onClickRightIcon={ handleNotifOnClose }
						/>
					</div>
				}
				<Form
					onSubmit={ async e => {
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
							password={ true }
							label={ languages('form.pinFieldLabel') }
							errorMessage={ formikPin.errors.pin }
							isError={ !!formikPin.errors.pin }
							value={ formikPin.values.pin }
							type='password'
							onChangeValue={ onChangeInput }
						// { ...registeredValue('pin', true) }
						/>
					</Form.FormGroup>
					<Form.FormGroup className='group-wrapper w-full'>
						<Form.TextFieldPin
							id='confirm_pin'
							name='confirm_pin'
							className='input'
							digitLength={ 6 }
							semiSecure={ false }
							password={ true }
							label={ languages('form.pinConfirmLabel') }
							errorMessage={ formikPin.errors.confirm_pin }
							isError={ !!formikPin.errors.confirm_pin }
							value={ formikPin.values.confirm_pin }
							type='password'
							onChangeValue={ onChangeInput }
						// { ...registeredValue('confirmPin', true) }
						/>
					</Form.FormGroup>
					<Button
						className='mt-8'
						theme='primary'
						disabled={ loadingUser }
						type='submit'
					>
						{ loadingUser ? languages('form.submitBtnLabel.loading') : languages('form.submitBtnLabel.default') }
					</Button>
				</Form>
			</Box>
		</PinPageStyle>
	);
};

export default PinPage;
