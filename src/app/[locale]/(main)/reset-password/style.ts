import styled from 'styled-components';
import { GlobalCardShadow } from 'constant/globalstyle';

export const ResetPasswordStyle = styled.div`
    display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
`;

export const LeftBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Box = styled.div`
	${ GlobalCardShadow }
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
		width: 666px;
		padding: 32px 64px;

  	.input {
    	width: 538px;
  	}
`;