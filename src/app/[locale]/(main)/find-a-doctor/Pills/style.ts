import styled from 'styled-components';

import { colors } from '@/constant';

export const PillsStyle = styled.div`
  background-color: ${ colors.grey.lightest };
  border-radius: 1000px;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;

  @media not all and (min-width: 640px) {
    padding: 4px 12px;
  }
`;