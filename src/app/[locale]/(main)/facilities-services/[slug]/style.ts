'use client';

import styled from 'styled-components';

import { colors } from '@/constant';

export const FacilitiesServiceStyle = styled.div`
  .content-wrapper {
    display: flex;
  }

  .cardMenu {
    background: #FAFAFA;
    border: 1px solid ${ colors.grey.light };
    border-radius: 5px;
    width: 100%;
    
    @media (min-width: 768px) {
      max-width: 349px;
    }

    @media (min-width: 1024px) {
      width: 349px;
    }
  }

  .related {
    width: fit-content;
    border-bottom: 4px solid ${ colors.paradiso.default }
  }
`;