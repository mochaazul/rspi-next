import React from 'react';
import styled from 'styled-components';
import Datepicker from 'react-tailwindcss-datepicker';

import { colors, icons } from '@/constant';

interface DateFieldType extends Omit<typeof Datepicker, 'value' | 'onChange'> {
  iconPosition?: 'left' | 'right';
  iconName?: keyof typeof icons;
}

export interface DatepickerProps extends DateFieldType {
  name?: string;
  value?: string;
  placeholder?: string;
  onChangeValue?: ({ name, value }: { name?: string; value?: string; }) => void;
  popOverDirection?: 'up' | 'down';
  onIconClick?: () => any;
  dateFormat?: string;
  applyMaxDateForDoB?: boolean;
  enableMinDateNow?: boolean;
  iconClassName?: string;
  className?: string;
}

export interface InputType extends DatepickerProps, DateFieldType {
  ref?: React.RefObject<HTMLInputElement>;
  onIconClick?: () => any;
}

export interface StyledDateFieldType extends Omit<DateFieldType, 'iconPosition' | 'iconName'> {
  $iconPosition?: 'left' | 'right';
  $iconName?: keyof typeof icons;
}

export const DateFieldWrapper = styled.div<StyledDateFieldType>`
  display: flex;
  align-items: center;
  position: relative;

  .iconWrapper {
    display: ${ props => !!props.$iconName ? 'block' : 'none' };
    left: ${ props => (props.$iconPosition === 'left' || !(!!props.$iconPosition)) && '18px' };
    right: ${ props => props.$iconPosition === 'right' && '10px' };
    z-index: 1;
  }

  .bottom-full{
    bottom: unset !important;
  }

  input {
    padding-left: 18px;
    padding-left: ${ props => !!props.$iconName && (props.$iconPosition === 'left' || !(!!props.$iconPosition)) ? '51px !important' : '18px !important' };
    padding-right: ${ props => !!props.$iconName && props.$iconPosition === 'right' ? '43px !important' : '18px !important' };
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    outline: 1px solid ${ colors.grey.lighter };
    font-family: var(--font-family) !important;
    color: ${ colors.grey.darker };

    + button {
      display: none;
    }
    ~ div {
      z-index: 110 !important;
    }
    &:focus {
      outline: 1px solid ${ colors.green.brandAccent };
    }
    &.focus {
      box-shadow: 0 !important;
    }
		&:disabled {
      background-color: ${ colors.grey.lighterOpacity };
      color: ${ colors.grey.darkOpacity };
    }
  }
`;

export const DatepickerStyle = styled(Datepicker)`
  input {
    margin-top: 100px;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
  }

`;

export const IconWrapper = styled.div`
  position: absolute;
  margin-top: 2px;

  .svg-darkgrey,
  svg.svg-darkgrey path {
    color: ${ colors.grey.darkOpacity };
    stroke: ${ colors.grey.darkOpacity };
  }
`;