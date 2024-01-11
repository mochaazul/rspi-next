'use client';
import React from 'react';
import styled from 'styled-components';

export interface FormType extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    ref?: React.RefObject<HTMLFormElement>;
}

const FormStyled = styled.form<FormType>`
`;

export { FormStyled };