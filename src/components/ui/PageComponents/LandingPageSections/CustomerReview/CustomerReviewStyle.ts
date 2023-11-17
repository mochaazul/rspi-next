import { colors } from '@/constant';
import { GlobalCardShadow2 } from '@/constant/globalstyle';
import images from '@/constant/images';
import styled from 'styled-components';

export const CustomerReviewStyle = styled.div`
  background-image: url(${ images.CustomerReviewBg.src });
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  width: 100%;
  margin-top: 80px;
  padding: 100px 0 80px;
  position: relative;

  @media not all and (min-width: 640px) {
    padding: 42px 0 24px;
  }

  .indicator-cont {
    perspective: 100px;
    
    .btn-indicator {
      transition: all .3s;
      background-color: ${ colors.paradiso.default };
      width: 44px;
      height: 44px;
      cursor: pointer;
      user-select: none; /* Standard syntax */
  
      &:hover {
        transition: all .3s;
        transform: translateZ(10px);
        ${ GlobalCardShadow2 }
      }
  
      &:active {
        opacity: .5;
        transform: translateZ(0px);
        transition: all .1s;
      }
    }
  }

  .balloon-container {
    -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
    scrollbar-width: none;  /* Hide scrollbar for Firefox */

    &::-webkit-scrollbar {
      display: none; /* Hide scrollbar for Chrome, Safari and Opera */
    }

    &>div {
      perspective: 100px;
      padding: 10px;
      &>div {
        transition: all .5s;
      }
      &:hover {
        &>div {
          transform: translateZ(3px);
          transition: all .5s;
        }
      }
    }
  }
`;

export const BalloonItemStyle = styled.div`
  position: relative;
  height: 100%;
  &::before {
    content: ' ';
    padding: 10px;
    background-color: ${ colors.white.default };
    border-radius: 5px;
    transform: rotate(45deg);
    position: absolute;
    bottom: -9px;
    left: 50%;
    right: 50%;
  }
`;