import { useEffect, useState } from 'react';

import { colors, icons } from '@/constant';
import { Text } from '@/components/ui';
import { ItemType } from '@/components/ui/Accordion';

import { AccordionItemStyle, ItemChildrenStyle, TitleStyle } from './style';
import { I_MasterDoctorClinic, I_MasterDoctorClinicSchedule, I_MasterDoctorSchedule } from '@/interface';
import { formatTime, sortDays } from '@/helpers/datetime';

const Title = (props: { open: boolean; text: string, clinics: I_MasterDoctorClinic[]; onClick: () => any; hideIconChevron?: boolean; }) => (
	<TitleStyle className='flex cursor-pointer' onClick={ () => props.hideIconChevron ? null : props.onClick }>
		<div className='flex-1'>
			<Text
				fontSize='18px'
				lineHeight='24px'
				fontWeight='700'
				color={ colors.paradiso.default }
				subClassName='max-sm:text-[14px] max-sm:leading-[23px]'
			>
				{ props.text }
			</Text>
			<div className={ `flex ${ props.open && 'hidden' } mt-2` }>
				{
					props?.clinics?.map((clinic, index) => (
						<div key={ index } className='flex items-center'>
							<Text
								fontSize='14px'
								lineHeight='17px'
								fontWeight='500'
								color={ colors.grey.darker }
								subClassName='max-sm:text-[12px] max-sm:leading-[23px]'
							>
								{ clinic.clinic_name }
							</Text>
							{
								index < props.clinics.length - 1 && <div className='vertical-divider' />
							}
						</div>
					))
				}
			</div>
		</div>
		{
			props.hideIconChevron ? <></> : <div className='grow-0 mr-[-5px]'>
				<icons.ArrowDown className={ `chevron w-[18px] h-[18px] sm:w-[25px] sm:h-[25px] ${ props.open ? 'up' : '' }` } />
			</div>
		}

	</TitleStyle>
);

const ItemAccordion = ({ hospitals, props }: { props: ItemType; hospitals: I_MasterDoctorSchedule[]; }) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const handleToggleOpen = () => {
		setIsOpen(!isOpen);
		!isOpen && props.onOpen?.();
	};

	useEffect(() => {
		if (!props.onlyOpenOne) return;
		setIsOpen(!!props.isOpen);
	}, [props.isOpen, props.onlyOpenOne]);

	return (
		<AccordionItemStyle $isOpen={ isOpen }>
			<Title hideIconChevron={ true } text={ props.title } open={ isOpen } clinics={ hospitals.find(hospital => hospital.hospital === props.title)?.clinics ?? [] } onClick={ handleToggleOpen } />
			<div className='item-desc'>
				{ props.desc_jsx }
			</div>
		</AccordionItemStyle>
	);
};

const groupTimeFrame = (schedules: I_MasterDoctorClinicSchedule[]) => {
	const uniqueDay = [...new Set(schedules.map(schedule => schedule.day))];
	const serializedSchedules = uniqueDay.map(day => {
		return {
			day,
			time_frame: schedules.filter(schedule => schedule.day === day).map(schedule => ({ time_from: schedule.time_from, time_to: schedule.time_to }))
		};
	});

	return sortDays(serializedSchedules);
};

const ItemChildren = ({ clinics }: { clinics: I_MasterDoctorClinic[]; }) => {
	return (
		<ItemChildrenStyle>
			{ clinics?.map((clinic, index) => (
				<div key={ index } className={ index < clinics.length - 1 ? 'border-bottom' : '' }>
					<div>
						<Text
							fontWeight='700'
							fontSize='14px'
							lineHeight='17px'
							color={ colors.grey.darker }
							text={ clinic.clinic_name }
							subClassName='max-sm:text-[12px]'
						/>
					</div>
					<div className='flex flex-wrap mt-2 sm:mt-4 max-sm:gap-6' >
						{
							groupTimeFrame(clinic.schedules).map((date, index) => (
								<div key={ index } className='jadwal min-w-[calc(100%/7)]'>
									<div className='text-center mb-3'>
										<Text
											fontWeight='700'
											fontSize='12px'
											lineHeight='14px'
											textAlign='center'
											fontDecoration='underline'
											className='inline-block'
											subClassName='max-sm:text-[12px]'
											color={ colors.grey.dark }
											text={ date?.day }
										/>
									</div>
									{
										date?.time_frame?.map((time, index) => (
											<div key={ `time-${ date }-${ index }` }>
												<Text
													fontWeight='500'
													fontSize='12px'
													lineHeight='14px'
													textAlign='center'
													className='mt-[-4px] sm:mt-1'
													subClassName='max-sm:text-[12px]'
													color={ colors.grey.dark }
													text={ `${ formatTime(time.time_from) } - ${ formatTime(time.time_to) }` }
												/>
											</div>
										))
									}

								</div>
							))
						}
					</div>
				</div>
			)) }
		</ItemChildrenStyle>
	);
};

export default Object.assign(ItemAccordion, { ItemChildren });