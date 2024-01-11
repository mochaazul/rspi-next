'use client';
import styled from 'styled-components';

import { colors } from '@/constant';

export const ItemCont = styled.div`
  transition: all .3s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  user-select: none;
  background-color: ${ colors.paradiso.opacity10 };
  & p {
    transition: all .3s;
    color: ${ colors.paradiso.default };
  }

  &.active {
    background-color: ${ colors.paradiso.default };
    & p {
      color: ${ colors.white.default };
    }
  }
  
  .svg-white path {
    fill: ${ colors.white.default };
  }

  &:hover {
    background-color: ${ colors.paradiso.default };
    & p {
      transition: all .3s;
      color: ${ colors.white.default };
    }
  }

  &:active:not(.active) {
    background-color: ${ colors.paradiso.opacity10 };
    & p {
      color: ${ colors.paradiso.default };
    }
  }

  &.arrow {
    background-color: ${ colors.grey.darker };
    &.disabled {
      background-color: ${ colors.grey.light };
      &:hover {
        filter: brightness(1);
      }
    }
    &:hover {
      filter: brightness(2);
    }
    &:active {
      background-color: ${ colors.grey.darkerOpacity50 };
    }
  }
`;

export const Spacer = styled.div`
  padding-top: .75rem;
  user-select: none;
`;