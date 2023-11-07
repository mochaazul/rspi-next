import { colors } from '@/constant';
import styled from 'styled-components';

type PillProps = {
	active: boolean;
};

export const TimeSlotPill = styled.button<PillProps>`
  background-color: ${ colors.grey.lighterOpacity };
  ${ props => props.active && `
  background-color: ${ colors.green.brandAccent };
  `}
  
`;

export const EmptyWarningContainer = styled.div`
  color: rgba(220, 104, 3, 1);
  background-color: rgba(254, 240, 199, 1);
  padding: 25px;
`;
