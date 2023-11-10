import styled from 'styled-components';

import { colors } from '@/constantsLegacy';

export const WrapperCentreOfExcellence = styled.div`
  .slider-title {
    & > .see-all {
      color: ${ colors.paradiso.default };
    }
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