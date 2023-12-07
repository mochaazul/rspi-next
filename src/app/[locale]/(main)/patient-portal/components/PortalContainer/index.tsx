'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
	const [activeTabIndex, setActiveTabIndex] = useState(1);
	const [activeTabIndexForCallBackPin, setActiveTabIndexForCallBackPin] = useState(1);
	const [headerOpened, setHeaderOpened] = useState<boolean>(false);
	const [shouldEnterPin, setShouldEnterPin] = useState<boolean>(false);
	const [pinModalVisible, setPinModalVisible] = useState<boolean>(false);

	const params = useParams();
	const tabsRef = useRef<any>([]);
	const t = useScopedI18n('page.patientPortal');

	const lastVisitedHospital = getLastVisitedHospitalHelper(visitHistoryResponse?.data || []);
	const tabMenuLabel: MenuType[] = [
		{
			id: 1,
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
					id: 2,
					label: t('tabMenuLabel.menu2.children.0'),
					isHeader: false,
					children: []
				},
				{
					id: 3,
					label: t('tabMenuLabel.menu2.children.1'),
					isHeader: false,
					children: []
				},
				{
					id: 4,
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
			case 1:
				return <JadwalKunjungan patientProfile={ patientProfile } />;
			case 2:
				return <RiwayatKunjungan patientProfile={ patientProfile } />;
			case 3:
				return <>
					<RiwayatVaksin />
				</>;
			case 4:
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
		if (shouldEnterPin) {
			setPinModalVisible(true);
		} else if (headerOpened) {
			setHeaderOpened(false);
		} else {
			setHeaderOpened(true);
		}
	};

	const onSuccessEnterPin = () => {
		setPinModalVisible(false);
		setShouldEnterPin(false);
		setHeaderOpened(true);
		setActiveTabIndex(activeTabIndexForCallBackPin);
	};

	const renderMenuItem = () => {
		return tabMenuLabel.map(menuItem => {
			if (!menuItem.isHeader) {
				return (<button
					key={ menuItem.id }
					ref={ el => (tabsRef.current[menuItem.id] = el) }
					style={ { backgroundColor: activeTabIndex === menuItem.id ? colors.paradiso.opacity10 : '' } }
					className={ 'py-[20px] w-[254px] max-lg:w-[200px] pl-[20px] duration-300' }
					onClick={ () => setActiveTabIndex(menuItem.id) }>
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
									setPinModalVisible(true);
									setActiveTabIndexForCallBackPin(child.id); // temporary store active id, to be called in callback pin modal
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
			<div className='content-wrapper pt-[60px] md:pt-[120px]'>
				<div className='w-full -mt-[42px] relative'>
					<CardUser
						patientProfile={ patientProfile }
						lastVisitedHospital={ lastVisitedHospital }
					/>
				</div>
				<div className='mt-[32px] flex flex-col md:flex-row'>
					<div className='relative tabs border-solid border-b-[1px] border-b-white/20 max-sm:hidden'>
						<div className='tabs-menu'>
							{ renderMenuItem() }
						</div>
					</div>
					<div className='md:hidden'>
						<Tabs
							activeTabIndex={ activeTabIndex }
							setActiveTabIndex={ setActiveTabIndex }
							tabsData={ tabMenuLabel.flatMap(eachMenu => eachMenu.children.length > 0 ? eachMenu.children : eachMenu).map(eachMap => eachMap.label) }
							onClickItem={ index => {
								if (index > 0) {
									setPinModalVisible(true);
								}
								setActiveTabIndexForCallBackPin(index);
							} }
						/>
					</div>
					<div className='md:ml-[31px] w-full min-h-[500px] max-sm:hidden'>
						{ renderContent }
					</div>
					<div className='md:ml-[31px] w-full min-h-[500px] md:hidden'>
						{ renderContentMobile }
					</div>
				</div>
			</div>
			<PinModal visible={ pinModalVisible } onSuccess={ onSuccessEnterPin } />
		</VisitHistoryStyle>
	);
};

export default PortalContainer;