import _ from 'lodash';
import { useState } from 'react';
import { EmptyWarningContainer, TimeSlotPill } from './style';
import { FindDoctorDetail, TimeSlot } from '@/interface';
import { formatTimeslot } from '@/helpers/datetime';
import { VisitScheduleStyle } from '../../style';
import { colors, icons } from '@/constant';
import Text from '@/components/ui/Text';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import { useScopedI18n } from '@/locales/client';
import dayjs from 'dayjs';

type Props = {
	hospital?: string;
	isTelemedicine?: boolean;
	onSelect: (slotId: TimeSlot) => void;
	clinic?: FindDoctorDetail['clinic'];
	onClickContactHospital: () => void;
	selectedDate?: Date;
	dateStatus?: string;
	timeslot: TimeSlot[],
	isLoading: boolean;
};

const VisitSchedule: React.FC<Props> = ({
	hospital,
	isTelemedicine = false,
	onSelect,
	clinic,
	selectedDate,
	onClickContactHospital,
	dateStatus,
	timeslot,
	isLoading
}) => {
	const t = useScopedI18n('page.doctorProfile');
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

	const getTimeSlot = () => {
		const filteredTimeSlot = timeslot?.filter(item => item.hospital_code === hospital) ?? [];
		const removePastDate = filteredTimeSlot.filter(item => {
			const itemDateTime = `${ item.date } ${ formatTimeslot(item.session_app_start) }`;
			// only return when the item is on the future
			const isPastDateTime = dayjs().isAfter(dayjs(itemDateTime, 'YYYY-MM-DD HH:mm'));
			return !isPastDateTime && item;

		});
		const grouped = _.groupBy(removePastDate, item => item.clinic_code);
		return grouped;
	};

	const removeDuplicate = (arr: TimeSlot[]) => {
		return _.uniqBy(arr, 'slot_id');
	};

	const renderEmptyState = (
		<div className='flex flex-col items-center justify-center h-full'>

			<icons.EmptyCalendar />
			<Text
				fontSize='16px'
				fontWeight='400'
				lineHeight='24px'
				color='#2A2536'
				textAlign='center'
				text={ t('slotEmptyState') } />
		</div>
	);

	const selectTimeSlotHandler = (slotId: string) => {
		const timeSlotItem = timeslot?.find((item: any) => item.slot_id === slotId);
		if (timeSlotItem) {
			onSelect(timeSlotItem);
		}
		setSelectedTimeSlot(slotId);
	};

	if (isLoading) return <div className='flex align-center justify-center h-full'><Spinner /></div>;
	if (!selectedDate) return renderEmptyState;
	if (dateStatus === 'Limited' || _.isEmpty(getTimeSlot())) return <>
		<EmptyWarningContainer>
			<Text
				fontSize='14px'
				fontWeight='400'
				lineHeight='21px'
				color='#DC6803'
				text={ t('notAvailableSchedule') } />
		</EmptyWarningContainer>
		<Button onClick={ onClickContactHospital } className='mt-[16px]' label={ t('callCenter') } theme='outline' $hoverTheme='primary' />
	</>;
	return (
		<VisitScheduleStyle>
			{
				!isTelemedicine
					? Object.keys(getTimeSlot()).map((clinic_code, index) => {
						const clinicName = clinic?.find(item => item.clinic_code === clinic_code);
						return (
							<div key={ `clinic-name-${ index }` }>
								<Text text={ (clinicName && clinicName.clinic_name) ?? '' } fontSize='16px' fontWeight='700' />
								<div className='grid grid-cols-2 mt-[15px] mb-[30px] gap-[10px] ' >
									{
										removeDuplicate(getTimeSlot()[clinic_code]).map((slot, index) => {
											if (slot?.available ?? false)
												return (
													<TimeSlotPill
														key={ `slot-pill-${ index }` }
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