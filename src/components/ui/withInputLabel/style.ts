import { colors } from '@/constant';
import styled from 'styled-components';

type InputWrapperType = {
  width?: string;
};

export const LabelText = styled.label`
    font-size: 14px;
    font-weight: 900;
    line-height: 16.8px;
    color: ${ colors.grey.darker };
    width: 100%;
    margin-bottom: 5px;
`;

export const InputLabelStyle = styled.div`
  margin: 10px 0;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin: 10px 0 10px;
  text-align: right;
  flex: 2;
`;

export const InfoText = styled.div`
  color: ${ colors.grey.dark };
  font-size: 12px;
  margin: 10px 0 10px;
  flex: 3;
  line-height: 15px;
`;

export const InputWrapper = styled.div<InputWrapperType>`
  margin: 5px 0;
  ${ props => `width:${ props.width || 'initial' }` }
`;