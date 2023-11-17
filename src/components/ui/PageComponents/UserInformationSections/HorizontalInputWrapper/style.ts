import styled from 'styled-components';

import { colors } from '@/constant';

export const PopupInfoContainerStyle = styled.div`
  position: relative;
  &:hover .balloon-popup {
    visibility: visible;
    bottom: 20px;
    opacity: 1;
    transition: all .2s;
  }
`;

export const BalloonPopupStyle = styled.div`
  position: absolute;
  left: -22px;
  z-index: 1000;
  visibility: hidden;
  bottom: 10px;
  opacity: 0;
  transition: all .2s;

  &::before {
    content: ' ';
    padding: 8px;
    background-color: ${ colors.grey.darker };
    transform: rotate(45deg);
    position: absolute;
    bottom: -4px;
    left: 20px;
  }

  > div {
    background-color: ${ colors.grey.darker };
  }
`;