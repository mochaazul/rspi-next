import { colors } from '@/constant';
import { GlobalCardShadow2 } from '@/constant/globalstyle';
import styled from 'styled-components';

export const AccreditationsAwardsWrapper = styled.div`
  .card-shadow {
    transition: all .3s;

    .image {
      margin-bottom: 24px;
      img {
        filter: drop-shadow(10px 10px 10px rgba(53, 136, 136, 0.12));
      }
    }

    .desc-mobile {
      display: none;
    }

    .list-disc {
      display: block;
    }

    &:hover {
      background-color: ${ colors.white.default };
      ${ GlobalCardShadow2 }
      transition: all .3s;
    }
    
    @media not all and (min-width: 640px) {
      .desc-mobile {
        display: block;
      }

      .list-disc {
        display: none;
      }

      .image > img {
        width: 80px;
        height: 80px;
        object-fit: contain;
        margin: auto;
        object-position: center;
      }
    }
  }

  .image > img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    margin: auto;
    object-position: center;
  }
`;