import React from 'react';
import styled from 'styled-components';
import * as FeatherIcons from 'react-feather';
import InputMask from 'react-input-mask';

import { colors, icons } from '@/constant';
import { GlobalAllTransition5ms } from '@/constant/globalstyle';

interface TextFieldType {
  iconPosition?: 'left' | 'right';
  iconName?: keyof typeof icons;
  featherIcon?: keyof typeof FeatherIcons;
  iconColor?: string;
  isNumber?: boolean,
  mask?: string | (string | RegExp)[];
}

export interface InputType extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, TextFieldType {
  ref?: React.RefObject<HTMLInputElement>;
  onIconClick?: () => any;
}

export interface StyledTextFieldType extends Omit<TextFieldType, 'iconPosition' | 'iconName'> {
  $iconPosition?: 'left' | 'right';
  $iconName?: keyof typeof icons;
}

export const TextFieldWrapper = styled.div<StyledTextFieldType>`
  display: flex;
  align-items: center;
  position: relative;
  outline: 1px solid ${ colors.grey.lighter };
  border-radius: 5px;

  flex-direction: ${ props => (props.$iconPosition === 'left' || !(!!props.$iconPosition)) ? 'row' : 'row-reverse' };

  &:focus {
    outline: 1px solid ${ colors.green.toscaLight }
  }
  
  input {
    padding-left: ${ props => (!!props.$iconName || !!props.featherIcon) && (props.$iconPosition === 'left' || !(!!props.$iconPosition)) && '43px' };
    padding-right: ${ props => (!!props.$iconName || !!props.featherIcon) && props.$iconPosition === 'right' && '43px' };
  }
`;

export const Input = styled.input<InputType>`
  width: 100%;
  padding: 12px 18px;
  font-family: var(--font-family);
  ${ GlobalAllTransition5ms }
  &:focus {
      outline: none;
    }
  
`;

export const InputMaskedStyled = styled(InputMask)`
  width: 100%;
  padding: 12px 18px;
  border-radius: 5px;
  font-family: var(--font-family);
  border: 1px solid ${ colors.grey.lighter };
  outline: none;
  ${ GlobalAllTransition5ms }

  &:focus-within {
    outline: 1px solid ${ colors.green.toscaLight }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
`;