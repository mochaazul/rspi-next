import { colors } from '@/constant';
import styled from 'styled-components';

export const TabContainerStyle = styled.div`
  position: relative;
  .backdrop {
    position: fixed;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${ colors.black.default };
    visibility: hidden;
    opacity: 0;
    transition: all .3s;

    &.active {
      visibility: visible;
      opacity: .6;
      transition: all .3s;
    }
  }
`;

export const TabsStyle = styled.div`
  box-shadow: 10px 10px 10px 0px rgba(53, 136, 136, 0.12);
  max-width: 1400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  background: ${ colors.white.default };
  top: -57px;
  position: relative;
  z-index: 0;

  &.active {
    z-index: 1100;
  }

  @media screen and (max-width: 640px) {
    top: 0px;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(53, 136, 136, 0.25);
  }
`;
