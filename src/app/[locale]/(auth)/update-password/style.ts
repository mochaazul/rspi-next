import { GlobalCardShadowSmall } from '@/constant/globalstyle';
import styled from 'styled-components';

export const UpdatePasswordPageStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
  min-height: 100vh;

	@media screen and (min-width: 768px) {
		justify-content: center;
		padding: 32px 0;
	}
`;

export const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 32px 64px;
	width: 696px;

	@media screen and (max-width: 767px) {
		width: 100%;
		padding: 24px 16px 60px 16px;
  }

	@media screen and (min-width: 768px) {
		${ GlobalCardShadowSmall }
	}
`;
