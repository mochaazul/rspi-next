import { colors } from '@/constants';
import { GlobalAllTransition5ms } from '@/constants/globalstyle';
import React from 'react';
import styled from 'styled-components';

export interface InputPinType extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  password?: boolean;
  digitLength?: number;
  onChangeValue?: (obj: { name?: string; value: string; }) => any;
  semiSecure?: boolean;
}

export const TextFieldPinWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 -10px;
`;

export const Input = styled.input`
  width: 65px;
  height: 65px;
  border-radius: 5px;
  font-family: var(--font-family);
  font-weight: 900;
  font-size: 32px;
  outline: 1px solid ${ colors.grey.lighter };
  text-align: center;
  margin: 0 10px;
  ${ GlobalAllTransition5ms }

  &:focus {
    outline: 1px solid ${ colors.green.toscaLight }
  }
`;