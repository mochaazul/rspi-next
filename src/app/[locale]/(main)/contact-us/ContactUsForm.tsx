import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';

import { regExp, Languages as lang, colors } from '@/constant';
import { Button, Form, NotificationPanel, Text } from '@/components';
import { HospitalState, ContactUsState } from '@/interface';
import { PropsTypes as NotificationPanelTypes } from '@/components/NotificationPanel';
import { useTypedSelector } from '@/hooks';

import useContactUs from './useContactUs';

interface PropsType {
	hospitalSelector: HospitalState;
}

const language = lang.page.contactUs.contactForm;

const ContactUsForm = ({ hospitalSelector }: PropsType) => {
	const navigate = useRouter();
	const {
		onClickContactUs,
		contactUsField
	} = useContactUs();
	const {
		registeredValue, isFormValid, onSubmit
	} = Form.useForm({ fields: contactUsField });
	const { loading: loadingUser, error: errorUser } = useTypedSelector<ContactUsState>('contactUs');

	const [notifVisible, setNotifVisible] = useState(false);
	const [captchaStatus, setCaptchaStatus] = useState(false);
	const [notifMode, setNotifMode] = useState<NotificationPanelTypes['mode']>('success');

	const recaptchaRef = useRef(null);
	const SITE_KEY = process.env.REACT_APP_reCAPTCHA_SITE_KEY;

	const hospitalArr = hospitalSelector?.hospitals?.map(hospital => ({ key: hospital?.name, value: hospital?.hospital_code, label: hospital?.name }));

	useEffect(() => {
		setNotifMode(!!errorUser?.stat_msg ? 'error' : 'success');
	}, [errorUser]);

	const handleNotifOnClose = () => {
		setNotifVisible(false);
	};

	const onChangeCaptcha = (e: any) => {
		setCaptchaStatus(!captchaStatus);
	};

	const handleNotifError = () => {
		return <Text
			fontType={ null }
			fontSize='14px'
			fontWeight='500'
			text={ errorUser.stat_msg ? errorUser.stat_msg : 'Berhasil' }
			color={ errorUser.stat_msg ? colors.red.default : colors.black.default }
		/>;
	};

	return (
		<Form
			className='sm:mt-8 mt-4 flex flex-col sm:gap-[25px] gap-4'
			onSubmit={ e => {
				const { hospital_code, full_name, email, gender, phone, title, content } = onSubmit(e);
				onClickContactUs({
					hospital_code: hospital_code.value,
					full_name: full_name.value,
					email: email.value,
					gender: gender.value,
					phone: phone.value,
					title: title.value,
					content: content.value
				});
				setNotifVisible(true);
				setTimeout(() => navigate.push('/contact-us/faq'), 1500);
			} }
			autoComplete='off'
		>
			{
				notifVisible &&
				<div className='w-full mb-[32px]'>
					<NotificationPanel
						mode={ notifMode }
						visible={ notifVisible && !!errorUser && !loadingUser }
						onClickRightIcon={ handleNotifOnClose }
					>
						{ handleNotifError() }
					</NotificationPanel>
				</div>
			}
			<Form.Dropdown
				menuItems={ [{ key: 'all-hospital', value: 'all-hospital', label: language.form.allHospitalLabel }, ...hospitalArr] }
				{ ...registeredValue('hospital_code') }
			/>
			<div className='flex sm:flex-row flex-col sm:gap-8 gap-4'>
				<div className='flex flex-1 flex-col sm:gap-[25px] gap-4'>
					<Form.TextField
						{ ...registeredValue('full_name') }
					/>
					<Form.TextField
						{ ...registeredValue('email') }
					/>
				</div>
				<div className='flex flex-1 flex-col sm:gap-[25px] gap-4'>
					<Form.Dropdown
						menuItems={ [
							{
								key: '1',
								value: 'Male',
								label: 'Male'
							},
							{
								key: '2',
								value: 'Female',
								label: 'Female'
							}
						] }
						{ ...registeredValue('gender') }
					/>
					<Form.TextField
						{ ...registeredValue('phone') }
						onKeyDown={ ev => {
							if (regExp.phone_allowed_char_list.indexOf(ev.key) < 0) {
								ev.preventDefault();
							}
						} }
					/>
				</div>
			</div>
			<Form.Dropdown
				menuItems={ [
					{
						key: '1',
						value: 'Pertanyaan Umum',
						label: 'Pertanyaan Umum'
					},
					{
						key: '2',
						value: 'Pertanyaan Khusus',
						label: 'Pertanyaan Khusus'
					}
				] }
				{ ...registeredValue('title') }
			/>
			<Form.TextArea
				rows={ 7 }
				{ ...registeredValue('content') }
			/>
			<div className='flex sm:flex-row flex-col justify-between items-center max-sm:gap-6'>
				<ReCAPTCHA
					ref={ recaptchaRef }
					sitekey={ SITE_KEY || '' }
					onChange={ onChangeCaptcha }
				/>
				<div className='max-sm:w-full'>
					<Button
						theme='primary'
						hoverTheme='outline'
						label={ language.submitBtnLabel }
						type='submit'
						disabled={ !isFormValid() || captchaStatus === false }
					/>
				</div>
			</div>
		</Form>
	);
};

export default React.memo(ContactUsForm);