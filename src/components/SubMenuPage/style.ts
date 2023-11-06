import styled from 'styled-components';

import { colors } from 'constant';

export const ItemStyle = styled.div`
  visibility: hidden;
  top: 0;
  opacity: 0;
  position: absolute;
  left: 20px;
  z-index: 0;
  transition: all .3s;

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
`;