import styled from 'styled-components';

const RegisterPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;

  .register {
    border: 3px solid var(--color-blue-100);
    border-radius: 15px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }
  .mb-30 {
    margin-bottom: 30px;
  }
  .group-wrapper {
  }
`;

export default RegisterPageStyle;
