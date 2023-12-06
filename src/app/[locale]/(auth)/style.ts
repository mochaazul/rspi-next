import styled from 'styled-components';

import { GlobalCardShadowSmall } from '@/constant/globalstyle';

export const ContainerStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	
	@media screen and (min-width: 768px) {
		justify-content: center;
		min-height: 100vh;
		padding: 32px 0;
	}
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
	width: 696px;
	padding: 32px 64px;

	.logo-image {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.input {
		width: 100%;
	}

	@media screen and (max-width: 767px) {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 24px 16px 60px 16px;
  }

	@media screen and (min-width: 768px) {
		${ GlobalCardShadowSmall }
	}
`;