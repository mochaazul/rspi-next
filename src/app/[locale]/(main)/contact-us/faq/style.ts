import styled from 'styled-components';

import { colors } from '@/constant';
import { GlobalCardShadow } from '@/constant/globalstyle';

export const FAQStyle = styled.div`
  background-color: ${ colors.white.default };
  min-height: fit-content;
  .image-cont {
    ${ GlobalCardShadow }
    background-color: ${ colors.white.default };
    height: 232px;
    padding: 30px;
    > img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .item-desc a {
    color: ${ colors.blue.default };
    font-weight: 900;
  }
`;