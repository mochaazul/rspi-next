import { GlobalCardShadowSmall } from '@/constant/globalstyle';
import styled from 'styled-components';

export const UpdatePasswordPageStyle = styled.div`
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
	@media screen and (min-width: 768px) {
		${ GlobalCardShadowSmall }
	}

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 32px 64px;
	width: 696px;

	@media screen and (max-width: 768px) {
		width: 100%;
		padding: 32px 16px;
  }

	@media screen and (min-width: 768px) {
		${ GlobalCardShadowSmall }
	}
`;
