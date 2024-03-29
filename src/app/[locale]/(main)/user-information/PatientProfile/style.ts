import styled from 'styled-components';

import { colors } from '@/constant';

const ProfilePageStyle = styled.div`
  .card-shadow {
    box-shadow: 5px 5px 10px 0px rgba(53, 136, 136, 0.12);
    border-radius: 10px;
  }

  .user-panel {
    border-radius: 10px;
    margin-top: 30px;
    .flex-1 > div:first-child {
      margin-bottom: 10px;
    }
    .upload-mask {
      opacity: 0;
      background-color: ${ colors.grey.uploadHoverColor };
      transition: opacity .2s;
      
      &:hover {
        opacity: 1;
        transition: opacity .2s;
      }
    }
  }
`;

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

export const Divider = styled.div`
  border-top-width: 1px;
  border-color: ${ colors.grey.lighter };
  margin: 25px 0;
  @media screen and (max-width: 640px) {
    margin: 16px 0;
  }
`;

export default ProfilePageStyle;