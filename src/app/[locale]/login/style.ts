'use client';

import styled from 'styled-components';

const LandingPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;

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

export default LandingPageStyle;
