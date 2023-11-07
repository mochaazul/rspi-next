import styled from 'styled-components';

import { colors } from 'constant';

export const ItemStyle = styled.div`
  .item-text {
    & > * {
      transition: all .5s;
    }
    &::after {
      content: ' ';
      width: 0;
      margin-right: 100%;
      height: 1px;
      display: block;
      background-color: ${ colors.paradiso.default };
      transition: all .5s;
    }
  }
  &:hover {
    .item-text {
      & > * {
        transition: all .5s;
        color: ${ colors.paradiso.default };
        transform: translateY(-2px);
      }
      &::after {
        width: 100%;
        transition: all .5s;
      }
    }
  }
`;