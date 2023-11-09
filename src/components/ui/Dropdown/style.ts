import { colors } from '@/constants';
import { GlobalAllTransition5ms, GlobalBoxShadow } from '@/constants/globalstyle';
import styled from 'styled-components';

interface StatusType {
  isOpen: boolean;
  topOffset?: number;
}

export const SelectWrapper = styled.div<StatusType>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 36px 12px 0px;
  border-radius: 5px;
  outline: 1px solid ${ colors.grey.lighter };
  min-height: 43px;
  background-color: ${ colors.white.default };
  cursor: pointer;
  
  .arrow-down {
    position: absolute;
    right: 10px;
    margin-top: 5px;
    transform: rotate(${ props => props.isOpen ? '180deg' : '0deg' });
    transform-origin: 50% 42%;
    z-index: 100;
    ${ GlobalAllTransition5ms }
  }

  .placeholder {
    position: absolute;
    z-index: 99;
    background-color: white;
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

  &:focus {
    outline: 1px solid ${ colors.green.toscaLight };
  }
`;

export const OptionsWrapper = styled.div<StatusType>`
  ${ GlobalBoxShadow }
  display: ${ props => props.isOpen ? 'block' : 'none' };
  position: absolute;
  width: 100%;
  top: calc(${ props => props.topOffset }px + 2px);
  background-color: ${ colors.white.default };
  border-radius: 5px;
  border: 1px solid ${ colors.grey.lighter };
  max-height: 500px;
  overflow-y: auto;
  z-index: 200;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
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
    background-color: ${ colors.paradiso.light };
    ${ GlobalAllTransition5ms }
  }
`;

export const DialogCloser = styled.div<StatusType>`
  display: ${ props => props.isOpen ? 'block' : 'none' };
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 0, 0, 0);
`;