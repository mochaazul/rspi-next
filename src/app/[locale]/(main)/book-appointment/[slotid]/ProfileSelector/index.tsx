import {
	CardListsContainer,
	NoProfileContainer,
	OtherProfileSection,
	ProfileCardHeader, ProfileCardRow, ProfilePills, ProfileSelectorCard, ProfileSelectorContainer, SelfProfileSection
} from './style';
import { Images, colors, icons } from '@/constant';
import { UserDataDetail } from '@/interface';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { splitDate } from '@/helpers/datetime';
import Text from '@/components/ui/Text';
import Modal from '@/components/ui/Modal';
import { ProfileModalContainer } from '../AddProfileModal/style';
import Button from '@/components/ui/Button';
import { useScopedI18n } from '@/locales/client';
import { deleteFamilyProfile } from '@/lib/api/profile';
import { isMobile } from 'react-device-detect';
import Picker from '@/components/ui/Picker';

type ProfileCardProps = {
	profile: UserDataDetail,
	onClick: (id: number) => void;
	isActive: boolean;
	isSelf: boolean;
	showModalDelete: (id: number, visible: boolean) => void;
	showModalEdit: (data: UserDataDetail) => void;
	className?: string;
};

type ObjectShowModal = {
	id: boolean;
};

const ProfileCard = ({ profile, onClick, isActive, isSelf, showModalDelete, className = 'max-sm:min-w-full max-sm:max-w-full', showModalEdit }: ProfileCardProps) => {
	const [showModalMoreMenu, setShowModalMoreMenu] = useState<boolean>(false);
	const t = useScopedI18n('page.profilePage.profileDetail');

	const moreMenu = (value: boolean) => {
		return <div>
			<Picker show={ showModalMoreMenu }
				isFromProfileSelector={ true }
				minWidth='min-w-[158px] ml-[40px]'
				className='w-[100px] !mt-0 !shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] z-30 !rounded-[10px] '>
				<div
					key={ 'aa' }
					className={ `flex cursor-pointer py-[12px] px-[16px] border-t border-[#F0F2F9]` }
					onClick={ () => { showModalEdit(profile); setShowModalMoreMenu(false); } }
				>
					<Text
						lineHeight='19px'
						subClassName='text-xs'
						color={ colors.black.general }
						text={ t('editProfileLabel') }
					/>
				</div>
				<div
					key={ 'bb' }
					className={ `flex cursor-pointer py-[12px] px-[16px] border-t border-[#F0F2F9]` }
					onClick={ () => { showModalDelete(profile?.id, true); setShowModalMoreMenu(false); } }
				>
					<Text
						lineHeight='19px'
						subClassName='text-xs'
						color={ colors.black.general }
						text={ t('deleteLabel') }
					/>
				</div>
			</Picker>
		</div>;
	};

	return (<ProfileSelectorCard isActive={ isActive } onClick={ () => { onClick(profile.id); } }
		className={ className }
	>
		<ProfileCardHeader>
			<ProfilePills color={ isActive ? colors.green.light : colors.grey.light } />
			<Text text={ profile.name } fontWeight='700' />
			{
				!isSelf &&
				<div onClick={ async () => {
					setShowModalMoreMenu(!showModalMoreMenu);
					// setShowModalMoreMenu(true);
				} }>
					<Images.MoreMenu
						width='13px'
						height='13px' />
				</div>
			}

		</ProfileCardHeader>
		{
			isMobile ?
				<ProfileCardRow className='gap-x-[4px]'>
					{ moreMenu(showModalMoreMenu) }
					<Text text={ `${ profile.phone } ` } fontSize='12px' subClassName='text-xs' color={ isActive ? colors.black.default : colors.grey.darkOpacity } />
					<Text text={ `|` } fontSize={ '12px' } fontWeight='400' color={ colors.grey.default } />
					<Text text={ `${ dayjs(splitDate(profile.birthdate)).format('DD MMMM YYYY') } ` } fontSize='12px' subClassName='text-xs' color={ isActive ? colors.black.default : colors.grey.darkOpacity } />
				</ProfileCardRow> :
				<>
					{ moreMenu(showModalMoreMenu) }
					<ProfileCardRow>
						<Text text={ dayjs(splitDate(profile.birthdate)).format('DD MMMM YYYY') } fontSize='14px' color={ isActive ? colors.black.default : colors.grey.darkOpacity } />
					</ProfileCardRow>
					<ProfileCardRow>
						<Text text={ `${ profile.phone }` } fontSize='14px' color={ isActive ? colors.black.default : colors.grey.darkOpacity } />
					</ProfileCardRow>

				</>
		}

	</ProfileSelectorCard>);
};

type ProfileSelectorProps = {
	onSelected: (profile: UserDataDetail) => void;
	selfProfile?: UserDataDetail;
	onAddNewProfileBtn: (type: string) => void;
	familyProfiles?: UserDataDetail[];
	onSetAsAddProfile: (value: boolean) => void;
};

const ProfileSelector = ({ onSelected, selfProfile, onAddNewProfileBtn, familyProfiles, onSetAsAddProfile }: ProfileSelectorProps) => {
	const t = useScopedI18n('page.bookingAppointment.profileSelector');

	const [selectedProfile, setSelectedProfile] = useState<number>();
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [selectedIdFamilyProfile, setSelectedIdFamilyProfile] = useState<number>();
	const [selectedProfileOnDelete, setSelectedProfileOnDelete] = useState<UserDataDetail>();

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
					<Text text={ t('emptyOther') } />
					<Text text={ t('addProfileLabelOnEmpty') } className='ml-2 cursor-pointer' fontWeight='600' color={ colors.green.brandAccent } onClick={ () => onAddNewProfileBtn('other') } />
				</div>
			</NoProfileContainer>
		);
	};

	const onSelectProfile = (id: number, self: boolean) => {
		setSelectedProfile(id);
		const selectedProf = familyProfiles?.find(prof => prof.id === id);
		if (self && selfProfile) {
			onSelected(selfProfile);
		}
		if (!self && selectedProf) {
			onSelected(selectedProf);
		}
	};

	const renderNoProfileSelf = () => {
		return (
			<NoProfileContainer>
				<icons.UserCircle />
				<div className='flex flex-row mb-2'>
					<Text text={ t('emptySelf') } />
					<Text text={ t('addProfileLabelOnEmpty') } className='ml-2 cursor-pointer' fontWeight='600' color={ colors.green.brandAccent } onClick={ () => { onAddNewProfileBtn('self'); onSetAsAddProfile(true); } } />
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
			onClose={ () => setShowDeleteModal(false) }
		>
			<ProfileModalContainer>
				<icons.WarningIcon />
				<Text
					subClassName='max-sm:text-[16px] mb-[16px] text-center'
					fontSize='24px'
					fontWeight='700'
					lineHeight='38px'
					text={ `${ t('deleteModal.heading') } "${ selectedProfileOnDelete?.name }" ?` } />
				<div className='flex flex-row gap-x-5 w-full'>
					<Button className='sub-button color-default' theme='primary' label={ t('deleteModal.yesLabel') } onClick={ async () => {
						setShowDeleteModal(false);
						await deleteFamilyProfile(selectedIdFamilyProfile ?? -1);
					} } />
					<Button className='sub-button color-red' theme='outline' label={ t('deleteModal.noLabel') } onClick={ () => setShowDeleteModal(false) } />
				</div>
			</ProfileModalContainer>
		</Modal>;
	};

	return <ProfileSelectorContainer
		className='max-sm:flex flex-col'
	>
		<SelfProfileSection>
			<Text text={ t('selfLabel') } fontWeight='900' />
			{
				(selfProfile &&
					selfProfile?.name !== '' &&
					selfProfile?.phone !== '' &&
					selfProfile?.birthdate !== '0001-01-01' &&
					selfProfile?.birthdate !== '0001-01-01 00:00:00 +0000 UTC'
				)
					? <ProfileCard profile={ selfProfile }
						showModalDelete={ (id, visible) => {
							setSelectedIdFamilyProfile(id);
							setShowDeleteModal(true);
						} }
						showModalEdit={ (data) => {
							onSelected(data);
						} }
						isActive={ selectedProfile === selfProfile?.id }
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
				<Text text={ t('other') } fontWeight='900' />
				{
					familyProfiles?.length ?
						<span className='flex flex-row gap-[4px] items-center cursor:pointer' onClick={ () => { onAddNewProfileBtn('other'); onSetAsAddProfile(true); } }>
							<Images.PlusCircle
								width='13px'
								height='13px' />
							<Text text={ t('addNewProfile') } color={ colors.green.brandAccent } fontWeight='900' className='cursor-pointer' />
						</span> : <></>
				}
			</section>
			<CardListsContainer
				className='flex flex-row gap-[8px] md:gap-[16px] overflow-x-scroll scrollbar'
			>
				{ /* <ProfileCard /> */ }
				{ isEmpty(familyProfiles) || selfProfile === null
					? renderNoProfile()
					:
					<>
						{ familyProfiles && familyProfiles?.map(profile => (<ProfileCard className='w-50 p-[10px] p-[16px] md:p-[20px]' showModalDelete={ (id, visible) => {
							setSelectedIdFamilyProfile(id);
							setSelectedProfileOnDelete(profile);
							setShowDeleteModal(true);
						} }
							showModalEdit={ (data) => {
								onSelected(data);
								onSetAsAddProfile(false);
								onAddNewProfileBtn('other');
							} } key={ profile.id } profile={ profile } onClick={ id => { onSelectProfile(id, false); } } isActive={ selectedProfile === profile.id } isSelf={ false } />)) }
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