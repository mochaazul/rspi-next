import { GlobalAllTransition200ms } from '@/constant/globalstyle';
import styled from 'styled-components';

export const MedicalSpecialitiesItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;

  .specialities-item{
    border: 1px solid #F0F2F9;
    border-radius: 10px;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20px;
    min-height: 96px;

    cursor: pointer;

    :hover{
      background-color: rgba(53, 136, 136, 0.2);  
    ${ GlobalAllTransition200ms }
    }
    ${ GlobalAllTransition200ms }

  }
`;