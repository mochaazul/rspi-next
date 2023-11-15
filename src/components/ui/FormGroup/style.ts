import React from 'react';
import styled from 'styled-components';
export interface FormGroupWrapperInterface extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    ref?: React.RefObject<HTMLDivElement>;
}

const FormGroupWrapper = styled.div<FormGroupWrapperInterface>`
    display: flex;
    flex-direction: column ;
`;
export { FormGroupWrapper };