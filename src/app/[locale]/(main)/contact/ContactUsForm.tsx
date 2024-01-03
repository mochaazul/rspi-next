'use client';
import React, {
	useState,
	useEffect,
	useRef
} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FormikProps, useFormik } from 'formik';

import { regExp, colors, icons } from '@/constant';
import { Button, Form, Modal, Text } from '@/components/ui';
import { ContactUsState, ContactUsSubmitType, HospitalDetail } from '@/interface';
import { PropsTypes as NotificationPanelTypes } from '@/components/ui/NotificationPanel';
import { useScopedI18n } from '@/locales/client';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';
import { ContactUsSchema } from '@/validator/contact';
import { postContactUs } from '@/lib/api';

const ContactUsForm = ({
	hospitalSelector
}: {
	hospitalSelector: HospitalDetail[];
}) => {
	const t = useScopedI18n('page.contactUs');
	const tValidation = useScopedI18n('validation.formValidation');

	const [notifResponse, setNotifResponse] = useState<ContactUsState>(
		{
			loading: false,
			error: {
				stat_code: '',
				stat_msg: '',
			},
			customMessage: '',
		}
	);

	const { loading: loadingUser, error: errorUser } = notifResponse;

	const [notifVisible, setNotifVisible] = useState(false);
	const [captchaStatus, setCaptchaStatus] = useState(false);
	const [notifMode, setNotifMode] = useState<NotificationPanelTypes['mode']>('success');
	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [visible, setVisible] = useState(false);

	const recaptchaRef = useRef(null);
	const SITE_KEY = process.env.NEXT_PUBLIC_reCAPTCHA_SITE_KEY;

	const hospitalArr = Object.values(hospitalSelector || [])?.map(hospital => ({ key: hospital?.name, value: hospital?.hospital_code, label: hospital?.name }));

	const formikContactUs: FormikProps<ContactUsSubmitType> = useFormik<ContactUsSubmitType>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		validationSchema: ContactUsSchema,
		initialValues: {
			hospital_code: '',
			full_name: '',
			gender: '',
			email: '',
			phone: '',
			title: '',
			content: ''
		},
		onSubmit: async(formContact: ContactUsSubmitType) => {
			setNotifResponse({
				loading: true,
				error: {
					stat_code: '',
					stat_msg: '',
				},
				customMessage: ''
			});

			const response = await postContactUs({ body: formContact });

			setNotifMode(response.stat_msg === 'Success' ? 'success' : 'error');
			setNotifVisible(true);
			setNotifResponse({
				loading: false,
				error: {
					stat_code: response?.stat_code,
					stat_msg: response?.stat_msg,
				},
				customMessage: response?.stat_msg + '-' + response?.stat_code,
			});

			setVisible(true);

			formikContactUs.resetForm();
			setCaptchaStatus(false);
		},
	});

	useEffect(() => {

	}, [notifMode]);

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
			text={ errorUser?.stat_msg ? errorUser?.stat_msg : 'Berhasil' }
			color={ notifMode === 'error' ? colors.red.default : colors.black.default }
		/>;
	};

	const getInputErrorMessage = (key?: string, label?: string) => {
		return getValidationTranslation(tValidation, key, { label });
	};

	return (
		<>
			<Form
				className='sm:mt-8 mt-4 flex flex-col sm:gap-[25px] gap-4'
				onSubmit={ e => {
					e.preventDefault();
					setEnableValidation(true);
					formikContactUs.handleSubmit();
				} }
				autoComplete='off'
			>
				<Form.Dropdown
					menuItems={ [{ key: 'all-hospital', value: 'all-hospital', label: t('contactForm.form.allHospitalLabel') }, ...hospitalArr] }
					id='hospital_code'
					name='hospital_code'
					label={ t('contactForm.labels.hospital') }
					placeholder={ t('contactForm.placeholder.hospital') }
					onChange={ formikContactUs.handleChange }
					value={ formikContactUs.values.hospital_code }
					isError={ !!formikContactUs.errors.hospital_code }
					errorMessage={ getInputErrorMessage(formikContactUs.errors.hospital_code, t('contactForm.labels.hospital')) }
				/>
				<div className='flex sm:flex-row flex-col sm:gap-8 gap-4'>
					<div className='flex flex-1 flex-col sm:gap-[25px] gap-4'>
						<Form.TextField
							id='full_name'
							name='full_name'
							label={ t('contactForm.labels.fullName') }
							placeholder={ t('contactForm.placeholder.fullName') }
							onChange={ formikContactUs.handleChange }
							value={ formikContactUs.values.full_name }
							isError={ !!formikContactUs.errors.full_name }
							errorMessage={ getInputErrorMessage(formikContactUs.errors.full_name, t('contactForm.labels.fullName')) }
						/>
						<Form.TextField
							id='email'
							name='email'
							label={ t('contactForm.labels.email') }
							placeholder={ t('contactForm.placeholder.email') }
							onChange={ formikContactUs.handleChange }
							value={ formikContactUs.values.email }
							isError={ !!formikContactUs.errors.email }
							errorMessage={ getInputErrorMessage(formikContactUs.errors.email, t('contactForm.labels.email')) }
						/>
					</div>
					<div className='flex flex-1 flex-col sm:gap-[25px] gap-4'>
						<Form.Dropdown
							menuItems={ [
								{
									key: '1',
									value: 'Male',
									label: t('contactForm.genderOptionsLabel.male')
								},
								{
									key: '2',
									value: 'Female',
									label: t('contactForm.genderOptionsLabel.female')
								}
							] }
							id='gender'
							name='gender'
							label={ t('contactForm.labels.gender') }
							placeholder={ t('contactForm.placeholder.gender') }
							onChange={ formikContactUs.handleChange }
							value={ formikContactUs.values.gender }
							isError={ !!formikContactUs.errors.gender }
							errorMessage={ getInputErrorMessage(formikContactUs.errors.gender, t('contactForm.labels.gender')) }
						/>
						<Form.TextField
							id='phone'
							name='phone'
							label={ t('contactForm.labels.phone') }
							placeholder={ t('contactForm.placeholder.phone') }
							onChange={ formikContactUs.handleChange }
							value={ formikContactUs.values.phone }
							isError={ !!formikContactUs.errors.phone }
							errorMessage={ getInputErrorMessage(formikContactUs.errors.phone, t('contactForm.labels.phone')) }
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
							label: t('contactForm.titleOptionsLabel.general')
						},
						{
							key: '2',
							value: 'Pertanyaan Khusus',
							label: t('contactForm.titleOptionsLabel.specific')
						}
					] }
					id='title'
					name='title'
					label={ t('contactForm.labels.subject') }
					placeholder={ t('contactForm.placeholder.subject') }
					onChange={ formikContactUs.handleChange }
					value={ formikContactUs.values.title }
					isError={ !!formikContactUs.errors.title }
					errorMessage={ getInputErrorMessage(formikContactUs.errors.title, t('contactForm.labels.subject')) }
				/>
				<Form.TextArea
					rows={ 7 }
					id='content'
					name='content'
					label={ t('contactForm.labels.notes') }
					placeholder={ t('contactForm.placeholder.notes') }
					onChange={ formikContactUs.handleChange }
					value={ formikContactUs.values.content }
					isError={ !!formikContactUs.errors.content }
					errorMessage={ getInputErrorMessage(formikContactUs.errors.content, t('contactForm.labels.notes')) }
				/>
				{ /* {
					notifVisible && errorUser.stat_msg &&
				<div className='w-full mb-[32px]'>
					<NotificationPanel
						mode={ notifMode }
						visible={ notifVisible && !!errorUser && !loadingUser }
						onClickRightIcon={ handleNotifOnClose }
					>
						{ handleNotifError() }
					</NotificationPanel>
				</div>
				} */ }
				<div className='flex sm:flex-row flex-col justify-between items-center max-sm:gap-6'>
					<ReCAPTCHA
						ref={ recaptchaRef }
						sitekey={ SITE_KEY || '' }
						onChange={ onChangeCaptcha }
					/>
					<div className='max-sm:w-full'>
						<Button
							theme='primary'
							label={ t('contactForm.submitBtnLabel') }
							type='submit'
							disabled={ loadingUser || captchaStatus === false }
						/>
					</div>
				</div>
			</Form>
			<Modal
				visible={ visible }
				onClose={ () => setVisible(false) }
				width='560px'
			>
				<div className='relative flex flex-col items-center'>
					{ notifMode === 'success' ? <icons.Confirmed /> : <div className='p-4 bg-gray-200 rounded-full'><icons.Close /></div> }
					<Text
						fontSize='23px'
						lineHeight='19px'
						fontType='h4'
						fontWeight='900'
						color={ colors.grey.darker }
						text={ notifMode === 'error' ? t('contactForm.errorSubmit') : t('contactForm.successSubmit') }
						className='mt-5'
					/>
					<Button type='submit' label={ t('contactForm.handleButtonModalSubmit') } className='mt-[32px]' onClick={ () => setVisible(false) } />
				</div>
			</Modal>
		</>

	);
};

export default React.memo(ContactUsForm);