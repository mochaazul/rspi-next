import Modal from '@/components/Modal';
import { ModalHeader, ProfileModalContainer, WarningContainer } from './style';
import Text from '@/components/ui/Text';
import { colors, icons } from '@/constant';
import { FormRow } from '@/app/[locale]/(main)/book-appointment/style';
import Form from '@/components/Form';
import { createFieldConfig } from '@/helpers';
import Button from '@/components/Button';
// import { useAppDispatch, useTypedSelector } from '@/hooks';
import { addFamilyProfile, updateProfile } from '@/stores/actions';
import { FamilyProfile, FamilyProfilePayload, UpdateProfileType, UserDataDetail, UserState } from '@/interface';
// import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import NotificationPanel from '@/components/NotificationPanel';
import { useEffect, useState } from 'react';
import { userDetail as userDetailAction } from '@/stores/actions';
import Image from 'next/image';

const addProfileFormFields = {
	name: {
		...createFieldConfig({
			name: 'name',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Nama'
	},
	gender: {
		...createFieldConfig({
			name: 'gender',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Gender'
	},
	dob: {
		...createFieldConfig({
			name: 'dob',
			type: 'date'
		}),
		validationRules: [],
		placeholder: 'Date of Birth'
	},
	phone: {
		...createFieldConfig({
			name: 'phone',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'Phone number / Whatsapp'
	},
	email: {
		...createFieldConfig({
			name: 'email',
			type: 'text'
		}),
		validationRules: [],
		placeholder: 'E-mail'
	},
};

const genderMenuItems = [
	{ key: 'M', value: 'M', label: 'Male' },
	{ key: 'F', value: 'F', label: 'Female' }
];
type Props = {
	onClose: (profile: ProfilePayload, isMain?: boolean) => void;
	visible: boolean;
	isMain?: boolean,
	selfProfile?: FamilyProfile;
	type: string;
};

export type ProfilePayload = {
	dob: string;
	email: string;
	gender: string;
	name: string;
	phone: string;
};

const AddProfileModal = ({ onClose, visible, isMain, selfProfile, type }: Props) => {
	const { registeredValue, onSubmit, getCurrentForm, setFieldsValue } = Form.useForm({ fields: addProfileFormFields });

	// TODO: migrate
	// const { userDetail } = useTypedSelector<UserState>('user');
	// const clikUpdateProfile = useAppDispatch<UpdateProfileType>(updateProfile);
	// const getUserDetail = useAppAsyncDispatch<UserDataDetail>(userDetailAction);

	// const addFamilyProfileDispatch = useAppAsyncDispatch<FamilyProfilePayload>(addFamilyProfile);
	// End migrate

	const [error, setError] = useState<string>('');
	const [disabledEmail, setDisabledEmail] = useState<boolean>(false);
	const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			const { dob, email, gender, name, phone } = onSubmit(event);

			if (type == 'other') {
				if (!selfProfile) {
					onClose({
						dob: dob.value,
						email: email.value,
						gender: gender.value,
						name: name.value,
						phone: cleanUpMask(phone.value)
					}, true);
					return;
				}
				// TODO: migrate
				// const res = await addFamilyProfileDispatch({
				// 	payload: {
				// 		birthdate: dob.value,
				// 		parent_email: userDetail.email ?? '',
				// 		email: email.value,
				// 		name: name.value,
				// 		phone: cleanUpMask(phone.value),
				// 		gender: gender.value
				// 	}
				// });
				// End migrate
				setError('');
				onClose({
					dob: dob.value,
					email: email.value,
					gender: gender.value,
					name: name.value,
					phone: phone.value
				});
			} else {
				const payload = {
					name: name.value,
					birthdate: dob.value,
					gender: gender.value,
					phone: cleanUpMask(phone.value)
				};
				// TODO: migrate
				// const response = await clikUpdateProfile({
				// 	payload
				// });
				// if (response.payload.stat_msg === 'Success') {
				setDisabledEmail(false);
				// await getUserDetail();
				onClose({
					dob: dob.value,
					email: email.value,
					gender: gender.value,
					name: name.value,
					phone: phone.value
				});
				// TODO: migrate
				// }
				// setError(response.payload.stat_msg);
			}
			setFieldsValue({
				email: '',
				name: '',
				birthdate: '',
				gender: '',
				phone: ''
			});
		} catch (error: any) {
			setError(error.stat_msg);
		}
	};

	const cleanUpMask = (value: string) => {
		return value
			.replace('+62', '0')
			.replaceAll(' ', '')
			.replaceAll('-', '')
			.trim();
	};

	const mapError = () => {
		if (error && error.toLowerCase() === 'validation error') return 'Mohon isi semua data.';
		return error;
	};

	const closeHandler = () => {
		onClose({
			dob: '',
			email: '',
			gender: '',
			name: '',
			phone: ''
		});
	};

	useEffect(() => {
		if (type == 'self') {
			// TODO: migrate
			// setFieldsValue({
			// 	email: userDetail.email
			// });
			setDisabledEmail(true);
		}
	}, [type]);

	return <Modal
		visible={ visible }
		noPadding
		width='526px'
		onClose={ closeHandler }
		borderRadius='12px'
		overflow='none'
		containerClassName='m-[10px]'
	>
		<ProfileModalContainer>
			<ModalHeader>
				<Text
					subClassName='max-sm:text-[16px]'
					fontSize='24px'
					fontWeight='700'
					lineHeight='28px'
					text={ `Tambah Profil ${ selfProfile ? 'Orang Lain' : 'Utama' }` } />
				<div className='cursor-pointer' onClick={ closeHandler }>
					<Image src={ icons.Close } alt="" />
				</div>
			</ModalHeader>
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
					text={ mapError() }
					color={ colors.red.default }
				/>
			</NotificationPanel>
			<Form onSubmit={ onSubmitHandler } className='mt-[8px]'>
				<FormRow
					className='flex-col md:flex-row gap-[16px] md:gap-[24px]'
				>
					<Form.TextField
						labelClassName='font-normal'
						labelGap={ 8 }
						{ ...registeredValue('name') }
						label='Nama'
					/>
					<Form.DateField
						labelClassName='font-normal'
						labelGap={ 8 }
						{ ...registeredValue('dob', true) }
						dateFormat='DD MMMM YYYY'
						label='Tanggal Lahir'
					/>
				</FormRow>
				<FormRow className='flex-col md:flex-row gap-[16px] md:gap-[24px]'>
					<Form.TextField
						labelClassName='font-normal'
						labelGap={ 8 }
						{ ...registeredValue('phone') }
						mask={ '+62 999-9999-99999' }
						label='No Hp'
						isNumber
					/>
					<Form.TextField
						labelClassName='font-normal'
						labelGap={ 8 }
						{ ...registeredValue('email') }
						label='E-Mail'
						disabled={ disabledEmail }
					/>
				</FormRow>
				<FormRow className='flex-col md:flex-row gap-[16px] md:gap-[24px]'>
					<Form.Dropdown
						labelClassName='font-normal'
						labelGap={ 8 }
						menuItems={ genderMenuItems }
						{ ...registeredValue('gender') }
						label='Gender'
						className='w-[174px] block'
					/>
				</FormRow>
				<Button type='submit' label='Submit' className='mt-[32px]' />
			</Form>
		</ProfileModalContainer>
	</Modal>;
};

export default AddProfileModal;