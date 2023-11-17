'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as Icons from 'react-feather';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { FormikProps, useFormik } from 'formik';

import { colors, regExp } from '@/constant';
import { cookiesHelper } from '@/helpers';
import {
	BreadcrumbsProps,
	CheckPinType,
	UpdateEmailType,
	UpdateProfileType
} from '@/interface';
import { getAge } from '@/helpers/getAge';
import { splitDate } from '@/helpers/datetime';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import NotificationPanel from '@/components/ui/NotificationPanel';
import MedicalRecordReminder from '@/components/ui/MedicalRecordReminder';
import SubMenuPage from '@/components/ui/SubMenuPage';
import Form from '@/components/ui/Form';
import HorizontalInputWrapper from '@/components/PageComponents/UserInformationSections/HorizontalInputWrapper';
import { useScopedI18n } from '@/locales/client';
import { useGetLastVisitHospital } from '@/lib/api/client/hospital';
import {
	useCheckPin,
	useGeneralUploads,
	useGetProfile,
	useUpdateAvatar,
	useUpdateEmail,
	useUpdateProfile
} from '@/lib/api/client/profile';
import { CheckPinSchema, UpdateEmailSchema, UpdateProfileSchema } from '@/validator/profile';

import ProfilePageStyle, { Divider } from './style';
// import useProfilePage from './useProfilePage';
import { getLastVisitedHospitalHelper } from '@/helpers/visitHelper';

// Notes: tidak digunakan
// type DisabledInputs = {
// 	email: boolean,
// 	password: boolean,
// 	pin: boolean;
// };

const editableInputProps = {
	iconPosition: 'right',
	featherIcon: 'Edit3',
	iconColor: colors.paradiso.default,
};

const ProfilePage = (props: BreadcrumbsProps) => {
	const uploadFileRef = useRef<HTMLInputElement>(null);

	const { data: visitHospitalHistory } = useGetLastVisitHospital();
	const { data: patientProfile, error: errorGetProfile } = useGetProfile();
	const { trigger: updateAvatar } = useUpdateAvatar();
	const { trigger: uploadPhotoPatient } = useGeneralUploads();
	const { trigger: updateEmail } = useUpdateEmail();
	const { trigger: updateProfile } = useUpdateProfile();
	const { trigger: checkPin } = useCheckPin();

	// const { profileFields } = useProfilePage();
	const navigate = useRouter();
	const languages = useScopedI18n('page.profilePage');
	const languagesPin = useScopedI18n('modalDialog.pin');

	// const {
	// 	setFieldsValue,
	// 	registeredValue,
	// 	onSubmit
	// } = Form.useForm({ fields: profileFields });

	// const updateUserDetailState = useAppDispatch(updateUserInfo);

	const [tempImage, setTempImage] = useState<Blob | null>(null);
	const [clickUpdatePhoto, setClickUpdatePhoto] = useState<boolean>(false);
	// const [isDisableFormProfile, setIsDisableFormProfile] = useState<boolean>(false);
	const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
	const [showModalSuccessUpdateEmail, setShowModalSuccessUpdateEmail] = useState<boolean>(false);
	const [showModalNewEmail, setShowModalNewEmail] = useState<boolean>(false);
	const [pinModalVisible, setPinModalVisible] = useState<boolean>(false);
	const [isLoadingUploadAvatar, setIsLoadingUploadAvatar] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [enableValidation, setEnableValidation] = useState<Record<string, boolean>>({
		profile: false,
		email: false,
		pin: false
	});

	const isDisableFormProfile = useMemo(() => {
		return !!patientProfile?.data?.no_mr;
	}, [patientProfile?.data?.no_mr]);

	const lastVisitedHospital = useMemo(() => {
		if (!visitHospitalHistory?.data) return null;
		return getLastVisitedHospitalHelper(visitHospitalHistory?.data);
	}, [visitHospitalHistory?.data]);

	console.log({ patientProfile, visitHospitalHistory });
	console.log({ lastVisitedHospital });

	const formikProfile: FormikProps<UpdateProfileType> = useFormik<UpdateProfileType>({
		validateOnBlur: enableValidation.profile,
		validateOnChange: enableValidation.profile,
		validationSchema: UpdateProfileSchema,
		initialValues: {
			name: patientProfile?.data?.name ?? '',
			birthdate: patientProfile?.data?.birthdate ?? '',
			gender: patientProfile?.data?.gender ?? '',
			phone: patientProfile?.data?.phone ?? ''
		},
		enableReinitialize: true,
		onSubmit: async (formProfile: UpdateProfileType) => {
			try {
				await updateProfile(formProfile);
				// updateUserDetailState({
				// 	...payload
				// }); // TODO: refetch getProfile & save to cookies
				setShowModalSuccess(true);
			} catch (error) {
				console.log(error); // TODO: show error message
			} finally {
				setEnableValidation(prevToggle => ({ ...prevToggle, profile: false }));
			}
		},
	});

	const formikEmail: FormikProps<UpdateEmailType> = useFormik<UpdateEmailType>({
		validateOnBlur: enableValidation.email,
		validateOnChange: enableValidation.email,
		validationSchema: UpdateEmailSchema,
		initialValues: { email: '' },
		onSubmit: async (formEmail: UpdateEmailType) => {
			try {
				await updateEmail(formEmail);
				setShowModalSuccessUpdateEmail(true);
			} catch (error) {
				console.log(error); // TODO: show error message
			} finally {
				setEnableValidation(prevToggle => ({ ...prevToggle, email: false }));
			}
		},
	});

	const formikPin: FormikProps<CheckPinType> = useFormik<CheckPinType>({
		validateOnBlur: enableValidation.pin,
		validateOnChange: enableValidation.pin,
		initialValues: { pin: '' },
		validationSchema: CheckPinSchema,
		onSubmit: async (formPin: CheckPinType) => {
			try {
				await checkPin(formPin);
				setPinModalVisible(false);
				setShowModalNewEmail(true);
			} catch (error: any) {
				setError(error?.message ?? '');
			} finally {
				setEnableValidation(prevToggle => ({ ...prevToggle, pin: false }));
			}
		},
	});

	// Notes: tidak digunakan
	// const [disabledInputs, setDisabledInputs] = useState<DisabledInputs>({
	// 	email: true,
	// 	password: true,
	// 	pin: true
	// });

	// const activeEmail = localStorage.getEmail(); // Notes: pending

	// Notes: pending
	// const handleSwitchAccount = (id: number) => async () => {
	// 	const selectedAccount: string = switchAccountUsers[id];
	// 	await localStorage.setEmail(selectedAccount?.split(':')[0]);
	// 	await localStorage.setTokenUser(selectedAccount?.split(':')[1]);
	// 	setTimeout(() => setSwitchAccountPickerShow(false), 500);
	// 	window.location.reload();
	// };

	// Notes: sepertinya tidak digunakan
	// const toggleInput = (key: keyof DisabledInputs) => {
	// 	setDisabledInputs({
	// 		...disabledInputs,
	// 		[key]: !disabledInputs[key]
	// 	});
	// };

	// useEffect(() => {
	// createListOfHistoryUsers(); // Notes: pending
	// 	getDataProfile();
	// }, []);

	// useEffect(() => {
	// 	if (patientProfile?.data) {
	// 		setIsDisableFormProfile(patientProfile?.data?.no_mr !== '');
	// 		setFieldsValue({
	// 			pin: '*****',
	// 			password: '*****',
	// 			dob: splitDate(patientProfile?.data?.birthdate),
	// 			...patientProfile
	// 		});
	// 	}
	// }, [patientProfile?.data]);

	// TODO: bagaimana caranya jika pakai useSWR?
	// const getDataProfile = async () => {
	// 	const responseData = await getProfile();
	// 	if (responseData.payload.stat_msg !== 'Success') {
	// 		removeUserDatas();
	// 	}
	// };

	const removeUserDatas = async () => {
		await cookiesHelper.clearStorage();
		navigate.replace('/login');
	};

	// Notes: apakah ada cara yg lebih baik?
	useEffect(() => {
		if (errorGetProfile) {
			removeUserDatas();
		}
	}, [errorGetProfile]);

	// Notes: pending
	// const createListOfHistoryUsers = () => {
	// 	let tempSwitchAccountUsers: Array<any> = localStorage.getUserLoginHistory()?.split(',') ?? [];
	// 	tempSwitchAccountUsers = tempSwitchAccountUsers.filter(e => e !== '');
	// 	tempSwitchAccountUsers = [...tempSwitchAccountUsers, '+ Add Another Account'];
	// 	setSwitchAccountUsers(tempSwitchAccountUsers);
	// };

	const clickUploadPhotoPatient = async () => {
		try {
			setIsLoadingUploadAvatar(true);
			const formImg = new FormData();
			formImg.append('upload', tempImage ?? '');

			const responseData = await uploadPhotoPatient({ payload: formImg });
			if (responseData.stat_msg === 'Success') {
				await updateAvatar({
					img_url: responseData.data
				});
			}
		} catch (error) {
			console.log(error); // TODO: show error message
		} finally {
			setIsLoadingUploadAvatar(false);
		}
	};

	const clickUpdateProfile = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setEnableValidation(prevToggle => ({ ...prevToggle, profile: true }));
		formikProfile.handleSubmit();
	};

	const userClickUpdateEmail = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setEnableValidation(prevToggle => ({ ...prevToggle, email: true }));
		formikEmail.handleSubmit();
	};

	const onChangeInputProfile = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		formikProfile.setFieldValue(e.target.id, e.target.value);
	};

	const onChangeValueProfile = (data: { name?: string; value?: string; }) => {
		if (data?.name) {
			formikProfile.setFieldValue(data?.name, data?.value ?? '');
		}
	};

	const onChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		formikEmail.setFieldValue(e.target.id, e.target.value);
	};

	const onChangeValuePin = (data: { name?: string; value?: string; }) => {
		if (data?.name) {
			formikPin.setFieldValue(data?.name, data?.value ?? '');
		}
	};

	// Notes: sepertinya tidak digunakan. tapi untuk jaga-jaga
	// const parsePhoneNumber = () => {
	// 	if (patientProfile?.data?.phone) {
	// 		const phone: string = patientProfile?.data?.phone;
	// 		return phone.replaceAll('+62', '0');
	// 	}
	// };

	// Notes: sepertinya tidak digunakan
	// const pinField = {
	// 	pin: {
	// 		...createFieldConfig({
	// 			name: 'pin',
	// 			type: 'password'
	// 		}),
	// 		validationRules: [
	// 			requiredRule('pin'),
	// 			minLengthRule('pin', 6),
	// 			maxLengthRule('pin', 6),
	// 		],
	// 		label: 'PIN'
	// 	}
	// };

	return (
		<Layout.PanelV1>
			<Layout.PanelH2>
				<Breadcrumbs datas={ props.breadcrumbsPath } />
				<ProfilePageStyle className='mt-[25px] sm:mt-[50px]'>
					<div className='flex items-end lg:items-start justify-between max-lg:flex-col'>
						<div>
							<Text
								fontWeight='900'
								fontSize='24px'
								lineHeight='29px'
								color={ colors.grey.darker }
								text={ languages('heading') }
							/>
							<Text
								fontWeight='400'
								fontSize='16px'
								lineHeight='19px'
								color={ colors.grey.dark }
								className='mt-3'
								text={ languages('subHeading') }
							/>
						</div>
						{/* Notes: Login As dipending */ }
						{/* <div className='relative inline-block max-lg:mt-4 max-lg:justify-end'>
							<Button
								theme='outline'
								hoverTheme='primary'
								className='px-[25px] py-2.5 !w-auto max-sm:text-sm'
								onClick={ () => setSwitchAccountPickerShow(!switchAccountPickerShow) }
							>
								<div className='flex items-center gap-3'>
									{ loginAsLabel }<Icons.ChevronDown size={ 22 } />
								</div>
							</Button>
							<Picker show={ switchAccountPickerShow } className='z-40'>
								{
									switchAccountUsers?.map((data: any, index: number) => (
										<div
											key={ index }
											className={ `cursor-pointer border-gray block py-4 px-4 flex justify-between items-center ${ index < switchAccountUsers?.length ? '' : 'border-b' } ${ data.split(':')[0] === activeEmail ? 'active' : '' }` }
											onClick={ async () => {
												if (data === '+ Add Another Account') {
													removeUserDatas();
												} else {
													const selectedAccount: string = switchAccountUsers[index];
													await localStorage.setEmail(selectedAccount?.split(':')[0]);
													await localStorage.setTokenUser(selectedAccount?.split(':')[1]);
													setTimeout(() => setSwitchAccountPickerShow(false), 500);
													window.location.reload();
												}
											} }
										>
											<Text
												fontSize='16px'
												fontWeight='700'
												lineHeight='19px'
												text={ data.split(':')[0] }
											/>
											<Icons.Check className={ `check-icon ${ data.split(':')[0] === activeEmail ? '' : 'hidden' }` } size={ 20 } />
										</div>
									))
								}
							</Picker>
						</div> */}
					</div>

					{
						isDisableFormProfile ?
							<div className='user-panel card-shadow p-4 lg:p-5'>
								<div className='flex justify-between lg:justify-center lg:grid lg:grid-cols-4 lg:gap-4 lg:items-center'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-full mr-4 lg:mr-[18px] relative overflow-hidden cursor-pointer'>
											<img
												src={ tempImage ? URL.createObjectURL(tempImage) : patientProfile?.data?.img_url }
												alt={ tempImage ? 'Temp Image' : patientProfile?.data?.img_url }
												className='w-full h-full object-cover'
											/>
											<div className='w-full h-full absolute flex items-center justify-center upload-mask top-0' onClick={ () => uploadFileRef.current?.click() }>
												<Icons.Camera color={ colors.grey.dark } />
											</div>
											<input
												type='file'
												ref={ uploadFileRef }
												onChange={ () => setTempImage(uploadFileRef.current?.files?.[0] ? uploadFileRef.current?.files[0] : null) }
												className='hidden'
												accept='image/*'
											/>
										</div>
										<div className='flex flex-col gap-1 lg:gap-y-2.5'>
											<Text
												fontWeight='700'
												fontSize='16px'
												lineHeight='19px'
												text={ patientProfile?.data?.name }
											/>
											<Text
												fontWeight='400'
												fontSize='14px'
												lineHeight='17px'
												className='capitalize'
												text={ patientProfile?.data?.birthdate && patientProfile?.data?.gender && `${ getAge(splitDate(patientProfile?.data?.birthdate)) }, ${ patientProfile?.data?.gender }` }
											/>
										</div>
									</div>
									<div className='flex flex-col gap-1 lg:gap-y-2.5'>
										<Text
											fontWeight='400'
											fontSize='14px'
											lineHeight='17px'
											subClassName='max-lg:text-center'
											text={ languages('profileDetail.patientIdLabel') }
										/>
										<Text
											fontWeight='700'
											fontSize='16px'
											lineHeight='19px'
											subClassName='max-lg:text-center'
											text={ patientProfile?.data?.patient_code }
										/>
									</div>
									<div className='max-lg:hidden flex flex-col gap-y-2.5'>
										<Text
											fontWeight='400'
											fontSize='14px'
											lineHeight='17px'
											text={ languages('profileDetail.lastVisitedHospitalLabel') }
										/>
										<Text
											fontWeight='700'
											fontSize='16px'
											lineHeight='19px'
											text={ lastVisitedHospital?.hospital_desc ?? '-' }
										/>
									</div>
									<div className='max-lg:hidden flex flex-col gap-y-2.5'>
										<Text
											fontWeight='400'
											fontSize='14px'
											lineHeight='17px'
											text={ languages('profileDetail.lastVisitedDateLabel') }
										/>
										<Text
											fontWeight='700'
											fontSize='16px'
											lineHeight='19px'
											text={ dayjs(lastVisitedHospital?.adm_date).format('DD MMM YYYY') ?? '-' }
										/>
									</div>
								</div>
								<div className='hidden pt-6 mt-6 border-t border-[#F0F2F9] max-lg:flex justify-between'>
									<div className='flex flex-col gap-1'>
										<Text
											fontWeight='400'
											fontSize='14px'
											lineHeight='17px'
											text={ languages('profileDetail.lastVisitedHospitalLabel') }
											textAlign='center'
										/>
										<Text
											fontWeight='700'
											fontSize='16px'
											lineHeight='19px'
											text={ lastVisitedHospital?.hospital_desc ?? '-' }
											textAlign='center'
										/>
									</div>
									<div className='flex flex-col gap-1'>
										<Text
											fontWeight='400'
											fontSize='14px'
											lineHeight='17px'
											text={ languages('profileDetail.lastVisitedDateLabel') }
											textAlign='center'
										/>
										<Text
											fontWeight='700'
											fontSize='16px'
											lineHeight='19px'
											text={ dayjs(lastVisitedHospital?.adm_date).format('DD MMM YYYY') ?? '-' }
											textAlign='center'
										/>
									</div>
								</div>
							</div> :
							<div className='mt-[30px] lg:px-[60px]'>
								<MedicalRecordReminder isFloating={ false } />
							</div>
					}
					<div className='flex mt-5 sm:mt-12 mb-[200px]'>
						<SubMenuPage menuList={ [languages('profileLabel'), languages('securitySettingLabel')] }>
							<div className='flex flex-col gap-[10px]'>
								<div className='flex max-md:mb-4 max-md:flex-col md:items-center md:justify-between md:w-full'>
									<div className='flex flex-row gap-x-4 items-center w-full'>
										<div className='w-[82px] md:w-[100px] h-[82px] md:h-[100px] rounded-full overflow-hidden flex-shrink-0'>
											<img
												src={ tempImage ? URL.createObjectURL(tempImage) : patientProfile?.data?.img_url }
												alt={ tempImage ? 'Temp Image' : patientProfile?.data?.img_url }
												className='w-full h-full object-cover'
											/>
										</div>
										{
											clickUpdatePhoto ?
												<div className='flex flex-col gap-y-2'>
													<input
														type='file'
														ref={ uploadFileRef }
														onChange={ () => setTempImage(uploadFileRef.current?.files?.[0] ? uploadFileRef.current?.files[0] : null) }
														className='hidden'
														accept='image/*'
													/>
													<Text
														fontSize='16px'
														lineHeight='24px'
														fontType='h4'
														fontWeight='400'
														color={ colors.paradiso.default }
														subClassName='max-sm:text-sm'
														onClick={ () => uploadFileRef.current?.click() }
													>
														{ languages('choosePhotoLabel') }
													</Text>
													<Text
														fontSize='14px'
														lineHeight='24px'
														fontType='h4'
														fontWeight='400'
														color={ colors.grey.default }
														subClassName='max-sm:text-xs'
													>
														{ languages('formatPhotoLabel') }
													</Text>
												</div> :
												<Button
													theme='outline'
													hoverTheme='primary'
													themeColor='rgba(173, 181, 189, 1)'
													className='px-[15px] sm:px-5 py-2.5 !w-auto text-sm lg:text-base text-[#2A2536]'
													label={ languages('updatePhotoLabel') }
													onClick={ () => setClickUpdatePhoto(true) }
												/>
										}
									</div>
									{
										clickUpdatePhoto ?
											<div className='flex max-md:mt-4 gap-4 md:gap-5 lg:gap-8 justify-end items-center'>
												<div>
													<Button
														theme='primary'
														className='px-5 sm:px-4 py-2.5 text-sm lg:text-base text-[#2A2536] sm:whitespace-nowrap'
														themeColor={ colors.grey.lightest }
														label={ languages('deletePhotoLabel') }
													/>
												</div>
												<div>
													<Button
														theme='primary'
														className='px-5 sm:px-4 py-2.5 text-sm lg:text-base sm:whitespace-nowrap'
														hoverTheme='primary'
														label={ languages('uploadPhotoLabel') }
														onClick={ clickUploadPhotoPatient }
														disabled={ isLoadingUploadAvatar }
													/>
												</div>
											</div>
											: null
									}
								</div>
								<Form onSubmit={ clickUpdateProfile }>
									<HorizontalInputWrapper
										label={ languages('profileDetail.patientEmail') }
										labelInfo={ !isDisableFormProfile ? languages('profileDetail.patientPhoneNumberLabelInfo') : undefined }
										inputProps={ {
											// ...registeredValue('email'),
											...editableInputProps,
											type: 'email',
											value: formikEmail.values.email,
											placeholder: languages('profileDetail.patientEmailPlaceholder'),
											disabled: true,
											onIconClick: () => {
												setPinModalVisible(true);
												setError('');
											}
										} }
									/>
									<Divider />
									<div className='mb-[25px] flex max-sm:flex-col sm:items-baseline sm:gap-4'>
										<Text
											fontSize='20px'
											fontWeight='900'
											color={ colors.grey.dark }
											text={ languages('medicalRecordLabel') }
										/>

										{
											!isDisableFormProfile &&
											<Text
												fontSize='16px'
												fontWeight='400'
												fontStyle='italic'
												color={ colors.red.default }
												text={ languages('medicalRecordEmptyInfo') }
											/>
										}
									</div>
									<HorizontalInputWrapper
										label={ languages('profileDetail.patientNameLabel') }
										inputProps={ {
											// ...registeredValue('name'),
											id: 'name',
											name: 'name',
											type: 'text',
											value: formikProfile.values.name,
											onChange: onChangeInputProfile,
											placeholder: languages('profileDetail.patientNamePlaceholder'),
											disabled: isDisableFormProfile
										} }
									/>
									<HorizontalInputWrapper
										label={ languages('profileDetail.patientGenderLabel') }
										inputType='dropdown'
										inputProps={ {
											// ...registeredValue('gender'),
											id: 'gender',
											name: 'gender',
											value: formikProfile.values.gender,
											onChange: onChangeInputProfile,
											placeholder: languages('profileDetail.patientGenderPlaceholder'),
											disabled: isDisableFormProfile,
											className: 'capitalize'
										} }
									/>
									{
										isDisableFormProfile &&
										<HorizontalInputWrapper
											label={ languages('profileDetail.patientMedicalNumber') }
											inputProps={ {
												placeholder: languages('profileDetail.patientMedicalNumberPlaceholder'),
												disabled: true,
												value: patientProfile?.data?.no_mr
											} }
										/>
									}
									<HorizontalInputWrapper
										label={ languages('profileDetail.patientBirthDateLabel') }
										inputType='date'
										inputProps={ {
											// ...registeredValue('dob', true),
											id: 'birthdate',
											name: 'birthdate',
											value: formikProfile.values.birthdate,
											onChangeValue: onChangeValueProfile,
											placeholder: languages('profileDetail.patientBirthDatePlaceholder'),
											disabled: isDisableFormProfile
										} }
									/>
									<HorizontalInputWrapper
										label={ languages('profileDetail.patientPhoneNumber') }
										labelInfo={ isDisableFormProfile ? languages('profileDetail.patientPhoneNumberLabelInfo') : undefined }
										inputProps={ {
											// ...registeredValue('phone'),
											id: 'phone',
											name: 'phone',
											value: formikProfile.values.phone,
											onChange: onChangeInputProfile,
											placeholder: languages('profileDetail.patientPhoneNumberPlaceholder'),
											disabled: isDisableFormProfile,
											onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => {
												if (regExp.phone_allowed_char_list.indexOf(ev.key) < 0) {
													ev.preventDefault();
												}
											}
										} }
									/>

									{
										!isDisableFormProfile &&
										<div className='flex justify-end align-center gap-5 mt-[50px]'>
											<div>
												<Button
													theme='outline'
													hoverTheme='primary'
													label={ languages('securitySetting.cancelBtnLabel') }
												/>
											</div>
											<div>
												<Button
													type='submit'
													theme='primary'
													hoverTheme='outline'
													label={ languages('securitySetting.saveBtnLabel') }
												/>
											</div>
										</div>
									}
								</Form>
							</div>
							<div className='flex flex-col gap-[10px]'>
								<HorizontalInputWrapper
									label={ languages('securitySetting.passwordLabel') }
									value='123456789010'
									inputProps={ {
										...editableInputProps,
										placeholder: languages('securitySetting.passwordLabel'),
										disabled: true,
										type: 'password',
										onIconClick: () => navigate.push('/update-password')
									} }
								/>
								<HorizontalInputWrapper
									label={ languages('securitySetting.pinLabel') }
									value='123456'
									inputProps={ {
										...editableInputProps,
										placeholder: languages('securitySetting.pinLabel'),
										disabled: true,
										type: 'password',
										onIconClick: () => navigate.replace('/pin-reset')
									} }
								/>
							</div>
						</SubMenuPage>
					</div>
				</ProfilePageStyle>
				<Modal visible={ pinModalVisible } onClose={ () => setPinModalVisible(false) }>
					<div className='flex flex-col items-center gap-4'>
						<Form
							onSubmit={ e => {
								e.preventDefault();
								setEnableValidation(prevToggle => ({ ...prevToggle, pin: true }));
								formikPin.handleSubmit();
								// const { pin } = onSubmit(e);
								// const responseData = await checkPin({
								// 	pin: pin.value
								// });
								// if (responseData.payload.stat_msg === 'Success') {
								// 	setPinModalVisible(false);
								// 	setShowModalNewEmail(true);
								// } else {
								// 	setError(responseData.payload.stat_msg);
								// }
							} }>
							<Text text={ languagesPin('header') } fontWeight='900' fontSize='28px' lineHeight='48px' />
							<Text text={ languagesPin('subHeader') } fontWeight='400' fontSize='16px' lineHeight='normal' color={ colors.grey.default } />
							{
								error &&
								<div className='mt-[20px]'>
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
											text={ error }
											color={ colors.red.default }
										/>
									</NotificationPanel>
								</div>

							}
							<div className='mt-[48px] mb-[20px]'>
								<Text text={ 'PIN' } fontWeight='700' />
								<Form.TextFieldPin
									className='input'
									digitLength={ 6 }
									semiSecure={ false }
									password={ true }
									value={ formikPin.values.pin }
									onChangeValue={ onChangeValuePin }
									id='pin'
									name='pin'
									type='password'
									errorMessage={ formikPin.errors.pin }
									isError={ !!formikPin.errors.pin }
								// { ...registeredValue('pin', true) }
								/>
							</div>
							<Button type='submit' label={ languagesPin('submitBtnLabel') } />
						</Form>

					</div>
				</Modal>
				<Modal visible={ showModalNewEmail } onClose={ () => setShowModalNewEmail(false) }>
					<div>
						<Form onSubmit={ userClickUpdateEmail }>
							<HorizontalInputWrapper
								label={ languages('profileDetail.patientOldEmail') }
								inputProps={ {
									placeholder: languages('profileDetail.patientOldEmailPlaceHolder'),
									disabled: false,
									type: 'text',
								} }
							/>
							<HorizontalInputWrapper
								label={ languages('profileDetail.patientNewEmail') }
								inputProps={ {
									// ...registeredValue('new_email'),
									id: 'email',
									name: 'email',
									value: formikEmail.values.email,
									onChange: onChangeInputEmail,
									placeholder: languages('profileDetail.patientNewEmailPlaceHolder'),
									disabled: false,
									type: 'email'
								} }
							/>
							<div className='flex justify-end align-center gap-5 mt-[50px]'>
								<div>
									<Button type='submit' theme='primary' hoverTheme='outline' label={ languages('securitySetting.saveBtnLabel') } />
								</div>
							</div>
						</Form>
					</div>
				</Modal>
				<Modal visible={ showModalSuccess } onClose={ () => setShowModalSuccess(false) }>
					<div>
						<Text
							fontSize='16px'
							lineHeight='19px'
							fontWeight='900'
							color={ colors.paradiso.default }
							text={ 'Berhasil Update Profile' }
						/>
					</div>
				</Modal>
				<Modal visible={ showModalSuccessUpdateEmail } onClose={ () => setShowModalSuccessUpdateEmail(false) }>
					<div>
						<Text
							fontSize='16px'
							lineHeight='19px'
							fontWeight='900'
							color={ colors.paradiso.default }
							text={ 'Berhasil Mengirim Link Verifikasi Email, Silahkan Cek Kotak Masuk Email Anda' }
						/>
					</div>
				</Modal>

			</Layout.PanelH2>
		</Layout.PanelV1 >
	);
};

export default ProfilePage;