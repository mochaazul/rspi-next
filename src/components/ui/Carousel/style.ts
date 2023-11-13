import styled from 'styled-components';
import { colors } from '@/constant';

const CarouselWrapper = styled.div`
  .container__slider {
    width: 100%;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;

    > .children {
      width: 100%;
      overflow-x: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }
  
  .container__slider > button:active {
    color: black;
  }
  
  .slider__btn-next {
    position: absolute;
    right: 0;
  }
  
  .slider__btn-prev {
    position: absolute;
    left: 0;
  }
  
  .container__slider__links {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 60px;
    text-align: center;
    transform: translateY(-50%);
  }
  
  .container__slider__links-small {
    width: 9px;
    height: 9px;
    padding: 0;
    border-radius: 50%;
    outline: none;
    border: none;
    text-align: center;
    background-color: #60C3BD;
    transition: background-color 1s ease;
    margin: 0 0px 0 13px;
  }
  
  .container__slider__links-small-active {
    background-color: ${ colors.paradiso.default };
    width: 10px;
    height: 10px;
  }
  
  .slider__item {
    box-sizing: border-box;
    min-width: 100%;
    overflow: hidden;
    object-fit: cover;
    height: auto;
    transform: translateX(0);
    transition: transform 1s ease;
  }
  
  .slider__item-active-1 {
    transform: translateX(0);
  }
  
  .slider__item-active-2 {
    transform: translateX(-100%);
  }
  
  .slider__item-active-3 {
    transform: translateX(-200%);
  }
  
  .slider__item-active-4 {
    transform: translateX(-300%);
  }
  
  .slider__item-active-5 {
    transform: translateX(-300%);
  }
  
  .slider__item-active-6 {
    transform: translateX(-300%);
  }
  
  .slider__item-active-7 {
    transform: translateX(-300%);
  }
  
  .slider__item img {
    width: 100%;
    height: auto;
    @media screen and (max-width: 1024px) {
      height: 500px ;
      object-fit: cover;
    }
  }

  .slider__btn {
    padding: 8px;
    color: white;
    background-color: rgba(42, 37, 54, 0.5);
    border-radius: 50%;
  }

  .next {
    position: absolute;
    right: 0;
    margin-right: 15px;
  }
  
  .prev {
    position: absolute;
    left: 0;
    margin-left: 15px;
  }
  
`;

export default CarouselWrapper;