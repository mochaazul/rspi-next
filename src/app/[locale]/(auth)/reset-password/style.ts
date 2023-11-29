import styled from 'styled-components';
import { GlobalCardShadow } from '@/constant/globalstyle';

export const ResetPasswordStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;

	@media screen and (min-width: 768px) {
		justify-content: center;
		padding: 32px 0;
	}
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