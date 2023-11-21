'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';

import { colors, Images } from '@/constant';
import { Text } from '@/components/ui';
import PinModal from '@/components/ui/PinModal';
import { useGetVisitHistory } from '@/lib/api/client/hospital';
import { useGetProfile } from '@/lib/api/client/profile';
import { getLastVisitedHospitalHelper } from '@/helpers/visitHelper';

import JadwalKunjungan from './components/JadwalKunjungan';
import RiwayatKunjungan from './components/RiwayatKunjungan';
import RiwayatVaksin from './components/RiwayatVaksin';
import RiwayatLab from './components/RiwayatLab';

import { VisitHistoryStyle } from './style';

type MenuType = {
	id: number;
	label: string,
	isHeader: boolean,
	children: MenuType[];
};

const tabMenuLabel: MenuType[] = [
	{
		id: 1,
		label: 'Jadwal Konsultasi',
		isHeader: false,
		children: []
	},
	{
		id: 2,
		label: 'Riwayat Medis',
		isHeader: true,
		children: [
			{
				id: 3,
				label: 'Konsultasi',
				isHeader: false,
				children: []
			},
			{
				id: 4,
				label: 'Vaksin',
				isHeader: false,
				children: []
			},
			{
				id: 5,
				label: 'Hasil Lab',
				isHeader: false,
				children: []
			},
		]
	},
];

const PatientPortal = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(1);
	const [headerOpened, setHeaderOpened] = useState<boolean>(false);
	const [shouldEnterPin, setShouldEnterPin] = useState<boolean>(false);
	const [pinModalVisible, setPinModalVisible] = useState<boolean>(false);

	const params = useParams();
	const tabsRef = useRef<any>([]);

	const { data: visitHistoryResponse, error: visitHistoryError, isLoading: visitHistoryLoading } = useGetVisitHistory();
	const { data: getProfileResponse, isLoading: getProfileLoading } = useGetProfile();

	const lastVisitedHospital = getLastVisitedHospitalHelper(visitHistoryResponse?.data || []);

	useEffect(() => {
		if (params.id) {
			setHeaderOpened(true);
			setActiveTabIndex(parseInt(params.id as string));
		}
	}, [params]);

	const renderContent = useMemo(() => {
		switch (activeTabIndex) {
			case 1:
				return <JadwalKunjungan />;
			case 3:
				return <RiwayatKunjungan />;
			case 4:
				return <>
					<RiwayatVaksin />
				</>;
			case 5:
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
		setActiveTabIndex(3);
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
					<>
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
								onClick={ () => setActiveTabIndex(child.id) }>
								<Text
									text={ child.label }
									fontWeight='700'
									color={ activeTabIndex === child.id ? colors.paradiso.default : colors.grey.dark } />
							</button>
						)) }
					</>
				);
			}
		});
	};

	const parseBod = (date?: string) => {
		const dateParsed = dayjs(date, 'YYYY-MM-DD');
		const years = dayjs().diff(dateParsed, 'years');
		const month = dayjs().diff(dateParsed, 'months');
		if (years < 0 && month > 0) {
			return `${ month } Month${ month > 1 && 's' }, ${ getProfileResponse?.data.gender }`;
		}
		return `${ years } Yrs, ${ getProfileResponse?.data.gender }`;
	};

	return (
		<VisitHistoryStyle
			className='max-sm:py-0 md:mt-[104px]'
		>
			<div className='rectangle' />
			<div className='content-wrapper pt-[60px] md:pt-[120px]'>
				<div className='card flex  flex-wrap'>
					<section id='user-info'
						className='flex flex-row sm:w-1/2 md:w-1/4'
					>
						<img alt='' src={ getProfileResponse?.data.img_url || Images.ProfilePatient.src } />
						<div className='ml-[15px]'>
							<Text text={ getProfileResponse?.data.name } fontSize='16px' fontWeight='700' />
							<Text text={ `${ parseBod(getProfileResponse?.data.birthdate) }` } className='md:mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
						</div>
					</section>
					<section id='patient-ids' className='sm:w-1/2 md:w-1/4'>
						<Text text={ 'Patient ID' } subClassName='max-sm:text-right' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
						<Text text={ getProfileResponse?.data.patient_code || '-' } subClassName='max-sm:text-right' className='md:mt-[10px]' fontSize='16px' fontWeight='700' />
					</section>
					<hr className='my-[24px] md:hidden w-full' />
					<div className='sm:w-1/2 md:w-1/4'>
						<Text text={ 'Last Visited Hospital' } fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
						<Text text={ lastVisitedHospital?.hospital_name } className='md:mt-[10px]' fontSize='16px' fontWeight='700' />
					</div>
					<div className='sm:w-1/2 md:w-1/4'>
						<Text text={ 'Last Visited Date' } subClassName='max-sm:text-right' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
						<Text text={ dayjs(lastVisitedHospital?.visit_date || dayjs()).format('dddd, DD MMMM YYYY') } subClassName='max-sm:text-right' className='md:mt-[10px]' fontSize='16px' fontWeight='700' />
					</div>
					{ /* */ }
				</div>
				<div className='mt-[32px] flex'>
					<div className='relative tabs border-solid border-b-[1px] border-b-white/20 max-sm:hidden'>
						<div className='tabs-menu'>
							{ renderMenuItem() }
						</div>
					</div>
					<div className='md:ml-[31px] w-full min-h-[500px]'>
						{ renderContent }
					</div>
				</div>
			</div>
			<PinModal visible={ pinModalVisible } onSuccess={ onSuccessEnterPin } />
		</VisitHistoryStyle>
	);
};

export default PatientPortal;