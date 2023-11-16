import styled from 'styled-components';

import { colors } from '@/constant';

export const ItemStyle = styled.div`
  visibility: hidden;
  top: 0;
  opacity: 0;
  position: absolute;
  z-index: 0;
  transition: all .3s;
	left: 0;
  
  @media (min-width: 1024px) {
    left: 20px;
  }

  &.active {
    z-index: 1;
    visibility: visible;
    left: 0;
    opacity: 1;
    position: relative;
    transition: all .3s;
  }
`;

export const MenuItemStyle = styled.div`
  transition: all .2s;
   
  &.active, &:hover {
    background-color: ${ colors.paradiso.opacity10 };
    transition: all .2s;
  }

	&.active-mobile {
    border-color: ${ colors.green.brandAccent };
  }
`;