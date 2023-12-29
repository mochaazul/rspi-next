import React from 'react';
import styled from 'styled-components';
import * as FeatherIcons from 'react-feather';

import { colors, icons } from '@/constant';
import { GlobalAllTransition5ms } from '@/constant/globalstyle';

interface PhoneNumberInputType {
  iconPosition?: 'left' | 'right';
  iconName?: keyof typeof icons;
  featherIcon?: keyof typeof FeatherIcons;
  iconColor?: string;
  wrapperClassName?: string;
}

export interface PhoneInputType extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, PhoneNumberInputType {
  ref?: React.RefObject<HTMLInputElement>;
  onIconClick?: () => any;
}

export interface StyledPhoneNumberInputType extends Omit<PhoneNumberInputType, 'iconPosition' | 'iconName'> {
  $iconPosition?: 'left' | 'right';
  $iconName?: keyof typeof icons;
  $disabled?: boolean;
}

export const PhoneNumberInputWrapper = styled.div<StyledPhoneNumberInputType>`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 5px;
  outline: 1px solid ${ colors.grey.lighter };
  padding: 12px 18px;

  .iconWrapper {
    display: ${ props => (!!props.$iconName || !!props.featherIcon) ? 'block' : 'none' };
    left: ${ props => (props.$iconPosition === 'left' || !(!!props.$iconPosition)) && '10px' };
    right: ${ props => props.$iconPosition === 'right' && '10px' };
  }

  input {
    padding-left: ${ props => (!!props.$iconName || !!props.featherIcon) && (props.$iconPosition === 'left' || !(!!props.$iconPosition)) && '43px' };
    padding-right: ${ props => (!!props.$iconName || !!props.featherIcon) && props.$iconPosition === 'right' && '43px' };
  }
  &:focus-within{
    outline: 1px solid ${ colors.green.brandAccent }
  }
  ${ GlobalAllTransition5ms }
 
  ${ props => props.$disabled
    ? `
    background-color: ${ colors.grey.lighterOpacity };
    color: ${ colors.grey.darkOpacity };
  ` : '' }
`;

export const CountrySelector = styled.div`
  background-color: inherit;
  border-right-width: 1px;
  border-color: ${ colors.grey.light };
  padding-right: 8px;
`;

export const Input = styled.input<PhoneInputType>`
  width: 100%;
  padding-left: 8px;
  font-family: var(--font-family);
  &:focus {
    outline: none;
  }
  
`;

export const IconWrapper = styled.div`
  position: absolute;
  margin-top: 2px;
`;