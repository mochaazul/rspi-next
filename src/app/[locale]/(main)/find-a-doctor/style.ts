import styled from 'styled-components';

import { colors } from '@/constant';
import { GlobalCardShadow } from '@/constant/globalstyle';

const FindADoctorPageStyle = styled.div`
  display: flex;
  flex-direction: row;

  .card-shadow {
    ${ GlobalCardShadow };
  }

  .filter-pane {
    width: 290px;
    padding: 0 24px 0;

    @media not all and (min-width: 640px){
      width: 100%;
      padding: 0;
    }
  }

  .doctors-pane {
    flex: 1;
    border-left: 1px solid ${ colors.grey.light };
    padding-left: 24px;
    margin-bottom: 50px;
    width: 100%;

    .filter-pill {
      border-right: 1px solid ${ colors.grey.light };
      padding-right: 8px;

      > div {
        display: flex;
        flex-direction: row;
        padding: 2px 12px;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        background-color: ${ colors.paradiso.opacity10 };
        border-radius: 8px;
        width: 84px;
        height: 33px;
      }
    }
  }

  .x-spacer {
    border-bottom: 1px solid ${ colors.grey.light };
  }
`;

export default FindADoctorPageStyle;