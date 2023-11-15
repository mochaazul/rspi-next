import { colors } from '@/constant';
import styled from 'styled-components';

export const CalendarContainer = styled.div`
  .react-calendar__navigation{
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    margin-bottom: 8px;
  }
  // .react-calendar__tile--now {
  //   background-color: ${ colors.green.brandAccent };
  //   border-radius: 50%;
  //   color: white;
  // }
  .react-calendar__tile abbr {
    display: none;
  }
  .react-calendar__tile--active{
    background-color: ${ colors.green.brandAccent };
    border-radius: 50%;
    color: white;
    p{
      color: white;
    }
  }
  .react-calendar__month-view__days__day--neighboringMonth{
    color: #D4D2D8;
  }
  .react-calendar__navigation__arrow{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .react-calendar__tile{
    padding: 10px;
    height: 44px;
    width: 44px;
    abbr{
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
  }

  .react-calendar__month-view__weekdays{
    
    .react-calendar__month-view__weekdays__weekday{
      padding: 10px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      abbr{
        font-weight: 700;
        text-decoration: none;
      }
    }
  }
`;

export const CalendarLoading = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  backdrop-filter: grayscale(1);
  background-color: rgba(255,255,255,0.5);
`;

export const CalendarFooter = styled.div`
  display: flex;
  padding: 16px 24px;
  border-top: 1px solid #F0F2F9;
  justify-content: space-around;
  align-items: center;
`;

export const CalendarFooterInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

type CalendarDotProps = {
	type?: 'primary' | 'warning' | 'dark';
};

export const CalendarDot = styled.div<CalendarDotProps>`
  display: block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: #000;

  ${ props => props.type === 'primary' && `background-color: ${ colors.green.brandAccent };` }
  ${ props => props.type === 'warning' && `background-color: ${ colors.yellow.warning };` }


`;