import styled from 'styled-components';

export const FloatingWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 9;
`;

export const FloatingContainer = styled.div`
  position: relative;
  box-shadow: 3px -5px 10px 0px rgba(0, 0, 0, 0.12);
  border-radius: 10px 10px 0px 0px;
  background-color: white;
`;

export const BgContainer = styled.div`
  position: absolute;
  z-index: 0;
`;

export const BodyContainer = styled.div`
  z-index: 1;
  padding: 15px;

  @media (min-width: 780px) {
    padding: 20px;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  gap: 4px;
`;
