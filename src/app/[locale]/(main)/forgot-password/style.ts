import styled from 'styled-components';
import { GlobalCardShadow } from '@/constant/globalstyle';

export const ForgotPasswordStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

export const Box = styled.div`
	${ GlobalCardShadow }
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
		width: 666px;

  	.input {
    	width: 538px;
  	}
`;