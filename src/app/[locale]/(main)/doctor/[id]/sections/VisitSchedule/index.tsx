import { Button, Spinner, Text } from '@/components';
import { colors, icons, Languages as lang } from '@/constant';
import dayjs from 'dayjs';
import { useTypedSelector } from '@/hooks';
import _, { isEmpty } from 'lodash';
import { VisitScheduleStyle } from 'pages/DetailDoctorProfile/style';
import { useState } from 'react';
import { EmptyWarningContainer, TimeSlotPill } from './style';
import { FindDoctorDetail, FindDoctorState, TimeSlot } from '@/interface';
import { formatTimeslot } from '@/helpers/datetime';
import Image from 'next/image';

type Props = {
	hospital?: string;
	isTelemedicine?: boolean;
	onSelect: (slotId: TimeSlot) => void;
	clinic?: FindDoctorDetail['clinic'];
	onClickContactHospital: () => void;
	selectedDate?: Date;
	dateStatus?: string;
};

const VisitSchedule: React.FC<Props> = ({
	hospital,
	isTelemedicine = false,
	onSelect,
	clinic,
	selectedDate,
	onClickContactHospital,
	dateStatus
}) => {
	const { selectedDoctorTimeSlot, timeSlotLoading } = useTypedSelector<FindDoctorState>('findDoctor');

	const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

	const language = lang.page.doctorProfile;

	const getTimeSlot = () => {
		const filteredTimeSlot = selectedDoctorTimeSlot?.filter(item => item.hospital_code === hospital) ?? [];
		const grouped = _.groupBy(filteredTimeSlot, item => item.clinic_code);
		return grouped;
	};

	const removeDuplicate = (arr: TimeSlot[]) => {
		return _.uniqBy(arr, 'slot_id');
	};

	const renderEmptyState = (
		<div className='flex flex-col items-center justify-center h-full'>
			
			<Image
				src={icons.EmptyCalendar}
				alt="" />
			<Text
				fontSize='16px'
				fontWeight='400'
				lineHeight='24px'
				color='#2A2536'
				textAlign='center'
				text={ language.slotEmptyState } />
		</div>
	);

	const selectTimeSlotHandler = (slotId: string) => {
		const timeSlotItem = selectedDoctorTimeSlot?.find(item => item.slot_id === slotId);
		if (timeSlotItem) {
			onSelect(timeSlotItem);
		}
		setSelectedTimeSlot(slotId);
	};

	if (timeSlotLoading) return <div className='flex align-center justify-center h-full'><Spinner /></div>;
	if (!selectedDate) return renderEmptyState;
	if (dateStatus === 'Limited') return <>
		<EmptyWarningContainer>
			<Text
				fontSize='14px'
				fontWeight='400'
				lineHeight='21px'
				color='#DC6803'
				text={ language.notAvailableSchedule } />
		</EmptyWarningContainer>
		<Button onClick={ onClickContactHospital } className='mt-[16px]' label={ language.callCenter } theme='outline' />
	</>;
	return (
		<VisitScheduleStyle>
			{
				!isTelemedicine
					? Object.keys(getTimeSlot()).map((clinic_code, index) => {
						return (
							<div key={ index }>
								<Text text={ (clinic && clinic[0].clinic_name) ?? '' } fontSize='16px' fontWeight='700' />
								<div className='grid grid-cols-2 mt-[15px] mb-[30px] gap-[10px] ' >
									{
										removeDuplicate(getTimeSlot()[clinic_code]).map((slot, index) => {
											if (slot?.available ?? false)
												return (
													<TimeSlotPill
														key={ index }
														className='px-[10px] py-[8px] rounded-[5px] flex justify-center'
														onClick={ () => selectTimeSlotHandler(slot.slot_id) }
														active={ selectedTimeSlot === slot.slot_id }
													>
														<Text text={ formatTimeslot(slot.session_app_start) } fontSize='16px' fontWeight='400' color={ selectedTimeSlot === slot.slot_id ? colors.white.body : colors.grey.darkOpacity } />
													</TimeSlotPill>
												);
										}
										)
									}
								</div>
							</div>
						);
					})
					: <div className='empty-state mt-[15px] mb-[30px]'>
						Jadwal dokter tidak tersedia di tanggal yang Anda pilih karena sudah mencapai maksimal reservasi online.
						<span> Silakan pilih tanggal dan waktu lain yang tersedia di bawah ini atau hubungi call center kami untuk informasi lebih lanjut</span>
					</div>
			}

		</VisitScheduleStyle>
	);
};

export default VisitSchedule;