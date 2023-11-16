import { ModalHeader, ProfileModalContainer, WarningContainer } from './style';
import { colors, icons } from '@/constant';
// import { useAppDispatch, useTypedSelector } from '@/hooks';
import { UserDataDetail } from '@/interface';
// import { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import NotificationPanel from '@/components/NotificationPanel';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Form from '@/components/ui/Form';
import { createFieldConfig } from '@/helpers';
import Modal from '@/components/ui/Modal';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { FormRow } from '../style';
import { useFamilyProfileMutation } from '@/lib/api/client/profile';

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
	selfProfile?: UserDataDetail;
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

	const { data, trigger: createFamilyProfile, isMutating, error: createFamilyMutationError, reset: resetMutation } = useFamilyProfileMutation();
	const [error, setError] = useState<string>('');
	const [disabledEmail, setDisabledEmail] = useState<boolean>(false);

	useEffect(() => {
		resetMutation(); // we need this to clear errors
	}, []);
	
	const onSubmitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
		const { dob, email, gender, name, phone } = onSubmit(event);
		// if (type === 'other') {
		await createFamilyProfile({
			birthdate: dob.value,
			parent_email: selfProfile?.email ?? '',
			email: email.value,
			name: name.value,
			phone: cleanUpMask(phone.value),
			gender: gender.value
		});
		// 	closeHandler();
		// } else {
		// 	const payload = {
		// 		name: name.value,
		// 		birthdate: dob.value,
		// 		gender: gender.value,
		// 		phone: cleanUpMask(phone.value)
		// 	};
		// 	TODO: migrate;
		// 	const response = await clikUpdateProfile({
		// 		payload
		// 	});
		// 	if (response.payload.stat_msg === 'Success') {
		// 		setDisabledEmail(false);
		// 		await getUserDetail();
		// 		onClose({
		// 			dob: dob.value,
		// 			email: email.value,
		// 			gender: gender.value,
		// 			name: name.value,
		// 			phone: phone.value
		// 		});
		// 		// TODO: migrate;
		// 	}
		// 	setError(response.payload.stat_msg);
		// }
		// setFieldsValue({
		// 	email: '',
		// 	name: '',
		// 	birthdate: '',
		// 	gender: '',
		// 	phone: ''
		// });
	};

	const cleanUpMask = (value: string) => {
		return value
			.replace('+62', '0')
			.replaceAll(' ', '')
			.replaceAll('-', '')
			.trim();
	};

	const mapError = () => {
		if (createFamilyMutationError && createFamilyMutationError.message.toLowerCase() === 'validation error') return 'Mohon isi semua data.';
		return  createFamilyMutationError && createFamilyMutationError.message;
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
		if (type === 'self') {
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
					<icons.Close alt='' />
				</div>
			</ModalHeader>
			<NotificationPanel
				showIconLeft={ false }
				showIconRight={ false }
				mode={ 'error' }
				visible={ !!createFamilyMutationError }
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
					className='grid grid-cols-2 gap-[16px] md:gap-[24px]'
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
				<FormRow className='grid grid-cols-2 gap-[16px] md:gap-[24px]'>
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
				<FormRow className='grid grid-cols-2 gap-[16px] md:gap-[24px]'>
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