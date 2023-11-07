import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Images, Languages, colors } from '@/constant';
import {
	Button, Text, Form, NotificationPanel, Spinner, Checkbox
} from '@/components';
import { UserState } from '@/interface';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { PropsTypes as NotificationPanelTypes } from '@/components/NotificationPanel';

import useRegisterOnboard from './useRegisterOnboard';
import { RegisterOnboardStyle, Box } from './style';
import { clearError } from '@/stores/actions';
import PrivacyPolicyModal from '@/components/PrivacyPolicyModal';

const { heading, mrNotAvailableBtnLabel, subHeading, submitBtnLabel, form, errors } = Languages.page.registerOnboard;

const RegisterOnboard = () => {
	const navigate = useNavigate();
	const {
		onClickRegisterOnboard,
		loadingOnBoarding,
		registerOnboardField,
		setModalVisible,
		modalVisible
	} = useRegisterOnboard();
	const {
		registeredValue, isFormValid, onSubmit, getCurrentForm
	} = Form.useForm({ fields: registerOnboardField });
	const { loading: loadingUser, error: errorUser } = useTypedSelector<UserState>('user');
	const removeError = useAppDispatch(clearError);

	useEffect(() => {
		removeError();
	}, []);

	const handleNotifError = (msg: string) => {
		let mappedMsg = '';
		switch (msg.toLowerCase()) {
			case 'mr not found':
				mappedMsg = errors.mrNotFound;
				break;
			case 'phone number not match':
				mappedMsg = errors.phoneNotMatch;
				break;

			case 'sent otp failed':
				mappedMsg = 'Sent OTP Failed';
				break;
			case 'field undefined':
				mappedMsg = errors.fieldIsEmpty;
				break;
			case 'mr and dob not match':
				mappedMsg = errors.dobNotMatch;
				break;
			case 'your medical records has been registered':
				mappedMsg = errors.mrHasBeenRegistered;
				break;
			case 'your phone number has been registered. Please change with new phone number':
				mappedMsg = errors.mrHasBeenRegistered;
				break;
		}

		if (errorUser.stat_msg?.toLowerCase() === msg) {
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

	const onSubmitHandler = async () => {
		const { nomorRekamMedis, phone, dateOfBirth } = getCurrentForm();
		await onClickRegisterOnboard({
			name: '',
			medical_record: nomorRekamMedis.value,
			phone: phone.value,
			birth_date: dateOfBirth.value
		});

	};

	return (
		<RegisterOnboardStyle>
			<Box>
				<Form
					autoComplete='off'
				>
					<div className='mb-[32px] logo-image'>
						<Images.LogoRSPI />
					</div>
					<Text text={ heading } fontSize={ '32px' } lineHeight={ '48px' } fontWeight={ '900' } textAlign='center' />
					<Text
						text={ subHeading }
						fontSize={ '20px' }
						lineHeight={ '24px' }
						fontWeight={ '400' }
						className='mt-[16px] mb-[62px]'
						color={ colors.grey.pencil }
						textAlign='center'
					/>

					<Form.TextField
						id='nomorRekamMedis'
						className='input mb-[32px]'
						placeholder={ form.mrPlaceholder }
						mask='9999999999'
						isNumber
						{ ...registeredValue('nomorRekamMedis') }
					/>
					{
						handleNotifError('mr not found')
					}
					{
						handleNotifError('your medical records has been registered')
					}

					<Form.PhoneNumberInput
						id='phone'
						className='input'
						placeholder={ form.phonePlaceholder }
						{ ...registeredValue('phone') }
					/>
					<Text
						text={ form.phoneHint }
						className='mb-[32px]'
						fontSize={ '12px' }
						lineHeight={ '15px' }
						fontWeight={ '400' }
						textAlign={ 'left' }
					/>
					{
						handleNotifError('phone number not match')
					}
					{
						handleNotifError('your phone number has been registered. please change with new phone number')
					}
					<div className='mb-[32px]'>
						<Form.DateField
							id='dateOfBirth'
							className='input'
							iconName='CalendarIcon'
							iconPosition='right'
							{ ...registeredValue('dateOfBirth', true) }

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
						disabled={ !isFormValid() || loadingUser }
						onClick={ () => setModalVisible(true) }
					>
						{
							loadingUser
								? <Spinner />
								: submitBtnLabel
						}
					</Button>
					<Button theme='outline'
						className='mt-[12px]'
						onClick={ () => navigate('/pin-create') }>
						<Text
							text={ mrNotAvailableBtnLabel }
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
			<PrivacyPolicyModal loading={ loadingOnBoarding } isOpen={ modalVisible } onFinish={ () => onSubmitHandler() } onClose={ () => setModalVisible(false) } />
		</RegisterOnboardStyle>
	);
};

export default RegisterOnboard;