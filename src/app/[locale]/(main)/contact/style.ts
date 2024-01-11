'use client';
import styled from 'styled-components';

import { colors } from '@/constant';
import { GlobalBoxShadow } from '@/constant/globalstyle';

export const ContactUsPanel = styled.div`
  .global-shadow {
    ${ GlobalBoxShadow }
  }
  .container__slider {
    background-color: ${ colors.white.default };
    z-index: 100;
    overflow: visible;
  }
  .container__slider__links {
    bottom: -40px;
    position: absolute;
    z-index: 100;
  }
  .faq-sections .item-desc a {
    color: #1155CC;
    text-decoration: underline !important;
  }
`;

export const SelectRSLocationStyle = styled.div`
  background-color: ${ colors.white.default };
  
  > div {
    @media screen and (min-width: 640px) {
      border-left: 6px solid transparent;
      transition: all .5s;
      border-top: 1px solid ${ colors.grey.lighter };
      border-bottom: 1px solid ${ colors.grey.lighter };
  
      .map-title p {
        transition: all .5s;
      }
      &.active, &:hover {
        transition: all .5s;
        border-left-color: ${ colors.paradiso.default };
        border-top: 1px solid ${ colors.paradiso.accent1Opacity5 };
        border-bottom: 1px solid ${ colors.paradiso.accent1Opacity5 };
        background-color: ${ colors.paradiso.accent1Opacity5 };
  
        .map-title p {
          transition: all .5s;
          color: ${ colors.paradiso.default };
        }
      }
    }
  }
`;