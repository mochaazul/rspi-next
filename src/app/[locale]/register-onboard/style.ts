import styled from 'styled-components';

import { GlobalCardShadow } from '@/constant/globalstyle';

export const RegisterOnboardStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 110px 0 54px 0;
`;

export const Box = styled.div`
	${ GlobalCardShadow }
  display: flex;
  flex-direction: column;
	width: 666px;
	padding: 32px 64px;

	.logo-image {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

  .input {
    width: 538px;
		height: 50px;
		outline: none;
  }

	@media screen and (max-width: 600px) {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 32px 34px;
	
		.input {
			width: 100%;
		}
  }
`;