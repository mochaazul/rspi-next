import styled from 'styled-components';

import { colors } from 'constant';

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