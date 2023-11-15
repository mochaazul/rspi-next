'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormikProps, useFormik } from 'formik';

import { Images, colors } from '@/constant';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import NotificationPanel from '@/components/ui/NotificationPanel';
import Text from '@/components/ui/Text';
import { PinType, ResponseStatus } from '@/interface';
import { useScopedI18n } from '@/locales/client';
import { updatePin } from '@/lib/api/auth';
import { PinSchema } from '@/validator/auth';
import useSession from '@/session/client';

import PinPageStyle, { Box } from './style';

const ResetPinPage = () => {
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

			const response = await updatePin(formPin);

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

	const onChangeInputValue = useCallback((data: { name?: string; value?: string; }) => {
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
				<Text text={ languages('headingReset') } fontSize={ '32px' } lineHeight={ '48px' } fontWeight={ '900' } />
				<Text
					text={ languages('subHeadingReset') }
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
							text={ errorUser?.stat_msg ? errorUser?.stat_msg : session?.token ? languages('notification.onSuccessMsgUpdatePin') : languages('notification.onErrorMsg') }
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
							label={ languages('form.pinFieldLabel') }
							errorMessage={ formikPin.errors.pin }
							isError={ !!formikPin.errors.pin }
							value={ formikPin.values.pin }
							type='password'
							password
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
							label={ languages('form.pinConfirmLabel') }
							errorMessage={ formikPin.errors.confirm_pin }
							isError={ !!formikPin.errors.confirm_pin }
							value={ formikPin.values.confirm_pin }
							type='password'
							password
						/>
					</Form.FormGroup>
					<Button
						className='mt-8'
						theme='primary'
						disabled={ loadingUser }
						type='submit'
					>
						{ loadingUser ? languages('form.changeBtnLabel.loading') : languages('form.changeBtnLabel.default') }
					</Button>
				</Form>
			</Box>
		</PinPageStyle>
	);
};

export default ResetPinPage;
