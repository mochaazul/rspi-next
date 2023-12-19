import styled from 'styled-components';

import { colors } from '@/constant';

export const SliderNavContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 60%;
  padding: 0px 150px;
  

  @media only screen and (max-width: 768px) {
    padding: 0px 30px;
  }

  svg.svg-green path {
    stroke: ${ colors.paradiso.default };
  }
  
  svg.svg-white path {
    stroke: ${ colors.white.default };
  }

  .arrow-left,
  .arrow-right {
    background-color: ${ colors.grey.darkerOpacity50 };
    opacity: .5;
    transition: all .5s;
    &:hover {
      opacity: 1;
      transition: all .5s;
    }
    &:active {
      background-color: ${ colors.grey.darker };
      transition: all .5s;
    }
  }
`;

export const ArrowContainer = styled.div`
  background-color: rgba(42, 37, 54, 0.50);
  display: flex;
  align-items: center;
  opacity: 30%;

  :hover{
    opacity: 100%;
  }
  transition: all 100ms;
`;