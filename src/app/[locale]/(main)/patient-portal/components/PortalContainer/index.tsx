'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { colors } from '@/constant';
import { Tabs, Text } from '@/components/ui';
import PinModal from '@/components/ui/PinModal';
import { getLastVisitedHospitalHelper } from '@/helpers/visitHelper';
import CardUser from '@/components/ui/PageComponents/UserInformationSections/CardUser';
import { useScopedI18n } from '@/locales/client';
import { I_VisitHistory, ResponseType, UserDataDetail } from '@/interface';

import JadwalKunjungan from '../JadwalKunjungan';
import RiwayatKunjungan from '../RiwayatKunjungan';
import RiwayatVaksin from '../RiwayatVaksin';
import RiwayatLab from '../RiwayatLab';

import { VisitHistoryStyle } from '../../style';

type MenuType = {
	id: number;
	label: string,
	isHeader: boolean,
	children: MenuType[];
};

type PortalContainerProps = {
	patientProfile: UserDataDetail;
	visitHistoryResponse: ResponseType<I_VisitHistory[]>;
};

const PortalContainer = ({ patientProfile, visitHistoryResponse }: PortalContainerProps) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [activeParentTabMobileIndex, setActiveParentTabMobileIndex] = useState(0);
	const [headerOpened, setHeaderOpened] = useState<boolean>(false);
	const [pinModalVisible, setPinModalVisible] = useState<boolean>(false);

	const params = useParams();
	const tabsRef = useRef<any>([]);
	const t = useScopedI18n('page.patientPortal');

	const lastVisitedHospital = getLastVisitedHospitalHelper(visitHistoryResponse?.data || []);
	const tabMenuLabel: MenuType[] = [
		{
			id: 0,
			label: t('tabMenuLabel.menu1.heading'),
			isHeader: false,
			children: []
		},
		{
			id: 99,
			label: t('tabMenuLabel.menu2.heading'),
			isHeader: true,
			children: [
				{
					id: 1,
					label: t('tabMenuLabel.menu2.children.0'),
					isHeader: false,
					children: []
				},
				{
					id: 2,
					label: t('tabMenuLabel.menu2.children.1'),
					isHeader: false,
					children: []
				},
				{
					id: 3,
					label: t('tabMenuLabel.menu2.children.2'),
					isHeader: false,
					children: []
				},
			]
		},
	];

	useEffect(() => {
		if (params.id) {
			setHeaderOpened(true);
			setActiveTabIndex(parseInt(params.id as string));
		}
	}, [params]);

	useEffect(() => {
		if (visitHistoryResponse?.stat_code !== 'APP:SUCCESS' && visitHistoryResponse?.stat_msg) {
			toast.error(visitHistoryResponse?.stat_msg);
		}
	}, [visitHistoryResponse?.stat_code]);

	const renderContent = useMemo(() => {
		switch (activeTabIndex) {
			case 0:
				return <JadwalKunjungan patientProfile={ patientProfile } />;
			case 1:
				return <RiwayatKunjungan patientProfile={ patientProfile } />;
			case 2:
				return <>
					<RiwayatVaksin />
				</>;
			case 3:
				return <>
					<RiwayatLab />
				</>;
			default:
				return null;
		}
	}, [activeTabIndex]);

	const renderContentMobile = useMemo(() => {
		switch (activeTabIndex) {
			case 0:
				return <JadwalKunjungan patientProfile={ patientProfile } />;
			case 1:
				return <RiwayatKunjungan patientProfile={ patientProfile } />;
			case 2:
				return <>
					<RiwayatVaksin />
				</>;
			case 3:
				return <>
					<RiwayatLab />
				</>;
			default:
				return null;
		}
	}, [activeTabIndex]);

	const onHeaderClick = () => {
		if (!headerOpened) {
			setPinModalVisible(true);
		}
	};

	const onSuccessEnterPin = () => {
		setPinModalVisible(false);
		setHeaderOpened(true);
		setActiveTabIndex(1);
	};

	const renderMenuItem = () => {
		return tabMenuLabel.map(menuItem => {
			if (!menuItem.isHeader) {
				return (<button
					key={ menuItem.id }
					ref={ el => (tabsRef.current[menuItem.id] = el) }
					style={ { backgroundColor: activeTabIndex === menuItem.id ? colors.paradiso.opacity10 : '' } }
					className={ 'py-[20px] w-[254px] max-lg:w-[200px] pl-[20px] duration-300' }
					onClick={ () => {
						setActiveTabIndex(menuItem.id);
						setHeaderOpened(false);
					} }>
					<Text
						text={ menuItem.label }
						fontWeight='700'
						color={ activeTabIndex === menuItem.id ? colors.paradiso.default : colors.grey.darker } />
				</button>);
			} else {
				return (
					<div key={ menuItem.id } className='flex flex-col'>
						<button
							key={ menuItem.id }
							ref={ el => (tabsRef.current[menuItem.id] = el) }
							className={ 'py-[20px] w-[254px] max-lg:w-[200px] pl-[20px] duration-300' }
							onClick={ onHeaderClick }
						>
							<Text
								text={ menuItem.label }
								fontWeight='700'
								color={ activeTabIndex === menuItem.id ? colors.paradiso.default : colors.grey.darker } />
						</button>

						{ headerOpened && menuItem.children.map((child, childIndex) => (
							<button
								key={ child.id }
								ref={ el => (tabsRef.current[child.id] = el) }
								style={ { backgroundColor: activeTabIndex === child.id ? colors.paradiso.opacity10 : '' } }
								className={ 'py-[20px] w-[254px] max-lg:w-[200px] pl-[48px] duration-300' }
								onClick={ () => {
									setActiveTabIndex(child.id);
								} }>
								<Text
									text={ child.label }
									fontWeight='700'
									color={ activeTabIndex === child.id ? colors.paradiso.default : colors.grey.dark } />
							</button>
						)) }
					</div>
				);
			}
		});
	};

	return (
		<VisitHistoryStyle className='max-sm:py-0'>
			<div className='rectangle' />
			<div className='content-wrapper pt-[60px] md:pt-[120px] pb-[107px]'>
				<div className='w-full -mt-[42px] relative'>
					<CardUser
						patientProfile={ patientProfile }
						lastVisitedHospital={ lastVisitedHospital }
					/>
				</div>
				<div className='mt-[32px] flex flex-col md:flex-row'>
					<div className='relative tabs border-solid border-b-[1px] border-b-white/20 max-md:hidden'>
						<div className='tabs-menu'>
							{ renderMenuItem() }
						</div>
					</div>
					<div className='md:hidden'>
						<Tabs
							activeTabIndex={ activeParentTabMobileIndex }
							setActiveTabIndex={ setActiveParentTabMobileIndex }
							tabsData={ tabMenuLabel.map(eachMap => eachMap.label) }
							onClickItem={ index => {
								if (index > 0) {
									onHeaderClick();
								} else {
									setHeaderOpened(false);
									setActiveTabIndex(index);
								}
							} }
							className='mb-6'
						/>

						{ headerOpened && (
							<div className='flex items-center flex-wrap gap-3 mb-4'>
								{ tabMenuLabel[activeParentTabMobileIndex]?.children?.map(child => (
									<button
										key={ child.id }
										ref={ el => (tabsRef.current[child.id] = el) }
										style={ { backgroundColor: activeTabIndex === child.id ? colors.paradiso.opacity10 : colors.grey.lightest } }
										className='py-1 px-3 rounded-full'
										onClick={ () => {
											setActiveTabIndex(child.id);
										} }>
										<Text
											text={ child.label }
											fontWeight={ activeTabIndex === child.id ? '700' : '400' }
											color={ activeTabIndex === child.id ? colors.paradiso.default : colors.grey.darker }
											subClassName='!text-xs !leading-5'
										/>
									</button>
								)) }
							</div>
						) }
					</div>
					<div className='md:ml-[31px] w-full min-h-[500px] max-sm:hidden'>
						{ renderContent }
					</div>
					<div className='min-h-[500px] w-full md:hidden'>
						{ renderContentMobile }
					</div>
				</div>
			</div>
			<PinModal visible={ pinModalVisible } onSuccess={ onSuccessEnterPin } onClose={ () => setPinModalVisible(false) } />
		</VisitHistoryStyle>
	);
};

export default PortalContainer;