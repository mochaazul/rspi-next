import { colors } from '@/constant';
import { GlobalCardShadow2 } from '@/constant/globalstyle';
import styled from 'styled-components';

export const AccreditationsAwardsWrapper = styled.div`
  .card-shadow {
    transition: all .3s;

    .image {
      margin: 24px 0;
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
      margin: 12px 50px;
      padding: 24px;
      transition: all .3s;
      ${ GlobalCardShadow2 }

      .desc-mobile {
        display: block;
      }

      .list-disc {
        display: none;
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