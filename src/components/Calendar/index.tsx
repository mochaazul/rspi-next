import ReactCalendar from 'react-calendar';
import {
	CalendarContainer, CalendarDot, CalendarFooter, CalendarFooterInfoItem, CalendarLoading,
} from './style';
import { colors, icons, Languages as lang } from '@/constant';
import Text from '@/components/Text';
import { useEffect, useState } from 'react';
import { TileArgs, TileClassNameFunc, TileDisabledFunc, Value } from 'react-calendar/dist/cjs/shared/types';
import { useTypedSelector } from '@/hooks';
import { FindDoctorState } from '@/interface';
import dayjs, { UnitType } from 'dayjs';
import languages from '@/constant/languages';
import Spinner from '@/components/Spinner';

type Props = {
	onChange: (value: Value) => void;
	onChangeMonth: (month: number, year: number) => void;
	loading?: boolean;
	value?: Date;
};

const Calendar = ({ onChange: onClickDay, value, onChangeMonth, loading }: Props) => {
	const { doctorCalendar } = useTypedSelector<FindDoctorState>('findDoctor');

	const renderTile = ({ activeStartDate, date, view }: TileArgs) => {
		const formatedDate = dayjs(date).format('YYYY-MM-DD');

		const calendarItem = doctorCalendar?.find(calendar => calendar.date_schedule === formatedDate && calendar.status !== 'Slot not available');
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
	const isFoundOnCalendar = (date: Date) => doctorCalendar?.find(calendar => calendar.date_schedule === dayjs(date).format('YYYY-MM-DD'));

	const disabledTile = ({ activeStartDate, date, view }: TileArgs) => isBeforeDate(date);
	const language = lang.page.doctorProfile;
	// max-sm:w-[44px] max-sm:h-[46px]
	const mapTileClassName: TileClassNameFunc = ({ activeStartDate, date, view }) => {
		const shouldDisbled = !isFoundOnCalendar(date);
		// max-[320px]:h-[34px] max-[320px]:w-[41px]
		// max-[375px]:h-[42px] max-[375px]:w-[40px]
		// max-sm:h-[48px] max-sm:w-[44px]
		// max-h-[40px] max-w-[40px]
		const defaultClass = `
		
		`;
		return shouldDisbled ?
			`
			${ defaultClass }
			pointer-events-none flex items-center justify-center
			` :
			`${ defaultClass } 
			flex items-center justify-center`;
	};

	return <CalendarContainer>
		<div className='px-[12px] py-[20px] relative'>
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
				<Text text={ language.available } fontSize='12px' fontWeight='500' color={ colors.green.brandAccent } />
			</CalendarFooterInfoItem>
			<CalendarFooterInfoItem>
				<CalendarDot type='warning' />
				<Text text={ language.limitedSlot } fontSize='12px' fontWeight='500' color={ colors.yellow.warning } />
			</CalendarFooterInfoItem>
			<CalendarFooterInfoItem>
				<CalendarDot />
				<Text text={ language.noSchedule } fontSize='12px' fontWeight='500' />
			</CalendarFooterInfoItem>
		</CalendarFooter>
	</CalendarContainer>;
};

export default Calendar;