import { colors } from '@/constantsLegacy';
import { GlobalCardShadow } from '@/constantsLegacy/globalstyle';
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
  ${ GlobalCardShadow }
  width: 1360px;
  border-radius: 10px;
  background: ${ colors.white.default };
  top: -57px;
  position: relative;
  z-index: 0;
  padding-bottom: 30px;

  &.active {
    z-index: 1100;
  }

  @media screen and (max-width: 1390px) {
    width: 1290px;
  }
  @media screen and (max-width: 1330px) {
    width: 1100px;
  }
  @media screen and (max-width: 1160px) {
    width: 900px;
  }
  @media screen and (max-width: 850px) {
    width: 720px;
  }
  @media screen and (max-width: 720px) {
    width: 100%;
  }
`;
