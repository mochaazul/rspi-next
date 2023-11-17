import styled from 'styled-components';

import { GlobalCardShadowSmall } from '@/constant/globalstyle';

export const RegisterOnboardStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media screen and (min-width: 768px) {
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

	@media screen and (max-width: 768px) {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 32px 16px;
  }

	@media screen and (min-width: 768px) {
		${ GlobalCardShadowSmall }
	}
`;