import { colors } from '@/constant';
import styled from 'styled-components';

type PillProps = {
	checked: boolean;
};

export const RadioPill = styled.div<PillProps>`
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: 2px solid ${ props => props.checked ? colors.green.brandAccent : colors.grey.dark };
  box-sizing: border-box;
  border-radius: 50%;
  box-shadow: inset 0px 0px 0px 4px #fff;
  background-color: ${ props => props.checked ? colors.green.brandAccent : '#fff' };
  transition: all 200ms;
`;

export const RadioOptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  p{
    cursor: pointer;
  }
`;

export const RadioGroupContainer = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;