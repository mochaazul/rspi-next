import { useEffect, useRef, useState } from 'react';
import * as Icons from 'react-feather';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

import {
	Breadcrumbs,
	Text,
	Layout,
	Button,
	SubMenuPage,
	Picker,
	Form,
	Modal,
	NotificationPanel,
	MedicalRecordReminder
} from '@/components';
import { Images, Languages, colors, regExp } from '@/constant';
import {
	localStorage, createFieldConfig, requiredRule, minLengthRule, maxLengthRule
} from '@/helpers';
import {
	BreadcrumbsProps, CheckPinType, UpdateAvatarType, UpdateEmailType, UpdateProfileType, UserState
} from '@/interface';
import { getAge } from '@/helpers/getAge';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import { PatientState } from '@/interface/PatientProfile';
import { getLastVisitHospital, getProfileDetail, uploadPhotoProfile } from '@/stores/PatientProfile';
import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import { getAppointmentList, updateEmail, updateProfile } from '@/stores/actions';
import { checkPin, removeUser as removeUserData, updateUserInfo } from '@/stores/User';
import { splitDate } from '@/helpers/datetime';
import PinModal from '@/components/PinModal';
import { PinModalContainer } from '@/components/PinModal/style';

import ProfilePageStyle, { Divider } from './style';
import HorizontalInputWrapper from './HorizontalInputWrapper';
import useProfilePage from './useProfilePage';

type DisabledInputs = {
	email: boolean,
	password: boolean,
	pin: boolean;
};

const { heading, loginAsLabel, profileDetail, securitySetting, subHeading, updatePhotoLabel, uploadPhotoLabel, deletePhotoLabel, choosePhotoLabel, formatPhotoLabel, profileLabel, securitySettingLabel, medicalRecordLabel, medicalRecordEmptyInfo } = Languages.page.profilePage;
const { header, subHeader, submitBtnLabel } = Languages.modalDialog.pin;
const ProfilePage = (props: BreadcrumbsProps) => {
	const uploadFileRef = useRef<HTMLInputElement>(null);

	const userSelector = useTypedSelector<UserState>('user');
	const { patientProfile, lastVisitedHospital } = useTypedSelector<PatientState>('patient');

	const { profileFields } = useProfilePage();
	const navigate = useRouter();

	const {
		setFieldsValue,
		registeredValue,
		onSubmit
	} = Form.useForm({ fields: profileFields });

	const getProfile = useAppDispatch(getProfileDetail);
	const getLastVisitedHospital = useAppDispatch(getLastVisitHospital);
	const uploadPhotoPatient = useAppAsyncDispatch(uploadPhotoProfile);
	const clikUpdateAvatar = useAppDispatch<UpdateAvatarType>(updateProfile);
	const clikUpdateProfile = useAppDispatch<UpdateProfileType>(updateProfile);
	const clikUpdateEmail = useAppDispatch<UpdateEmailType>(updateEmail);
	const pinDispatch = useAppDispatch(checkPin);
	const updateUserDetailState = useAppDispatch(updateUserInfo);

	const [switchAccountPickerShow, setSwitchAccountPickerShow] = useState<boolean>(false);
	const [tempImage, setTempImage] = useState<Blob | null>(null);
	const [clickUpdatePhoto, setClickUpdatePhoto] = useState<boolean>(false);
	const [switchAccountUsers, setSwitchAccountUsers] = useState<any>([]);
	const [isDisableFormProfile, setIsDisableFormProfile] = useState<boolean>(false);
	const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
	const [showModalSuccessUpdateEmail, setShowModalSuccessUpdateEmail] = useState<boolean>(false);
	const [showModalNewEmail, setShowModalNewEmail] = useState<boolean>(false);
	const [pinModalVisible, setPinModalVisible] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const removeUser = useAppDispatch(removeUserData);

	const [disabledInputs, setDisabledInputs] = useState<DisabledInputs>({
		email: true,
		password: true,
		pin: true
	});

	const activeEmail = localStorage.getEmail();
	const editableInputProps = {
		iconPosition: 'right',
		featherIcon: 'Edit3',
		iconColor: colors.paradiso.default,
	};

	const handleSwitchAccount = (id: number) => async () => {
		const selectedAccount: string = switchAccountUsers[id];
		await localStorage.setEmail(selectedAccount?.split(':')[0]);
		await localStorage.setTokenUser(selectedAccount?.split(':')[1]);
		setTimeout(() => setSwitchAccountPickerShow(false), 500);
		window.location.reload();
	};

	const toggleInput = (key: keyof DisabledInputs) => {
		setDisabledInputs({
			...disabledInputs,
			[key]: !disabledInputs[key]
		});
	};

	useEffect(() => {
		createListOfHistoryUsers();
		getDataProfile();
		getLastVisitedHospital();
	}, []);

	useEffect(() => {
		setIsDisableFormProfile(patientProfile.no_mr !== '');
		setFieldsValue({
			pin: '*****',
			password: '*****',
			dob: splitDate(patientProfile?.birthdate),
			...patientProfile
		});
	}, [patientProfile]);

	const getDataProfile = async () => {
		const responseData = await getProfile();
		if (responseData.payload.stat_msg !== 'Success') {
			removeUserDatas();
		}
	};

	const removeUserDatas = () => {
		removeUser();
		navigate.replace('/login');
	};

	const createListOfHistoryUsers = () => {
		let tempSwitchAccountUsers: Array<any> = localStorage.getUserLoginHistory()?.split(',') ?? [];
		tempSwitchAccountUsers = tempSwitchAccountUsers.filter(e => e !== '');
		tempSwitchAccountUsers = [...tempSwitchAccountUsers, '+ Add Another Account'];
		setSwitchAccountUsers(tempSwitchAccountUsers);
	};

	const clickUploadPhotoPatient = async () => {
		const formImg = new FormData();
		formImg.append('upload', tempImage ?? '');
		const responseData = await uploadPhotoPatient({ payload: formImg });
		if (responseData.stat_msg === 'Success') {
			const urlImage = 'https://rebel-env.s3.us-west-2.amazonaws.com/rspi/dev/rspi-api/uploads/';
			await clikUpdateAvatar({
				payload: { image_url: urlImage + responseData.data }
			});
		}
	};

	const clickUpdateProfile = async (evt: React.FormEvent<HTMLFormElement>) => {
		const { name, dob, gender, phone, email } = onSubmit(evt);
		const payload = {
			name: name.value,
			birthdate: dob.value,
			gender: gender.value,
			phone: phone.value
		};
		await clikUpdateProfile({
			payload
		});
		updateUserDetailState({
			...payload
		});
		setShowModalSuccess(true);
	};

	const userClickUpdateEmail = async (evt: React.FormEvent<HTMLFormElement>) => {
		const { new_email } = onSubmit(evt);
		await clikUpdateEmail({
			payload: {
				email: new_email.value,
			}
		});
		setShowModalSuccessUpdateEmail(true);
	};

	const parsePhoneNumber = () => {
		if (patientProfile.phone) {
			const phone: string = patientProfile.phone;
			return phone.replaceAll('+62', '0');
		}
	};

	const pinField = {
		pin: {
			...createFieldConfig({
				name: 'pin',
				type: 'password'
			}),
			validationRules: [
				requiredRule('pin'),
				minLengthRule('pin', 6),
				maxLengthRule('pin', 6),
			],
			label: 'PIN'
		}
	};

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
								text={ heading }
							/>
							<Text
								fontWeight='400'
								fontSize='16px'
								lineHeight='19px'
								color={ colors.grey.dark }
								className='mt-3'
								text={ subHeading }
							/>
						</div>
						<div className='relative inline-block max-lg:mt-4 max-lg:justify-end'>
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
						</div>
					</div>

					{
						isDisableFormProfile ?
							<div className='user-panel card-shadow p-4 lg:p-5'>
								<div className='flex justify-between lg:justify-center lg:grid lg:grid-cols-4 lg:gap-4 lg:items-center'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-full mr-4 lg:mr-[18px] relative overflow-hidden cursor-pointer'>
											<img
												src={ tempImage ? URL.createObjectURL(tempImage) : Images.CustomerReviewCustAvatar }
												alt={ tempImage ? 'Temp Image' : Images.CustomerReviewCustAvatar }
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
												text={ patientProfile.name }
											/>
											<Text
												fontWeight='400'
												fontSize='14px'
												lineHeight='17px'
												className='capitalize'
												text={ patientProfile.birthdate && patientProfile.gender && `${ getAge(splitDate(patientProfile?.birthdate)) }, ${ patientProfile.gender }` }
											/>
										</div>
									</div>
									<div className='flex flex-col gap-1 lg:gap-y-2.5'>
										<Text
											fontWeight='400'
											fontSize='14px'
											lineHeight='17px'
											subClassName='max-lg:text-center'
											text={ profileDetail.patientIdLabel }
										/>
										<Text
											fontWeight='700'
											fontSize='16px'
											lineHeight='19px'
											subClassName='max-lg:text-center'
											text={ userSelector.user.patient_code }
										/>
									</div>
									<div className='max-lg:hidden flex flex-col gap-y-2.5'>
										<Text
											fontWeight='400'
											fontSize='14px'
											lineHeight='17px'
											text={ profileDetail.lastVisitedHospitalLabel }
										/>
										<Text
											fontWeight='700'
											fontSize='16px'
											lineHeight='19px'
											text={ lastVisitedHospital.hospital_desc ?? '-' }
										/>
									</div>
									<div className='max-lg:hidden flex flex-col gap-y-2.5'>
										<Text
											fontWeight='400'
											fontSize='14px'
											lineHeight='17px'
											text={ profileDetail.lastVisitedDateLabel }
										/>
										<Text
											fontWeight='700'
											fontSize='16px'
											lineHeight='19px'
											text={ dayjs(lastVisitedHospital.adm_date).format('DD MMM YYYY') ?? '-' }
										/>
									</div>
								</div>
								<div className='hidden pt-6 mt-6 border-t border-[#F0F2F9] max-lg:flex justify-between'>
									<div className='flex flex-col gap-1'>
										<Text
											fontWeight='400'
											fontSize='14px'
											lineHeight='17px'
											text={ profileDetail.lastVisitedHospitalLabel }
											textAlign='center'
										/>
										<Text
											fontWeight='700'
											fontSize='16px'
											lineHeight='19px'
											text={ lastVisitedHospital.hospital_desc ?? '-' }
											textAlign='center'
										/>
									</div>
									<div className='flex flex-col gap-1'>
										<Text
											fontWeight='400'
											fontSize='14px'
											lineHeight='17px'
											text={ profileDetail.lastVisitedDateLabel }
											textAlign='center'
										/>
										<Text
											fontWeight='700'
											fontSize='16px'
											lineHeight='19px'
											text={ dayjs(lastVisitedHospital.adm_date).format('DD MMM YYYY') ?? '-' }
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
						<SubMenuPage menuList={ [profileLabel, securitySettingLabel] }>
							<div className='flex flex-col gap-[10px]'>
								<div className='flex max-md:mb-4 max-md:flex-col md:items-center md:justify-between md:w-full'>
									<div className='flex flex-row gap-x-4 items-center w-full'>
										<div className='w-[82px] md:w-[100px] h-[82px] md:h-[100px] rounded-full overflow-hidden flex-shrink-0'>
											<img
												src={ tempImage ? URL.createObjectURL(tempImage) : Images.CustomerReviewCustAvatar }
												alt={ tempImage ? 'Temp Image' : Images.CustomerReviewCustAvatar }
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
														{ choosePhotoLabel }
													</Text>
													<Text
														fontSize='14px'
														lineHeight='24px'
														fontType='h4'
														fontWeight='400'
														color={ colors.grey.default }
														subClassName='max-sm:text-xs'
													>
														{ formatPhotoLabel }
													</Text>
												</div> :
												<Button
													theme='outline'
													hoverTheme='primary'
													themeColor='rgba(173, 181, 189, 1)'
													className='px-[15px] sm:px-5 py-2.5 !w-auto text-sm lg:text-base text-[#2A2536]'
													label={ updatePhotoLabel }
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
														label={ deletePhotoLabel }
													/>
												</div>
												<div>
													<Button
														theme='primary'
														className='px-5 sm:px-4 py-2.5 text-sm lg:text-base sm:whitespace-nowrap'
														hoverTheme='primary'
														label={ uploadPhotoLabel }
														onClick={ clickUploadPhotoPatient }
													/>
												</div>
											</div>
											: null
									}
								</div>
								<Form onSubmit={ clickUpdateProfile }>
									<HorizontalInputWrapper
										label={ profileDetail.patientEmail }
										labelInfo={ !isDisableFormProfile ? profileDetail.patientPhoneNumberLabelInfo : undefined }
										inputProps={ {
											...registeredValue('email'),
											...editableInputProps,
											placeholder: profileDetail.patientEmailPlaceholder,
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
											text={ medicalRecordLabel }
										/>

										{
											!isDisableFormProfile &&
											<Text
												fontSize='16px'
												fontWeight='400'
												fontStyle='italic'
												color={ colors.red.default }
												text={ medicalRecordEmptyInfo }
											/>
										}
									</div>
									<HorizontalInputWrapper
										label={ profileDetail.patientNameLabel }
										inputProps={ { ...registeredValue('name'), placeholder: profileDetail.patientNamePlaceholder, disabled: isDisableFormProfile } }
									/>
									<HorizontalInputWrapper
										label={ profileDetail.patientGenderLabel }
										inputType='dropdown'
										inputProps={ { ...registeredValue('gender'), placeholder: profileDetail.patientGenderPlaceholder, disabled: isDisableFormProfile, className: 'capitalize' } }
									/>
									{
										isDisableFormProfile &&
										<HorizontalInputWrapper
											label={ profileDetail.patientMedicalNumber }
											inputProps={ { placeholder: profileDetail.patientMedicalNumberPlaceholder, disabled: true, value: patientProfile.no_mr } }
										/>
									}
									<HorizontalInputWrapper
										label={ profileDetail.patientBirthDateLabel }
										inputType='date'
										inputProps={ { ...registeredValue('dob', true), placeholder: profileDetail.patientBirthDatePlaceholder, disabled: isDisableFormProfile } }
									/>
									<HorizontalInputWrapper
										label={ profileDetail.patientPhoneNumber }
										labelInfo={ isDisableFormProfile ? profileDetail.patientPhoneNumberLabelInfo : undefined }
										inputProps={ {
											...registeredValue('phone'),
											placeholder: profileDetail.patientPhoneNumberPlaceholder,
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
													label={ securitySetting.cancelBtnLabel }
												/>
											</div>
											<div>
												<Button
													type='submit'
													theme='primary'
													hoverTheme='outline'
													label={ securitySetting.saveBtnLabel }
												/>
											</div>
										</div>
									}
								</Form>
							</div>
							<div className='flex flex-col gap-[10px]'>
								<HorizontalInputWrapper
									label={ securitySetting.passwordLabel }
									value='123456789010'
									inputProps={ {
										...editableInputProps,
										placeholder: securitySetting.passwordLabel,
										disabled: true,
										type: 'password',
										onIconClick: () => navigate.push('/reset-password')
									} }
								/>
								<HorizontalInputWrapper
									label={ securitySetting.pinLabel }
									value='123456'
									inputProps={ {
										...editableInputProps,
										placeholder: securitySetting.pinLabel,
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
					<PinModalContainer>
						<Form
							onSubmit={ async e => {
								const { pin } = onSubmit(e);
								const responseData = await pinDispatch({
									payload: {
										pin: pin.value,
									}
								});
								if (responseData.payload.stat_msg === 'Success') {
									setPinModalVisible(false);
									setShowModalNewEmail(true);
								} else {
									setError(responseData.payload.stat_msg);
								}
							} }>
							<Text text={ header } fontWeight='900' fontSize='28px' lineHeight='48px' />
							<Text text={ subHeader } fontWeight='400' fontSize='16px' lineHeight='normal' color={ colors.grey.default } />
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
									{ ...registeredValue('pin', true) }
								/>
							</div>
							<Button type='submit' label={ submitBtnLabel } />
						</Form>

					</PinModalContainer>
				</Modal>
				<Modal visible={ showModalNewEmail } onClose={ () => setShowModalNewEmail(false) }>
					<div>
						<Form onSubmit={ userClickUpdateEmail }>
							<HorizontalInputWrapper
								label={ profileDetail.patientOldEmail }
								inputProps={ {
									placeholder: profileDetail.patientOldEmailPlaceHolder,
									disabled: false,
									type: 'text',
								} }
							/>
							<HorizontalInputWrapper
								label={ profileDetail.patientNewEmail }
								inputProps={ {
									...registeredValue('new_email'),
									placeholder: profileDetail.patientNewEmailPlaceHolder,
									disabled: false,
									type: 'text'
								} }
							/>
							<div className='flex justify-end align-center gap-5 mt-[50px]'>
								<div>
									<Button type='submit' theme='primary' hoverTheme='outline' label={ securitySetting.saveBtnLabel } />
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