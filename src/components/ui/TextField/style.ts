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
  $iconColor?: string;
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
  $isNumber?: boolean;
  $featherIcon?: keyof typeof FeatherIcons;
}

export const TextFieldWrapper = styled.div<StyledTextFieldType>`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 5px;
  
  flex-direction: ${ props => (props.$iconPosition === 'left' || !(!!props.$iconPosition)) ? 'row' : 'row-reverse' };
  
  ${ props => !props.$isNumber ? `
  outline: 1px solid ${ colors.grey.lighterOpacity };
  &:focus-within {
    outline: 1px solid ${ colors.green.brandAccent };
  } ` : '' }

  input{
    padding: 12px 18px;
    
    // we only need to worry about the padding when the icon is on the left, since the padding on the left was offested by the icon wrapper
    ${ props => props.$iconName || props.$featherIcon && props.$iconPosition === 'left' && 'padding-left: 0px;' }
  }
`;

export const Input = styled.input<InputType>`
  width: 100%;
  font-family: var(--font-family);
  color: ${ colors.grey.darker };
  ${ GlobalAllTransition5ms }
  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${ colors.grey.lighterOpacity };
    color: ${ colors.grey.darkOpacity };
  }
`;

export const InputMaskedStyled = styled(InputMask)`
  width: 100%;
  padding: 12px 18px;
  border-radius: 5px;
  font-family: var(--font-family);
  color: ${ colors.grey.darker };
  outline: 1px solid ${ colors.grey.lighterOpacity };
  ${ GlobalAllTransition5ms }

  &:focus-within {
    outline: 1px solid ${ colors.green.brandAccent }
  }

  &:disabled {
    background-color: ${ colors.grey.lighterOpacity };
    color: ${ colors.grey.darkOpacity };
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
`;