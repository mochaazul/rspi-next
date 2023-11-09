'use client';
import styled from 'styled-components';

import { colors } from '@/constants';

const LandingPageStyle = styled.div`
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
