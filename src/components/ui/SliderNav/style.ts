import styled from 'styled-components';

export const SliderNavContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 60%;
  padding: 0px 150px;
  

  @media only screen and (max-width: 768px) {
    padding: 0px 30px;
  }
`;

export const ArrowContainer = styled.div`
  background-color: rgba(42, 37, 54, 0.50);
  display: flex;
  align-items: center;
  opacity: 30%;

  :hover{
    opacity: 100%;
  }
  transition: all 100ms;
`;