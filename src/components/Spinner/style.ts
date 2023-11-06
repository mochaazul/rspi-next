import styled from 'styled-components';

import { colors } from 'constant';

export interface SpinnerStyleProps {
  size: number;
  borderWidth: number;
}

export const SpinnerStyle = styled.div<SpinnerStyleProps>`
  width: ${ props => `${ props.size }px` };
  height: ${ props => `${ props.size }px` };
  margin: auto;
  position: relative;
  border-radius: 50%;
  z-index: 1;
  
  &::before {
    content: ' ';
    display: block;
    border-radius: inherit;
    background: conic-gradient(${ colors.paradiso.default } 0deg 280deg, transparent 281deg 360deg);
    position: absolute;
    z-index: -1;
    margin: auto;
    top: ${ props => `-${ props.borderWidth }px` };
    bottom: ${ props => `-${ props.borderWidth }px` };
    left: ${ props => `-${ props.borderWidth }px` };
    right: ${ props => `-${ props.borderWidth }px` };
    animation: circle-anim 1s linear infinite;
  }

  &::after {
    content: ' ';
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${ colors.white.bodyVerifEmail };
    border-radius: 50%;
  }

  @keyframes circle-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;