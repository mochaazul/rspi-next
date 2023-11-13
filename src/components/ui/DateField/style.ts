import React from 'react';
import styled from 'styled-components';
import Datepicker from 'react-tailwindcss-datepicker';
import { icons, colors } from '@/constant';

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
}

export interface InputType extends DatepickerProps, DateFieldType {
  ref?: React.RefObject<HTMLInputElement>;
  onIconClick?: () => any;
}

export interface StyledDateFieldType extends Omit<DateFieldType, 'iconPosition' | 'iconName'> {
  $iconPosition?: 'left' | 'right';
  $iconName?: any;
}

export const DateFieldWrapper = styled.div<StyledDateFieldType>`
  display: flex;
  align-items: center;
  position: relative;
  
  border-radius: 5px;
  outline: 1px solid ${ colors.grey.lighter };

  .bottom-full{
    bottom: unset !important;
  }
  &:focus-within{
    outline: 1px solid ${ colors.green.toscaLight };
  }

  input {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    font-family: var(--font-family) !important;

    + button {
      display: none;
    }
    ~ div {
      z-index: 110 !important;
    }
    &:focus {
      outline: none;
    }

    &.focus {
      box-shadow: 0 !important;
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
`;