import { colors } from '@/constant';
import { GlobalAllTransition200ms } from '@/constant/globalstyle';
import styled from 'styled-components';

export const MedicalSpecialitiesItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;

  .specialities-item-container {
    border: 1px solid ${ colors.grey.lighter };
    border-radius: 10px;
    cursor: pointer;
    background-color: white;
  
    &:hover {
      border: 1px solid ${ colors.green.brandAccent };
      box-shadow: 10px 10px 10px 0px rgba(230, 246, 244, 0.50);
      border-radius: 10px;
    }
  }

  .specialities-item{
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20px;
    min-height: 96px;
    cursor: pointer;
    border-radius: 10px;
  }
`;