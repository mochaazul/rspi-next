import { colors } from '@/constant';
import styled from 'styled-components';

export const ComboboxWrapper = styled.div`
  outline: 1px solid ${ colors.grey.lighterOpacity };
  border-radius: 5px;
  min-height: 48px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;

  &:focus-within {
    outline: 1px solid ${ colors.green.brandAccent };
  } 

  input{
    font-family: var(--font-family);
    font-size: 16px;
    &:focus{
      outline: none;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  
  svg.svg-darkgrey circle,
  svg.svg-darkgrey path {
    stroke: ${ colors.grey.darkOpacity };
  }
`;

export const ClearWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 16px;
  background-color: ${ colors.grey.light };
  padding: 4px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  cursor: pointer;
  

`;