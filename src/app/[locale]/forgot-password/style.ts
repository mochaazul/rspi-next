import styled from 'styled-components';
import { GlobalCardShadowSmall } from '@/constant/globalstyle';

export const ForgotPasswordStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;

	@media screen and (min-width: 768px) {
		padding: 32px 0;
	}
`;

export const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 696px;

	.input {
		width: 100%;
	}

	@media screen and (max-width: 768px) {
		width: 100%;
		padding: 32px 16px;
	}

	@media screen and (min-width: 768px) {
		${ GlobalCardShadowSmall }
	}
`;