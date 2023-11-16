import styled from 'styled-components';

import { colors } from '@/constant';

export const SpinContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${ colors.white.bodyVerifEmail };

  .status-cont {
    position: relative;
    width: 160px;
    height: 160px;
  }

  .status {
    border-radius: 50%;
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1;
    transform: scale(0);
    transition: all .3s;
    
    &.active {
      transform: scale(1);
      transition: all .3s cubic-bezier(.62, .14, .53, 1.65);
    }

    &.success {
      background-color: ${ colors.paradiso.default };
    }
    
    &.failed {
      background-color: ${ colors.red.redder };
    }

    &:not(.loading)::before {
      content: ' ';
      display: block;
      background-color: ${ colors.paradiso.opacity10 };
      border-radius: 50%;
      position: absolute;
      z-index: -1;
      margin: auto;
      top: -20px;
      bottom: -20px;
      left: -20px;
      right: -20px;
    }

    .icon-cont > svg {
      width: 100px;
      height: 100px;
    }
  }

  .desc-cont {
    width: 50vw;
    height: 50px;
    position: relative;
    overflow: hidden;
    & > div {
      transform: translateY(-50px);
      opacity: 0;
      transition: all .3s;
      width: 100%;
      position: absolute;
      &.active {
        transform: translateY(0px);
        opacity: 1;
        transition: all .3s;
      }
    }
  }

  .back-login {
    margin-top: 16px;
  }

  .svg-white path {
    fill: ${ colors.white.default };
  }
`;