import styled from 'styled-components';

import { colors } from '@/constant';

export const NewsHealthArticlesStyle = styled.div`
  margin: 0 0 100px;

  .magazine {
    perspective: 1000px;
    .img-thumbnail-magazine {
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
  z-index:-999;
  perspective: 1000px;
  background-color: ${ colors.white.default };
  
  > div {
    @media screen and (min-width: 640px) {
      transition: all .5s;
      border-top: 1px solid transparent;
      border-bottom: 1px solid #EAEAEA;
      margin-bottom:30px;
      padding-bottom:30px;
      
      &.active, &:hover {
        transition: all .5s;
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