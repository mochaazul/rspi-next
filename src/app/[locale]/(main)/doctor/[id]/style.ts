import { colors } from '@/constant';
import styled from 'styled-components';

export const DoctorProfileStyle = styled.div`
	background-color: #FAFAFA;
	padding-top: 1px;
	
  .content-wrapper {
    width: fit-content;
    padding: 30px 30px 58px 30px;
    border-radius: 10px;
    background: var(--pure-white, #FFF);
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.05);

    li {
      line-height: 21px;
    }
  }
  .subtitle {
    font-size: 20px;
    font-weight: 700;
  }
  .related {
    width: fit-content;
    border-bottom: 2px solid ${ colors.paradiso.default }
  }
  .footer {
    position: fixed;
    display: flex;
    width: 100%;
    z-index: 999;
    bottom: 0;
    border-top: 1px solid ${ colors.grey.lighterOpacity };
  }
`;

export const VisitScheduleStyle = styled.div`

  .empty-state {
    background: ${ colors.red.accentOpacity90 };
    color: ${ colors.red.accent };
		padding: 25px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    span {
      font-weight: 700;
    }
  }
`;

export const TimeSlotContainer = styled.div`
  margin-top: 30px;
  gap: 30px;
  `;

export const TimeSlotCard = styled.div`
  border: 1px solid #F0F2F9;
  border-radius: 5px;
`;