import styled from 'styled-components';

import { colors } from '@/constant';

export const AccordionStyle = styled.div`
  margin-top: -20px;
  .item-wrapper {
    padding-bottom: 15px;
    padding-top: 20px;
    &.border-bottom {
      border-bottom: 1px solid ${ colors.grey.light };
    }
  }
`;

export const ItemStyle = styled.div<{ $isOpen: boolean; }>`
  align-items: start;
  gap: 2rem;

  li {
    list-style: auto;
  }

  & .item-desc {
    position: relative;
    display: ${ props => props.$isOpen ? 'block' : 'none' };
    max-height: ${ props => props.$isOpen ? '1000px' : '0px' };
    animation: show_desc .5s ease-in-out both;
  }
  .chevron {
    transition: all .5s;
    &.up {
      transform: rotateZ(180deg);
    }
  }
  @keyframes show_desc {
    from {opacity: 0;}
    to {opacity: 1;}
}
`;