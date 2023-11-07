import { useEffect, useRef, useState } from 'react';
import * as Icons from 'react-feather';
import moment from 'moment';
import dayjs from 'dayjs';

import {
	Breadcrumbs,
	Text,
	Layout,
	Button,
	SubMenuPage,
	Picker,
	Form
} from 'components';
import { Images, Languages, colors } from 'constant';
import { navigation, localStorage } from 'helpers';
import { BreadcrumbsProps, UpdateAvatarType, UserState } from 'interface';
import { getAge } from 'helpers/getAge';
import { useAppDispatch, useTypedSelector } from 'hooks';
import { PatientState } from 'interface/PatientProfile';
import { getLastVisitHospital, getProfileDetail, uploadPhotoProfile } from 'stores/PatientProfile';

import ProfilePageStyle from './style';
import HorizontalInputWrapper from './HorizontalInputWrapper';
import useProfilePage from './useProfilePage';
import { useAppAsyncDispatch } from 'hooks/useAppDispatch';
import { updateAvatar } from 'stores/actions';

type DisabledInputs = {
	email: boolean,
	password: boolean,
	pin: boolean;
};

const { heading, loginAsLabel, profileDetail, securitySetting, subHeading, updatePhotoLabel, uploadPhotoLabel, deletePhotoLabel, choosePhotoLabel, formatPhotoLabel } = Languages.page.profilePage;
const ProfilePage = (props: BreadcrumbsProps) => {
	const uploadFileRef = useRef<HTMLInputElement>(null);

	const userSelector = useTypedSelector<UserState>('user');
	const { patientProfile, lastVisitedHospital } = useTypedSelector<PatientState>('patient');

	const { profileFields } = useProfilePage();
	const { navigate } = navigation();

	const {
		setFieldsValue
	} = Form.useForm({ fields: profileFields });

	const getProfile = useAppDispatch(getProfileDetail);
	const getLastVisitedHospital = useAppDispatch(getLastVisitHospital);
	const uploadPhotoPatient = useAppAsyncDispatch(uploadPhotoProfile);
	const clikUpdateAvatar = useAppDispatch<UpdateAvatarType>(updateAvatar);

	const [switchAccountPickerShow, setSwitchAccountPickerShow] = useState<boolean>(false);
	const [activeAccountIndex, setActiveAccountIndex] = useState<number>(0);
	const [tempImage, setTempImage] = useState<Blob | null>(null);
	const [clickUpdatePhoto, setClickUpdatePhoto] = useState<boolean>(false);

	const [disabledInputs, setDisabledInputs] = useState<DisabledInputs>({
		email: true,
		password: true,
		pin: true
	});

	const SwitchAccountUsersExample = ['Adiningsih', 'Jane Cooper', 'Dian Gunawan'];

	const editableInputProps = {
		iconPosition: 'right',
		featherIcon: 'Edit3',
		iconColor: colors.paradiso.default,
	};

	const handleSwitchAccount = (id: number) => () => {
		setActiveAccountIndex(id);
		setTimeout(() => setSwitchAccountPickerShow(false), 500);
	};

	const toggleInput = (key: keyof DisabledInputs) => {
		setDisabledInputs({
			...disabledInputs,
			[key]: !disabledInputs[key]
		});
	};

	useEffect(() => {
		getProfile();
		getLastVisitedHospital();
	}, []);

	useEffect(() => {
		setFieldsValue({
			pin: '*****',
			password: '*****',
			...patientProfile
		});
	}, [patientProfile]);

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

	return (
		<Layout.PanelV1>
			<Layout.PanelH2>
				<Breadcrumbs datas={ props.breadcrumbsPath } />
				<ProfilePageStyle className='mt-[50px]'>
					<div className='flex justify-between'>
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
						<div className='relative'>
							<Button
								theme='outline'
								hoverTheme='primary'
								className='px-[25px] py-[10px]'
								onClick={ () => setSwitchAccountPickerShow(!switchAccountPickerShow) }
							>
								<div className='flex items-center gap-3'>
									{ loginAsLabel }<Icons.ChevronDown size={ 22 } />
								</div>
							</Button>
							<Picker show={ switchAccountPickerShow }>
								{
									SwitchAccountUsersExample.map((userName, index) => (
										<div
											key={ index }
											className={ `cursor-pointer border-gray block py-4 px-4 flex justify-between items-center ${ index < SwitchAccountUsersExample.length ? '' : 'border-b' } ${ activeAccountIndex === index ? 'active' : '' }` }
											onClick={ handleSwitchAccount(index) }
										>
											<Text
												fontSize='16px'
												fontWeight='700'
												lineHeight='19px'
												text={ userName }
											/>
											<Icons.Check className={ `check-icon ${ activeAccountIndex === index ? '' : 'hidden' }` } size={ 20 } />
										</div>
									))
								}
							</Picker>
						</div>
					</div>
					<div className='user-panel card-shadow'>
						<div className='flex justify-center items-center'>
							<div className='w-[60px] h-[60px] rounded-full mr-3 relative overflow-hidden cursor-pointer'>
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
							<div className='flex-1'>
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
									text={ patientProfile.birthdate && patientProfile.gender && `${ getAge(patientProfile.birthdate.split(' ')[0]) }, ${ patientProfile.gender }` }
								/>
							</div>
							<div className='flex-1'>
								<Text
									fontWeight='400'
									fontSize='14px'
									lineHeight='17px'
									text={ profileDetail.patientIdLabel }
								/>
								<Text
									fontWeight='700'
									fontSize='16px'
									lineHeight='19px'
									text={ userSelector.user.patient_code }
								/>
							</div>
							<div className='flex-1'>
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
							<div className='flex-1'>
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
					</div>
					<div className='flex mt-12 mb-[200px]'>
						<SubMenuPage menuList={ ['Profile', 'Security Setting'] }>
							<div className='flex flex-col gap-[10px]'>
								<div className='flex flex-row items-center justify-between'>
									<div className='flex flex-row gap-x-4 items-center w-full'>
										<div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
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
														subClassName='max-sm:text-[16px] max-sm:leading-[23px]'
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
														subClassName='max-sm:text-[16px] max-sm:leading-[23px]'
													>
														{ formatPhotoLabel }
													</Text>
												</div> :
												<Button theme='outline' hoverTheme='primary' className='w-[200px]' label={ updatePhotoLabel } onClick={ () => setClickUpdatePhoto(true) } />
										}
									</div>
									<div>
										{
											clickUpdatePhoto ?
												<div className='flex gap-5 justify-end align-center'>
													<div>
														<Button theme='primary' className='w-[200px]' hoverTheme='primary' label={ uploadPhotoLabel } onClick={ clickUploadPhotoPatient } />
													</div>
													<div>
														<Button theme='outline' className='w-[200px]' hoverTheme='outline' label={ deletePhotoLabel } />
													</div>
												</div>
												: null
										}

									</div>
								</div>
								<HorizontalInputWrapper
									label={ profileDetail.patientNameLabel }
									inputProps={ { placeholder: profileDetail.patientNamePlaceholder, disabled: true, value: patientProfile.name } }
								/>
								<HorizontalInputWrapper
									label={ profileDetail.patientGenderLabel }
									inputProps={ { placeholder: profileDetail.patientGenderPlaceholder, disabled: true, value: patientProfile.gender, className: 'capitalize' } }
								/>
								<HorizontalInputWrapper
									label={ profileDetail.patientMedicalNumber }
									inputProps={ { placeholder: profileDetail.patientMedicalNumberPlaceholder, disabled: true, value: patientProfile.no_mr } }
								/>
								<HorizontalInputWrapper
									label={ profileDetail.patientBirthDateLabel }
									inputProps={ { placeholder: profileDetail.patientBirthDatePlaceholder, disabled: true, value: moment(patientProfile?.birthdate?.split(' ')?.[0])?.format('DD MMMM YYYY') } }
								/>
								<HorizontalInputWrapper
									label={ profileDetail.patientPhoneNumber }
									inputProps={ { placeholder: profileDetail.patientPhoneNumberPlaceholder, disabled: true, value: patientProfile.phone || '-' } }
								/>
								<HorizontalInputWrapper
									label={ profileDetail.patientEmail }
									inputProps={ { placeholder: profileDetail.patientEmailPlaceholder, disabled: true, value: patientProfile.email } }
								/>

							</div>
							<div className='flex flex-col gap-[10px]'>
								<HorizontalInputWrapper
									label={ securitySetting.emailLabel }
									value={ patientProfile.email }
									inputProps={ {
										...editableInputProps,
										placeholder: securitySetting.emailLabel,
										disabled: true,
										type: 'text',
										onIconClick: () => navigate('/reset-password')
									} }
								/>
								<HorizontalInputWrapper
									label={ securitySetting.phoneNumberLabel }
									value={ patientProfile.phone }
									inputProps={ {
										placeholder: securitySetting.phoneNumberLabel,
										disabled: true,
										type: 'text',
									} }
								/>
								<HorizontalInputWrapper
									label={ securitySetting.passwordLabel }
									value='123456789010'
									inputProps={ {
										...editableInputProps,
										placeholder: securitySetting.passwordLabel,
										disabled: true,
										type: 'password',
										onIconClick: () => navigate('/reset-password')
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
										onIconClick: () => null
									} }
								/>
								<div className='flex justify-end align-center gap-5 mt-[50px]'>
									<div>
										<Button theme='outline' hoverTheme='primary' label={ securitySetting.cancelBtnLabel } />
									</div>
									<div>
										<Button theme='primary' hoverTheme='outline' label={ securitySetting.saveBtnLabel } />
									</div>
								</div>
							</div>

						</SubMenuPage>
					</div>
				</ProfilePageStyle>
			</Layout.PanelH2>
		</Layout.PanelV1>
	);
};

export default ProfilePage;