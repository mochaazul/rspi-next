import { useState, useMemo, useRef, useEffect } from 'react';

import { colors, Images, Languages } from '@/constant';
import { Accordion, Modal, Text } from '@/components/ui';

import JadwalKunjungan from './components/ui/JadwalKunjungan';
import RiwayatKunjungan from './components/ui/RiwayatKunjungan';
import RiwayatVaksin from './components/ui/RiwayatVaksin';
import RiwayatLab from './components/ui/RiwayatLab';
import { VisitHistoryStyle } from './style';
import PinModal from '@/components/ui/PinModal';
import { getAppointmentList } from '@/stores/actions';
import { useTypedSelector } from '@/hooks';
import { PatientState } from '@/interface/PatientProfile';
import { useAppDispatch } from '@/hooks';
import { FindDoctorState, UserState } from '@/interface';
import dayjs from 'dayjs';
import { getLastVisitHospital, getVisitHistories } from '@/stores/PatientProfile';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const { riwayatLab, riwayatVaksin } = Languages.page.patientPortal;

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
	const params = useParams();

	useEffect(() => {
		if (params.id) {
			setHeaderOpened(true);
			setActiveTabIndex(parseInt(params.id));
		}
	}, [params]);

	const [activeTabIndex, setActiveTabIndex] = useState(1);
	const [headerOpened, setHeaderOpened] = useState<boolean>(false);
	const [shouldEnterPin, setShouldEnterPin] = useState<boolean>(false);
	const [pinModalVisible, setPinModalVisible] = useState<boolean>(false);

	const { lastVisitedHospital } = useTypedSelector<PatientState>('patient');
	const { userDetail } = useTypedSelector<UserState>('user');

	const getAppointment = useAppDispatch(getAppointmentList);
	const getLastVisitedHospital = useAppDispatch(getLastVisitHospital);

	const tabsRef = useRef<any>([]);

	useEffect(() => {
		getLastVisitedHospital();
	}, []);

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
			return `${ month } Month${ month > 1 && 's' }, ${ userDetail.gender }`;
		}
		return `${ years } Yrs, ${ userDetail.gender }`;
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
						<Image src={ userDetail.img_url || Images.ProfilePatient } />
						<div className='ml-[15px]'>
							<Text text={ userDetail.name } fontSize='16px' fontWeight='700' />
							<Text text={ `${ parseBod(userDetail.birthdate) }` } className='md:mt-[10px]' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
						</div>
					</section>
					<section id='patient-ids' className='sm:w-1/2 md:w-1/4'>
						<Text text={ 'Patient ID' } subClassName='max-sm:text-right' fontSize='14px' fontWeight='400' color={ colors.grey.darkOpacity } />
						<Text text={ userDetail.patient_code || '-' } subClassName='max-sm:text-right' className='md:mt-[10px]' fontSize='16px' fontWeight='700' />
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