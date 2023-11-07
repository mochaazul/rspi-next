import styled from 'styled-components';

import { colors } from '@/constant';

export const NewsHealthArticlesStyle = styled.div`
  margin: 0 0 100px;

  .magazine {
    perspective: 1000px;
    :hover{
    transition: all .5s;
    background-color: ${ colors.paradiso.accent1Opacity5 };
    }
    img {
      width: 540px;
      height: 318px;
      object-fit: cover;
    }
  }

  @media not all and (min-width: 640px) {
    margin: 0 0 32px;
  }
`;

export const CardNewsStyle = styled.div`
  perspective: 1000px;
  background-color: ${ colors.white.default };
  
  > div {
    @media screen and (min-width: 640px) {
      border-left: 6px solid transparent;
      transition: all .5s;
  
      &.active, &:hover {
        transition: all .5s;
        border-left-color: ${ colors.paradiso.default };
        border-top: 1px solid ${ colors.paradiso.accent1Opacity5 };
        border-bottom: 1px solid ${ colors.paradiso.accent1Opacity5 };
        background-color: ${ colors.paradiso.accent1Opacity5 };
        padding-left: 10px;
  
        .map-title p {
          transition: all .5s;
          color: ${ colors.paradiso.default };
        }
      }
    }
  }
`;