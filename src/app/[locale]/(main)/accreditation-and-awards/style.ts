'use client';

import styled from 'styled-components';

import { colors } from '@/constant';
import { GlobalCardShadow } from '@/constant/globalstyle';

export const CentreOfExcellenceStyle = styled.div`
  background-color: ${ colors.white.body };

  .image-cont {
    ${ GlobalCardShadow }
    background-color: ${ colors.white.default };
    height: 232px;
    padding: 30px;
    > img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
`;