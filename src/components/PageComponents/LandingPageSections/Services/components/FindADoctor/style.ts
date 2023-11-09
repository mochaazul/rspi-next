import styled from 'styled-components';

const FindDoctorStyle = styled.div`
  .form-wrapper {
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    display: flex;
  }

  @media screen and (max-width: 1390px) {
    .form-wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media screen and (max-width: 1160px) {
    .form-wrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 720px) {
    .form-wrapper {
      grid-template-columns: 1fr;
    }
    .input {
      min-width: 300px;
    }
  }
`;

export default FindDoctorStyle;
