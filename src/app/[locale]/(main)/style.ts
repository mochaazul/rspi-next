'use client';
import styled from 'styled-components';

import { colors } from '@/constant';

export const LandingPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${ colors.white.body };

  .login {
    border: 3px solid var(--color-blue-100);
    padding: 30px;
    border-radius: 15px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }
  .mb-30 {
    margin-bottom: 30px;
  }
  .group-wrapper {
    min-height: 75px;
  }
`;

export const Panel = styled.div`
  border-radius: 5px;
  border: 1px solid ${ colors.grey.pencil };
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export default LandingPageStyle;

export interface OutletStyleType {
  BGGrey?: boolean;
}

export const OutletStyle = styled.div<OutletStyleType>`
  margin-top: 100px;
  background-color: ${ props => props.BGGrey ? colors.white.body : colors.white.default };
`;

export const PanelH1 = styled.div`
  margin: 0 165px;

  @media not all and (min-width: 640px) {
    margin: 0 16px;
  }
`;

export const PanelH2 = styled.div`
  margin: 0 100px;

  @media not all and (min-width: 640px) {
    margin: 0 16px;
  }
`;

export const PanelH3 = styled.div`
  margin: 0 260px;

  @media not all and (min-width: 640px) {
    margin: 0 16px;
  }
`;

export const PanelH4 = styled.div`
  margin: 0 315px;

  @media not all and (min-width: 1367px) {
    margin: 0 160px;
  }
  
  @media not all and (min-width: 768px) {
    margin: 0 80px;
  }

  @media not all and (min-width: 640px) {
    margin: 0 16px;
  }
`;

export const PanelV1 = styled.div`
  padding-top: 60px;
  
  @media not all and (min-width: 640px) {
    padding-top: 0px;
  }
`;
