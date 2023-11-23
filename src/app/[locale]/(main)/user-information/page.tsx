'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { FormikProps, useFormik } from 'formik';
import Image from 'next/image';

import { icons, colors, regExp } from '@/constant';
import { cookiesHelper } from '@/helpers';
import {
	CheckPinType,
	UpdateEmailType,
	UpdateProfileType
} from '@/interface';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import NotificationPanel from '@/components/ui/NotificationPanel';
import MedicalRecordReminder from '@/components/ui/MedicalRecordReminder';
import SubMenuPage from '@/components/ui/SubMenuPage';
import Form from '@/components/ui/Form';
import HorizontalInputWrapper from '@/components/ui/PageComponents/UserInformationSections/HorizontalInputWrapper';
import CardUserMR from '@/components/ui/PageComponents/UserInformationSections/CardUserMR';
import { useScopedI18n } from '@/locales/client';
import { useGetVisitHistory } from '@/lib/api/client/hospital';
import {
	useGeneralUploads,
	useGetProfile,
	useUpdateAvatar,
	useUpdateEmail,
	useUpdateProfile
} from '@/lib/api/client/profile';
import {
	CheckPinSchema,
	UpdateEmailSchema,
	UpdateProfileSchema,
	UploadPhotoSchema
} from '@/validator/profile';
import { getLastVisitedHospitalHelper } from '@/helpers/visitHelper';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';
import { usePostCheckPinMutation } from '@/lib/api/client/auth';
import { getProfile } from '@/lib/api/profile';

import ProfilePageStyle, { Divider } from './style';
import { PanelH2 } from '../style';

// NOTE: COULD BE SEPARATED ON TO HELPER FILE IF NEEDED
const getBase64 = (file: File | null) => {
	return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		} else {
			resolve('');
		}
	});
};

type UploadPhotoTypeState = {
	photo_file: File | null;
};

export default function Page() {
	const uploadFileRef = useRef<HTMLInputElement>(null);

	const { data: patientProfile, error: errorGetProfile, mutate: getProfileMutation, isLoading: loadingGetProfile } = useGetProfile();
	const { data: visitHospitalHistory } = useGetVisitHistory();
	const { trigger: updateAvatar } = useUpdateAvatar();
	const { trigger: uploadPhotoPatient } = useGeneralUploads();
	const { trigger: updateEmail } = useUpdateEmail();
	const { trigger: updateProfile, isMutating: loadingUpdateProfile } = useUpdateProfile();
	const { trigger: checkPin } = usePostCheckPinMutation();

	const navigate = useRouter();
	const t = useScopedI18n('page.profilePage');
	const tModalPin = useScopedI18n('modalDialog.pin');
	const tValidation = useScopedI18n('validation.formValidation');
	const breadcrumbsPath = [{ name: t('heading'), url: '#' }];

	const [tempImageSrc, setTempImageSrc] = useState<string>('');
	const [clickUpdatePhoto, setClickUpdatePhoto] = useState<boolean>(false);
	const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
	const [showModalSuccessUpdateEmail, setShowModalSuccessUpdateEmail] = useState<boolean>(false);
	const [showModalNewEmail, setShowModalNewEmail] = useState<boolean>(false);
	const [pinModalVisible, setPinModalVisible] = useState<boolean>(false);
	const [isLoadingUploadAvatar, setIsLoadingUploadAvatar] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [enableValidation, setEnableValidation] = useState<Record<string, boolean>>({
		profile: false,
		email: false,
		pin: false,
		photo: false
	});

	const isDisableFormProfile = useMemo(() => {
		return !!patientProfile?.data?.no_mr;
	}, [patientProfile?.data?.no_mr]);

	const lastVisitedHospital = useMemo(() => {
		if (!visitHospitalHistory?.data) return;
		return getLastVisitedHospitalHelper(visitHospitalHistory?.data);
	}, [visitHospitalHistory?.data]);

	const formikProfile: FormikProps<UpdateProfileType> = useFormik<UpdateProfileType>({
		validateOnBlur: enableValidation.profile,
		validateOnChange: enableValidation.profile,
		validationSchema: UpdateProfileSchema,
		initialValues: {
			name: patientProfile?.data?.name ?? '',
			birthdate: patientProfile?.data?.birthdate ? dayjs(patientProfile?.data?.birthdate).format('YYYY-MM-DD') : '',
			gender: patientProfile?.data?.gender ?? '',
			phone: patientProfile?.data?.phone ?? ''
		},
		enableReinitialize: true,
		onSubmit: async (formProfile: UpdateProfileType) => {
			try {
				await updateProfile(formProfile);
				setShowModalSuccess(true);
				getProfileMutation();
			} catch (error: any) {
				setError(error?.message ?? '');
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
			} catch (error: any) {
				setError(error?.message ?? '');
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

	const formikPhoto: FormikProps<UploadPhotoTypeState> = useFormik<UploadPhotoTypeState>({
		validateOnBlur: enableValidation.photo,
		validateOnChange: enableValidation.photo,
		initialValues: { photo_file: null },
		validationSchema: UploadPhotoSchema,
		onSubmit: async (formUpload: UploadPhotoTypeState) => {
			try {
				if (formUpload.photo_file) {
					setIsLoadingUploadAvatar(true);

					const formImg = new FormData();
					formImg.append('upload', formUpload.photo_file ?? '');
					const responseData = await uploadPhotoPatient({ payload: formUpload.photo_file });
					await updateAvatar({ img_url: responseData?.data });
					await getProfile(true);
					getProfileMutation();
				}
			} catch (error: any) {
				setError(error?.message ?? '');
			} finally {
				setIsLoadingUploadAvatar(false);
				setClickUpdatePhoto(false);
				setEnableValidation(prevToggle => ({ ...prevToggle, photo: false }));
			}
		},
	});

	// const activeEmail = localStorage.getEmail(); // Notes: pending

	// TODO: PENDING FEATURE
	// const handleSwitchAccount = (id: number) => async () => {
	// 	const selectedAccount: string = switchAccountUsers[id];
	// 	await localStorage.setEmail(selectedAccount?.split(':')[0]);
	// 	await localStorage.setTokenUser(selectedAccount?.split(':')[1]);
	// 	setTimeout(() => setSwitchAccountPickerShow(false), 500);
	// 	window.location.reload();
	// };

	// TODO: PENDING FEATURE
	// useEffect(() => {
	// createListOfHistoryUsers();
	// }, []);

	// TODO: bagaimana cara yg baik jika pakai useSWR?
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

	// TODO: PENDING FEATURE
	// const createListOfHistoryUsers = () => {
	// 	let tempSwitchAccountUsers: Array<any> = localStorage.getUserLoginHistory()?.split(',') ?? [];
	// 	tempSwitchAccountUsers = tempSwitchAccountUsers.filter(e => e !== '');
	// 	tempSwitchAccountUsers = [...tempSwitchAccountUsers, '+ Add Another Account'];
	// 	setSwitchAccountUsers(tempSwitchAccountUsers);
	// };

	const clickUpdateProfile = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setEnableValidation(prevToggle => ({ ...prevToggle, profile: true }));
		setError('');
		formikProfile.handleSubmit();
	};

	const userClickUpdateEmail = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setEnableValidation(prevToggle => ({ ...prevToggle, email: true }));
		setError('');
		formikEmail.handleSubmit();
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

	const onHandleTempProfileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const selectedFile: File | null = event.target.files && event.target.files.length
				? event.target.files[0]
				: null;

			if (selectedFile) {
				const isFileValid = ['image/jpg', 'image/jpeg', 'image/png']?.includes(selectedFile?.type ?? '');

				if (isFileValid) {
					const imageBase64: string | ArrayBuffer | null = await getBase64(selectedFile);
					if (imageBase64 && typeof imageBase64 === 'string') setTempImageSrc(imageBase64);

					formikPhoto.setFieldValue('photo_file', selectedFile);
				}
			} else {
				formikPhoto.setFieldError('photo_file', 'fileNotValid');
			}
		} catch (error) {
			formikPhoto.setFieldError('photo_file', 'fileNotValid');
		}
	};

	// Notes: sepertinya tidak digunakan. tapi untuk jaga-jaga
	// const parsePhoneNumber = () => {
	// 	if (patientProfile?.data?.phone) {
	// 		const phone: string = patientProfile?.data?.phone;
	// 		return phone.replaceAll('+62', '0');
	// 	}
	// };

	const renderErrorNotif = () => {
		if (error) {
			return (
				<div className='mt-[20px]'>
					<NotificationPanel
						showIconLeft={ false }
						showIconRight={ false }
						mode={ 'error' }
						visible={ !!error }
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
			);
		}

		return null;
	};

	const renderCardUser = () => {
		if (isDisableFormProfile) {
			return (
				<div className='mt-[30px]'>
					<CardUserMR patientProfile={ patientProfile } lastVisitedHospital={ lastVisitedHospital } />
				</div>
			);
		}

		return (
			<div className='mt-[30px] lg:px-[60px]'>
				<MedicalRecordReminder isFloating={ false } />
			</div>
		);
	};

	const getInputErrorMessage = (key?: string, label?: string) => {
		return getValidationTranslation(tValidation, key, { label });
	};

	const onClickDeletePhoto = async () => {
		try {
			setEnableValidation(prevToggle => ({ ...prevToggle, photo: false }));

			if (tempImageSrc && patientProfile?.data?.img_url) {
				setIsLoadingUploadAvatar(true);

				await updateAvatar({ img_url: '' });

				await getProfile(true);
				await getProfileMutation();

				formikPhoto.resetForm();
				setTempImageSrc('');
			} else if (tempImageSrc && !patientProfile?.data?.img_url) {
				formikPhoto.resetForm();
				setTempImageSrc('');
			}
		} catch (error: any) {
			setError(error?.message ?? '');
		} finally {
			setIsLoadingUploadAvatar(false);
		}
	};

	return (
		<div>
			<PanelH2>
				<Breadcrumbs datas={ breadcrumbsPath } />
				<ProfilePageStyle className='mt-[25px] sm:mt-[50px]'>
					<div className='flex'>
						<div>
							<Text
								fontWeight='900'
								fontSize='24px'
								lineHeight='29px'
								color={ colors.grey.darker }
								text={ t('heading') }
							/>
						</div>
						{ /* Notes: Login As dipending */ }
						{ /* <div className='relative inline-block max-lg:mt-4 max-lg:justify-end'>
							<Button
								theme='outline'
								hoverTheme='primary'
								className='px-[25px] py-2.5 !w-auto max-sm:text-sm'
								onClick={ () => setSwitchAccountPickerShow(!switchAccountPickerShow) }
							>
								<div className='flex items-center gap-3'>
									{ loginAsLabel }<FeatherIcons.ChevronDown size={ 22 } />
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
											<FeatherIcons.Check className={ `check-icon ${ data.split(':')[0] === activeEmail ? '' : 'hidden' }` } size={ 20 } />
										</div>
									))
								}
							</Picker>
						</div> */ }
					</div>

					{ renderCardUser() }

					<div className='flex mt-5 sm:mt-12 mb-[200px]'>
						<SubMenuPage menuList={ [t('profileLabel'), t('securitySettingLabel')] }>
							<div className='flex flex-col gap-[10px]'>
								<div className='flex max-md:mb-4 max-md:flex-col md:items-center md:justify-between md:w-full'>
									<div className='flex flex-row gap-x-4 items-center w-full'>
										{ (tempImageSrc || patientProfile?.data?.img_url)
											? (
												<div className='w-[82px] md:w-[100px] h-[82px] md:h-[100px] rounded-full relative overflow-hidden flex-shrink-0'>
													<Image
														src={ tempImageSrc ? tempImageSrc : (patientProfile?.data?.img_url ?? '') }
														alt=''
														fill
														sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
														className='w-full h-full object-cover'
													/>
												</div>
											)
											: <icons.EmptyProfile className='w-[82px] md:w-[100px] h-[82px] md:h-[100px]' />
										}
										{
											clickUpdatePhoto ?
												<div className='flex flex-col gap-y-2'>
													<input
														type='file'
														ref={ uploadFileRef }
														onChange={ onHandleTempProfileImage }
														// onChange={ () => setTempImage(uploadFileRef.current?.files?.[0] ? uploadFileRef.current?.files[0] : null) }
														className='hidden'
														accept='image/*'
													/>
													<Text
														fontSize='16px'
														lineHeight='24px'
														fontType='h4'
														fontWeight='400'
														color={ colors.paradiso.default }
														subClassName='max-sm:text-sm cursor-pointer'
														onClick={ () => uploadFileRef.current?.click() }
													>
														{ t('choosePhotoLabel') }
													</Text>
													<Text
														fontSize='14px'
														lineHeight='24px'
														fontType='h4'
														fontWeight='400'
														color={ colors.grey.default }
														subClassName='max-sm:text-xs'
													>
														{ t('formatPhotoLabel') }
													</Text>
												</div> :
												<Button
													theme='outline'
													$hoverTheme='primary'
													themeColor='rgba(173, 181, 189, 1)'
													className='px-[15px] sm:px-5 py-2.5 !w-auto text-sm lg:text-base text-[#2A2536]'
													label={ t('updatePhotoLabel') }
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
														label={ t('deletePhotoLabel') }
														onClick={ onClickDeletePhoto }
														disabled={ isLoadingUploadAvatar }
													/>
												</div>
												<div>
													<Button
														theme='primary'
														className='px-5 sm:px-4 py-2.5 text-sm lg:text-base sm:whitespace-nowrap'
														$hoverTheme='primary'
														label={ t('uploadPhotoLabel') }
														onClick={ () => {
															setEnableValidation(prevToggle => ({ ...prevToggle, photo: true }));
															formikPhoto.handleSubmit();
														} }
														disabled={ isLoadingUploadAvatar }
													/>
												</div>
											</div>
											: null
									}

								</div>
								{ !!formikPhoto.errors.photo_file && (
									<Text
										fontSize='12px'
										fontWeight='400'
										color={ colors.red.default }
									>
										{ getInputErrorMessage(formikPhoto.errors.photo_file, t('profileDetail.patientPhotoProfile')) }
									</Text>
								) }
								{ !showModalNewEmail
									&& !pinModalVisible
									&& renderErrorNotif() }
								<Form onSubmit={ clickUpdateProfile }>
									<HorizontalInputWrapper
										label={ t('profileDetail.patientEmail') }
										labelInfo={ !isDisableFormProfile ? t('profileDetail.patientPhoneNumberLabelInfo') : undefined }
										{ ...isDisableFormProfile
											? {
												onEditClick: () => {
													setPinModalVisible(true);
													setError('');
												}
											} : {} }
										inputProps={ {
											type: 'email',
											value: patientProfile?.data?.email ?? '',
											placeholder: t('profileDetail.patientEmailPlaceholder'),
											disabled: true,
										} }
									/>
									<Divider />
									<div className='mb-[25px] flex max-sm:flex-col sm:items-baseline sm:gap-4'>
										<Text
											fontSize='20px'
											fontWeight='900'
											color={ colors.grey.dark }
											text={ t('medicalRecordLabel') }
										/>

										{
											!isDisableFormProfile &&
											<Text
												fontSize='16px'
												fontWeight='400'
												fontStyle='italic'
												color={ colors.red.default }
												text={ t('medicalRecordEmptyInfo') }
											/>
										}
									</div>
									<HorizontalInputWrapper
										label={ t('profileDetail.patientNameLabel') }
										inputProps={ {
											name: 'name',
											type: 'text',
											value: formikProfile.values.name,
											onChange: formikProfile.handleChange,
											placeholder: t('profileDetail.patientNamePlaceholder'),
											errorMessage: getInputErrorMessage(formikProfile.errors.name, t('profileDetail.patientNameLabel')),
											isError: !!formikProfile.errors.name,
											disabled: isDisableFormProfile
										} }
									/>
									<HorizontalInputWrapper
										label={ t('profileDetail.patientGenderLabel') }
										inputType='dropdown'
										inputProps={ {
											name: 'gender',
											value: formikProfile.values.gender,
											onChange: formikProfile.handleChange,
											placeholder: t('profileDetail.patientGenderPlaceholder'),
											disabled: isDisableFormProfile,
											errorMessage: getInputErrorMessage(formikProfile.errors.gender, t('profileDetail.patientGenderLabel')),
											isError: !!formikProfile.errors.gender,
											// className: 'capitalize'
										} }
									/>
									{
										isDisableFormProfile &&
										<HorizontalInputWrapper
											label={ t('profileDetail.patientMedicalNumber') }
											inputProps={ {
												placeholder: t('profileDetail.patientMedicalNumberPlaceholder'),
												disabled: true,
												value: patientProfile?.data?.no_mr
											} }
										/>
									}
									<HorizontalInputWrapper
										label={ t('profileDetail.patientBirthDateLabel') }
										inputType='date'
										inputProps={ {
											id: 'birthdate',
											name: 'birthdate',
											value: formikProfile.values.birthdate,
											onChangeValue: onChangeValueProfile,
											placeholder: t('profileDetail.patientBirthDatePlaceholder'),
											disabled: isDisableFormProfile,
											errorMessage: getInputErrorMessage(formikProfile.errors.birthdate, t('profileDetail.patientBirthDateLabel')),
											isError: !!formikProfile.errors.birthdate,
										} }
									/>
									<HorizontalInputWrapper
										label={ t('profileDetail.patientPhoneNumber') }
										labelInfo={ isDisableFormProfile ? t('profileDetail.patientPhoneNumberLabelInfo') : undefined }
										inputProps={ {
											name: 'phone',
											value: formikProfile.values.phone,
											onChange: formikProfile.handleChange,
											placeholder: t('profileDetail.patientPhoneNumberPlaceholder'),
											disabled: isDisableFormProfile,
											errorMessage: getInputErrorMessage(formikProfile.errors.phone, t('profileDetail.patientPhoneNumber')),
											isError: !!formikProfile.errors.phone,
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
													$hoverTheme='primary'
													label={ t('securitySetting.cancelBtnLabel') }
													onClick={ () => formikProfile.resetForm() }
												/>
											</div>
											<div>
												<Button
													type='submit'
													theme='primary'
													$hoverTheme='outline'
													label={ t('securitySetting.saveBtnLabel') }
													disabled={ loadingUpdateProfile || loadingGetProfile }
												/>
											</div>
										</div>
									}
								</Form>
							</div>
							<div className='flex flex-col gap-[10px]'>
								<HorizontalInputWrapper
									label={ t('securitySetting.passwordLabel') }
									value='123456789010'
									onEditClick={ () => navigate.push('/update-password') }
									inputProps={ {
										placeholder: t('securitySetting.passwordLabel'),
										disabled: true,
										type: 'password',
									} }
								/>
								<HorizontalInputWrapper
									label={ t('securitySetting.pinLabel') }
									value='123456'
									onEditClick={ () => navigate.push('/pin-reset') }
									inputProps={ {
										placeholder: t('securitySetting.pinLabel'),
										disabled: true,
										type: 'password',
									} }
								/>
							</div>
						</SubMenuPage>
					</div>
				</ProfilePageStyle >
				<Modal visible={ pinModalVisible } onClose={ () => { setPinModalVisible(false); setError(''); } }>
					<div className='flex flex-col items-center gap-4'>
						<Form
							onSubmit={ e => {
								e.preventDefault();
								setEnableValidation(prevToggle => ({ ...prevToggle, pin: true }));
								setError('');
								formikPin.handleSubmit();
							} }>
							<Text text={ tModalPin('header') } fontWeight='900' fontSize='28px' lineHeight='48px' />
							<Text text={ tModalPin('subHeader') } fontWeight='400' fontSize='16px' lineHeight='normal' color={ colors.grey.default } />
							{ renderErrorNotif() }
							<div className='mt-12 mb-10'>
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
									label={ tModalPin('pinLabel') }
									errorMessage={ getInputErrorMessage(formikPin.errors.pin, tModalPin('pinLabel')) }
									isError={ !!formikPin.errors.pin }
								/>
							</div>
							<Button type='submit' label={ tModalPin('submitBtnLabel') } />
						</Form>

					</div>
				</Modal>
				<Modal visible={ showModalNewEmail } onClose={ () => { setShowModalNewEmail(false); setError(''); } }>
					<div>
						{ renderErrorNotif() }

						<Form onSubmit={ userClickUpdateEmail }>
							<HorizontalInputWrapper
								label={ t('profileDetail.patientOldEmail') }
								inputProps={ {
									value: patientProfile?.data?.email ?? '',
									placeholder: t('profileDetail.patientOldEmailPlaceHolder'),
									disabled: true,
									type: 'text',
								} }
							/>
							<HorizontalInputWrapper
								label={ t('profileDetail.patientNewEmail') }
								inputProps={ {
									id: 'email',
									name: 'email',
									value: formikEmail.values.email,
									onChange: onChangeInputEmail,
									placeholder: t('profileDetail.patientNewEmailPlaceHolder'),
									disabled: false,
									type: 'email',
									errorMessage: getInputErrorMessage(formikEmail.errors.email, t('profileDetail.patientNewEmail')),
									isError: !!formikEmail.errors.email,
								} }
							/>
							<div className='flex justify-end align-center gap-5 mt-[50px]'>
								<div>
									<Button type='submit' theme='primary' $hoverTheme='outline' label={ t('securitySetting.saveBtnLabel') } />
								</div>
							</div>
						</Form>
					</div>
				</Modal>
				<Modal visible={ showModalSuccess } onClose={ () => { setShowModalSuccess(false); setError(''); } }>
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
				<Modal visible={ showModalSuccessUpdateEmail } onClose={ () => { setShowModalSuccessUpdateEmail(false); setError(''); } }>
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

			</PanelH2 >
		</div >
	);
};