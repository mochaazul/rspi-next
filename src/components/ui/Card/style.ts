'use client';

import styled from 'styled-components';

import { GlobalBoxShadow } from '@/constant/globalstyle';
import { colors } from '@/constant';
import Link from 'next/link';

export interface CardStyleType {
  hoverHeight?: string;
}

export const CardWrapper = styled.div`
  perspective: 1000px;
  margin: 32px 0;
  width: 350px;

  @media screen and (max-width: 640px) {
    margin: 24px 0;
  }
`;

export const CardStyle = styled.div<CardStyleType>`
  position: relative;
  @keyframes zoom-in-enter {
    0% { 
      transform: translateZ(0); 
      transform-origin: center 0%;
    }
    100% { 
      transform: translateZ(${ props => props.hoverHeight ?? '18px' }); 
      transform-origin: center 100%;
    }
  }
  @keyframes zoom-in-out {
    0% { 
      transform: translateZ(${ props => props.hoverHeight ?? '18px' }); 
      transform-origin: center 100%;
    }
    50% {
      transform: rotateX(2deg) rotateY(.5deg) translateZ(5px);
      transform-origin: center 50%;
    }
    100% { 
      transform: translateZ(0); 
      transform-origin: center 0%;
    }
  }
  
  @keyframes click-in {
    0% { 
      transform: scale(1); 
      transform-origin: center 100%;
    }
    100% { 
      transform: scale(.99); 
      transform-origin: center 100%;
    }
  }

  background-color: ${ colors.white.default };
  border-radius: 10px;
  border: 1px solid ${ colors.grey.lighter };
  overflow: hidden;
  transition: all .3s;
  height: 100%;
  display: flex;
  flex-direction: column;

  animation-name: zoom-in-out;
  animation-duration: .1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  &:hover {
    transition: all .5s;
    ${ GlobalBoxShadow }
    animation-name: zoom-in-enter;
    animation-duration: .1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  &:active {
    animation-name: click-in;
    animation-duration: .1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
`;

export const CardHorizontalStyle = styled.div`
  overflow-x: auto;
  -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
  scrollbar-width: none;  /* Hide scrollbar for Firefox */

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari and Opera */
  }
`;

export const CardContentHTML = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${ colors.grey.dark };
  line-height: 28px;
`;