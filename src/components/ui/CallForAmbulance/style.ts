import styled from 'styled-components';

import { colors } from '@/constant';

export const CallForAmbulanceStyle = styled.div`
  z-index: 800;
  bottom: 10px;
  right: 30px;
  &:hover {
    transform: scale(1.2);
    transition: all .2s;
  }
  &:active {
    transform: scale(1);
    transition: all .1s;
  }

  @media not all and (min-width: 640px) {
    bottom: 30px;
    right: 15px;
  }
`;

export const ModalRSTelephoneStyle = styled.div`
  .icons-close {
    position: absolute;
    right: -30px;
    top: -30px;
    border-radius: 100%;
    padding: 5px;
    background-color: ${ colors.red.default };
    cursor: pointer;
    transition: all .2s;

    &:hover {
      transform: scale(1.2);
      transition: all .2s;
    }
    &:active {
      transform: scale(1);
      transition: all .2s;
    }

    @media not all and (min-width: 640px) {
      right: 0px;
      top: 0px;
    }
  }
`;