import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Images, Languages, colors } from 'constant';
import {
	Button, Text, Form, NotificationPanel, Spinner, Checkbox
} from 'components';
import { UserState } from 'interface';
import { useTypedSelector } from 'hooks';
import { PropsTypes as NotificationPanelTypes } from 'components/NotificationPanel';

import useRegisterOnboard from './useRegisterOnboard';
import { RegisterOnboardStyle, Box } from './style';

const { heading, mrNotAvailableBtnLabel, subHeading, submitBtnLabel, form } = Languages.page.registerOnboard;

const RegisterOnboard = () => {
	const navigate = useNavigate();
	const {
		onClickRegisterOnboard,
		loadingOnBoarding,
		registerOnboardField
	} = useRegisterOnboard();
	const {
		registeredValue, isFormValid, onSubmit
	} = Form.useForm({ fields: registerOnboardField });
	const { loading: loadingUser, error: errorUser } = useTypedSelector<UserState>('user');

	const [notifVisible, setNotifVisible] = useState(false);
	const [notifMode, setnotif] = useState<NotificationPanelTypes['mode']>('error');

	useEffect(() => {
		setnotif(!!errorUser.stat_msg ? 'error' : 'success');
	}, [errorUser]);

	const handleNotifError = () => {
		return <Text
			fontType={ null }
			fontSize='14px'
			fontWeight='500'
			text={ errorUser.stat_msg ? errorUser.stat_msg : 'Berhasil' }
			color={ colors.red.default }
		/>;
	};

	const handleNotifOnClose = () => {
		setNotifVisible(false);
	};

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			const { nomorRekamMedis, phone, dateOfBirth } = onSubmit(e);
			await onClickRegisterOnboard({
				name: '',
				medical_record: nomorRekamMedis.value,
				phone: phone.value,
				birth_date: dateOfBirth.value
			});
			if (errorUser.stat_msg) {
				setNotifVisible(true);
			} else {
				// navigate('/otp-verification');
			}
		} catch (error) {
		}
	};

	const renderDisclaimerText = () => {
		return (
			<div>
				<Text
					text={
						<>
							Mohon baca informasi <Link to='/' target='_blank' rel='noopener noreferrer' style={ { color: colors.green.default, fontWeight: 'bolder' } }>Privacy Policy</Link> Sebelum melanjutkan proses pendaftaran untuk mengakses riwayat medis pada portal pasien.
						</>
					}
					fontSize='16px'
					lineHeight='19px'
					fontWeight='400'
				/>
			</div>);
	};

	return (
		<RegisterOnboardStyle>
			<Box>
				<Form
					onSubmit={ onSubmitHandler }
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
					{
						notifVisible &&
						<div className='w-full mb-[32px]'>
							<NotificationPanel
								mode={ notifMode }
								visible={ notifVisible && errorUser && !loadingUser }
								onClickRightIcon={ handleNotifOnClose }
							>
								{ handleNotifError() }
							</NotificationPanel>
						</div>
					}
					<Form.TextField
						id='nomorRekamMedis'
						className='input mb-[32px]'
						placeholder={ form.mrPlaceholder }
						{ ...registeredValue('nomorRekamMedis') }
					/>
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
					<div className='mb-[32px]'>
						<Form.DateField
							id='dateOfBirth'
							className='input'
							iconName='CalendarIcon'
							iconPosition='right'
							{ ...registeredValue('dateOfBirth', true) }

						/>
					</div>
					<div className='mb-[32px]'>
						<Checkbox
							label={ renderDisclaimerText() }
						/>
					</div>
					<Button
						type='submit'
						className='mt-[32px]'
						disabled={ !isFormValid() || loadingUser }
					>
						{
							loadingUser
								? <Spinner />
								: submitBtnLabel
						}
					</Button>
					<Button theme='outline'
						className='mt-[12px]'>
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
					<Link to={ '/' } />
				</Form>
			</Box>
		</RegisterOnboardStyle>
	);
};

export default RegisterOnboard;