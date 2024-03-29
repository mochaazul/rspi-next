import styled from 'styled-components';

import { colors } from '@/constant';
import { GlobalAllTransition5ms, GlobalBoxShadow } from '@/constant/globalstyle';

interface StatusType {
  $isOpen: boolean;
  $topOffset?: number;
  disabled?: boolean;
}

export const SelectWrapper = styled.div<StatusType>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 36px 12px 0px;
  border-radius: 5px;
  outline: 1px solid ${ props => props.$isOpen ? colors.green.brandAccent : colors.grey.lighter };
  min-height: 48px;
  ${ props => props.disabled
    ? `
    background-color: ${ colors.grey.lighterOpacity };
    color: ${ colors.grey.darkOpacity };
  `
    : `background-color: ${ colors.white.default }` };
  cursor: ${ props => props.disabled ? 'default' : 'pointer' };

  .arrow-down {
    position: absolute;
    right: 10px;
    margin-top: 5px;
    transform: rotate(${ props => props.$isOpen ? '180deg' : '0deg' });
    transform-origin: 50% 42%;
    ${ GlobalAllTransition5ms }
  }

  .svg-darkgrey {
    color: ${ colors.grey.darkOpacity };
  }

  .placeholder {
    position: absolute;
    padding: 0 28px 0 18px;
    user-select: none;
    width: 100%;
  }
`;

export const SelectStyled = styled.select`
  display: none;
  width: 100%;
  font-family: var(--font-family);
  appearance: none;
  ${ GlobalAllTransition5ms }
`;

export const OptionsWrapper = styled.div<StatusType>`
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  display: ${ props => props.$isOpen ? 'block' : 'none' };
  position: absolute;
  width: 100%;
  top: calc(${ props => props.$topOffset }px + 2px);
  background-color: ${ colors.white.default };
  border-radius: 10px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 200;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  cursor: pointer;
  font-size: 16px;
  line-height: normal;
  ${ GlobalAllTransition5ms };
  
  .multiple-checkbox {
    border: 1px solid ${ colors.paradiso.default };
    border-radius: 4px;
    width: 18px;
    height: 18px;

    &.checked {
      background-color: ${ colors.paradiso.default };
    }
  }

  &:hover {
    background-color: ${ colors.paradiso.opacity10 };
    ${ GlobalAllTransition5ms }
  }
`;

export const DialogCloser = styled.div<StatusType>`
  display: ${ props => props.$isOpen ? 'block' : 'none' };
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 0, 0, 0);
`;