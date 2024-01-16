import ReactCalendar, { TileArgs, TileClassNameFunc } from 'react-calendar';
import dayjs, { UnitType } from 'dayjs';

import { colors, icons } from '@/constant';
import { DoctorCalendar } from '@/interface';
import Spinner from '@/components/ui/Spinner';
import { useScopedI18n } from '@/locales/client';

import {
	CalendarContainer, CalendarDot, CalendarFooter, CalendarFooterInfoItem, CalendarLoading,
} from './style';
import { Text } from '..';

type Props = {
	onChange: (value: any) => void;
	onChangeMonth: (month: number, year: number) => void;
	loading?: boolean;
	value?: Date;
	calendarData: DoctorCalendar[];
	disable: boolean;
};

const Calendar = ({ onChange: onClickDay, value, onChangeMonth, loading, calendarData, disable = false }: Props) => {
	const t = useScopedI18n('page.doctorProfile');

	const renderTile = ({ activeStartDate, date, view }: TileArgs) => {
		const formattedDate = dayjs(date).format('YYYY-MM-DD');

		const calendarItem = calendarData?.find((calendar: any) => calendar.date_schedule === formattedDate && calendar.status !== 'Slot not available');
		const isDisabled = disabledTile({ activeStartDate, date, view });

		const calendarDateColor = (type: string) => {
			switch (type) {
				case 'Available':
					return colors.green.brandAccent;
				case 'Slot not available':
					return colors.black.opacity64;
				case 'Limited':
					return colors.yellow.warning;
				default:
					return colors.yellow.warning;
			}
		};

		const calendarNum = calendarItem
			? <Text
				text={ date.getDate() }
				textAlign='center'
				fontSize='14px'
				fontWeight='700'
				lineHeight='20px'
				color={ isDisabled ? '#D4D2D8' : calendarDateColor(calendarItem.status) } />
			: <Text
				text={ date.getDate() }
				textAlign='center'
				fontSize='14px'
				fontWeight='400'
				lineHeight='20px'
				color={ isDisabled ? '#D4D2D8' : '#000' }
			/>;
		return <div className='calendar-item-label'>
			{ calendarNum }
		</div>;
	};

	const isBeforeDate = (date: Date, unit: UnitType = 'D') => dayjs(date).isBefore(dayjs(), unit);
	const isFoundOnCalendar = (date: Date) => calendarData?.find((calendar: any) => calendar.date_schedule === dayjs(date).format('YYYY-MM-DD'));

	const disabledTile = ({ activeStartDate, date, view }: TileArgs) => isBeforeDate(date) || disable;
	// max-sm:w-[44px] max-sm:h-[46px]
	const mapTileClassName: TileClassNameFunc = ({ activeStartDate, date, view }) => {
		const shouldDisbled = !isFoundOnCalendar(date);
		// max-[320px]:h-[34px] max-[320px]:w-[41px]
		// max-[375px]:h-[42px] max-[375px]:w-[40px]
		// max-sm:h-[48px] max-sm:w-[44px]
		// max-h-[40px] max-w-[40px]
		const defaultClass = `
		max-[320px]:h-[34px] max-[320px]:w-[41px]
		max-[360px]:h-[40px] max-[360px]:w-[40px]
		max-[375px]:h-[42px] max-[375px]:w-[40px]
		max-[393px]:h-[42px] max-[393px]:w-[42px]
		max-[414px]:h-[46px] max-[414px]:w-[46px]
		max-sm:h-[48px] max-sm:w-[44px]`;
		return shouldDisbled ?
			`
			${ defaultClass }
			pointer-events-none flex items-center justify-center
			` :
			`${ defaultClass } 
			flex items-center justify-center`;
	};

	return <CalendarContainer>
		<div className='px-[12px] mt-[10px] py-[4px] md:py[20px] relative'>
			<ReactCalendar
				className='r-calendar'
				nextLabel={ <icons.ArrowRight /> }
				prevLabel={ <icons.ArrowLeft /> }
				next2Label={ null }
				prev2Label={ null }
				defaultView='month'
				value={ value }
				onChange={ onClickDay }
				showNeighboringMonth={ false }
				tileContent={ renderTile }
				onClickMonth={ onClickDay }
				tileClassName={ mapTileClassName }
				onActiveStartDateChange={ ({ action, activeStartDate, value, view }) => {
					onChangeMonth(dayjs(activeStartDate).get('month') + 1, dayjs(activeStartDate).get('year'));
				} }
				tileDisabled={ disabledTile }
			/>
			{
				loading && <CalendarLoading>
					<Spinner />
				</CalendarLoading>
			}
		</div>
		<CalendarFooter className='max-sm:flex-wrap items-start'>
			<CalendarFooterInfoItem>
				<CalendarDot type='primary' />
				<Text text={ t('available') } fontSize='12px' fontWeight='500' color={ colors.green.brandAccent } />
			</CalendarFooterInfoItem>
			<CalendarFooterInfoItem>
				<CalendarDot type='warning' />
				<Text text={ t('limitedSlot') } fontSize='12px' fontWeight='500' color={ colors.yellow.warning } />
			</CalendarFooterInfoItem>
			<CalendarFooterInfoItem>
				<CalendarDot />
				<Text text={ t('noSchedule') } fontSize='12px' fontWeight='500' />
			</CalendarFooterInfoItem>
		</CalendarFooter>
	</CalendarContainer>;
};

export default Calendar;