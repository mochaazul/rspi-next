import { colors } from '@/constant';
import { GlobalCardShadow } from '@/constant/globalstyle';
import styled from 'styled-components';

export const WrapperFacilitiesServices = styled.div`
  .desc {
    & > .see-all {
      color: ${ colors.paradiso.default };
    }
  }

  .img-shadow {
    ${ GlobalCardShadow }
    border-radius: 10px;
    @media not all and (min-width: 640px) {
      border-radius: 0;
    }
  }

  .accordion-img {
    @media not all and (min-width: 640px) {
      overflow: hidden;
      border-radius: 10px;
      border: 1px solid ${ colors.grey.lighter };
    }
  }
`;