import {
	CardListsContainer,
	NoProfileContainer,
	OtherProfileSection,
	ProfileCardHeader, ProfileCardRow, ProfilePills, ProfileSelectorCard, ProfileSelectorContainer, SelfProfileSection
} from './style';
import { colors, icons } from '@/constant';
import {  UserDataDetail, UserState } from '@/interface';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { splitDate } from '@/helpers/datetime';
import Image from 'next/image';
import Text from '@/components/ui/Text';
import Modal from '@/components/ui/Modal';
import { ProfileModalContainer } from '../AddProfileModal/style';
import Button from '@/components/ui/Button';
import { useDeleteFamilyProfileMutation } from '@/lib/api/profile';

type ProfileCardProps = {
	profile: UserDataDetail,
	onClick: (id: number) => void;
	isActive: boolean;
	isSelf: boolean;
	showModalDelete: (id: number, visible: boolean) => void;
};
const ProfileCard = ({ profile, onClick, isActive, isSelf, showModalDelete }: ProfileCardProps) => {

	return (<ProfileSelectorCard isActive={ isActive } onClick={ () => { onClick(profile.id); } }
		className='max-sm:min-w-full max-sm:max-w-full'
	>
		<ProfileCardHeader>
			<ProfilePills />
			<Text text={ profile.name } fontWeight='700' />
			{
				!isSelf &&
				<div onClick={ async() => {
					showModalDelete(profile?.id, true);
				} }>
					<icons.Trash />
				</div>
			}
		</ProfileCardHeader>
		<ProfileCardRow>
			<icons.Calendar16
			/>
			<Text text={ dayjs(splitDate(profile.birthdate)).format('DD MMMM YYYY') } fontSize='14px' color={ colors.grey.darkOpacity } />
		</ProfileCardRow>
		<ProfileCardRow>
			<icons.PhoneOutline
				 />
			<Text text={ profile.phone } fontSize='14px' color={ colors.grey.darkOpacity } />
		</ProfileCardRow>
	</ProfileSelectorCard>);
};

type ProfileSelectorProps = {
	onSelected: (profile: UserDataDetail) => void;
	selfProfile?: UserDataDetail;
	onAddNewProfileBtn: (type: string) => void;
	familyProfiles?: UserDataDetail[]
};

const ProfileSelector = ({ onSelected, selfProfile, onAddNewProfileBtn, familyProfiles }: ProfileSelectorProps) => {

	const { data: deleteResponse, trigger: deleteFamilyProfileTrigger, error: deleteError } = useDeleteFamilyProfileMutation();

	// const userData = localStorage?.getUserData();
	const [selectedProfile, setSelectedProfile] = useState<number>();
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [selectedIdFamilyProfile, setSelectedIdFamilyProfile] = useState<number>();
	useEffect(() => {
		if (selfProfile) {
			setSelectedProfile(selfProfile.id);
			onSelected(selfProfile);
		}
	}, [selfProfile]);

	const renderNoProfile = () => {
		return (
			<NoProfileContainer>
				<icons.UserCircle />
				<div className='flex flex-row mb-2'>
					<Text text='Belum ada data orang lain' />
					<Text text='Tambahkan' className='ml-2 cursor-pointer' fontWeight='600' color={ colors.green.brandAccent } onClick={ () => onAddNewProfileBtn('other') } />
				</div>
			</NoProfileContainer>
		);
	};

	const renderAddProfileFamily = () => {
		return (
			<NoProfileContainer>
				<div className='flex flex-row mb-2 cursor-pointer items-center' onClick={ () => onAddNewProfileBtn('other') }>
					<icons.AddButton />
					<Text className='ml-2' fontWeight='600' color={ colors.green.brandAccent } text='Tambah Profil Baru' />
				</div>
			</NoProfileContainer>
		);
	};

	const onSelectProfile = (id: number, self: boolean) => {
		setSelectedProfile(id);
		// const selectedProf = familyProfiles?.find(prof => prof.id === id);
		if (self && selfProfile) {
			onSelected(selfProfile);
		}
		// if (!self && selectedProf) {
		// 	onSelected(selectedProf);
		// }
	};

	const renderNoProfileSelf = () => {
		return (
			<NoProfileContainer>
				<icons.UserCircle />
				<div className='flex flex-row mb-2'>
					<Text text='Data diri kosong.' />
					<Text text='Tambahkan' className='ml-2 cursor-pointer' fontWeight='600' color={ colors.green.brandAccent } onClick={ () => onAddNewProfileBtn('self') } />
				</div>
			</NoProfileContainer>
		);
	};
	const modalDelete = () => {
		return <Modal
			visible={ showDeleteModal }
			noPadding
			width='526px'
			borderRadius='12px'
			overflow='none'
			containerClassName='m-[10px]'
		>
			<ProfileModalContainer>
				<icons.WarningIcon />
				<Text
					subClassName='max-sm:text-[16px] mb-[16px] text-center'
					fontSize='24px'
					fontWeight='700'
					lineHeight='38px'
					text={ 'Apakah Anda yakin ingin menghapus data orang lain “Agung Hartono” ?' } />
				<div className='flex flex-row gap-x-5 w-full'>
					<Button className='sub-button color-default' theme='primary' label='Ya' onClick={ async() => {
						setShowDeleteModal(false);
						await deleteFamilyProfileTrigger({ id: selectedIdFamilyProfile ?? -1 });
						// await getFamilyProfilesDispatch();
					} } />
					<Button className='sub-button color-red' theme='outline' label='Tidak' onClick={ () => setShowDeleteModal(false) } />
				</div>
			</ProfileModalContainer>
		</Modal>;
	};

	return <ProfileSelectorContainer
		className='max-sm:flex flex-col'
	>
		<SelfProfileSection>
			<Text text='Diri Sendiri :' fontWeight='900' />
			{
				selfProfile
					? <ProfileCard profile={ selfProfile }
						showModalDelete={ (id, visible) => {
							setSelectedIdFamilyProfile(id);
							setShowDeleteModal(true);
						} }
						isActive={ selectedProfile === selfProfile.id }
						isSelf={ true }
						onClick={ id => { onSelectProfile(id, true); } }
					/>
					: renderNoProfileSelf()
			}
		</SelfProfileSection>
		<OtherProfileSection
			className='flex-col md:overflow-x-hidden'
		>
			<section id='header-other-people-selector'
				className='flex justify-between'
			>
				<Text text='Orang Lain :' fontWeight='900' />
				<span className='flex flex-row gap-[4px] items-center cursor:pointer md:hidden' onClick={ () => { () => onAddNewProfileBtn('other'); } }>
					<Image
						src={ icons.PlusCircle }
						alt='' />
					<Text text='Tambah orang baru' color={ colors.green.brandAccent } fontWeight='900' />
				</span>
			</section>
			<CardListsContainer
				className='flex flex-col md:flex-row gap-[12px] md:gap-[30px] md:overflow-x-auto'
			>
				{ /* <ProfileCard /> */ }
				 { isEmpty(familyProfiles) || selfProfile === null
					? renderNoProfile()
					:
					<>
						{ familyProfiles && familyProfiles.map(profile => (<ProfileCard showModalDelete={ (id, visible) => {
							setSelectedIdFamilyProfile(id);
							setShowDeleteModal(true);
						} } key={ profile.id } profile={ profile } onClick={ id => { onSelectProfile(id, false); } } isActive={ selectedProfile === profile.id } isSelf={ false } />)) }
						{ renderAddProfileFamily() }
					</>
				}
			</CardListsContainer>
		</OtherProfileSection>
		{
			modalDelete()
		}
	</ProfileSelectorContainer>;
};

export default ProfileSelector;