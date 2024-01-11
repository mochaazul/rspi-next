'use client';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  .bold {
    font-weight: 600;
  }
  .visitor-items {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .icons {
    display: flex;
    justify-content: space-between;
    align-items:center;
  }
  .ambulance-icon {
    display: none;
  }
  .store-images-container {
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    gap: 16px;
  }
  .store-images {
    width: 7em;
  }
  .follow-section {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .follow-icon-section {
    min-width: 9em;
  }
  .input {
    border-radius: 5px 0px 0px 5px;
    border: 1px solid #F0F2F9;
    min-width: 0 !important;
  }
  .sub-button {
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 5px 5px 0px;
    width: fit-content;

    &, > .bg-overlay,
    &:hover > .bg-overlay {
      border-radius: 0px 5px 5px 0px;
    }
  }
  .flex {
    display:flex;
  }
  .justify-center{
    justify-content:center;
  }
  .py-1 {
    padding-top: 1em;
    padding-bottom: 1em;
  }
  @media (min-width: 1000px) {
    .visitor-items {
      flex-direction: row;
    }
    .sub-text {
      max-width: 20vw;
    }
    .ambulance-icon {
      display: flex;
    }
    .follow-section {
      display:block;
      width:initial;
    }
    .follow-icon-section {
      padding-top: 0;
    }
  }

  @media (min-width: 1440px) {
    .input {
      min-width: 20em;
    }
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 24px;
`;
export default FooterStyled;
