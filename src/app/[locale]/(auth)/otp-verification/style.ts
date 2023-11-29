import { GlobalCardShadowSmall } from '@/constant/globalstyle';
import styled from 'styled-components';

const OTPPageStyle = styled.div`
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
	width: 696px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 32px 64px;

	@media screen and (max-width: 768px) {
		width: 100%;
		padding: 32px 16px;
  }

	@media screen and (min-width: 768px) {
		${ GlobalCardShadowSmall }
	}
`;

export const WarningNote = styled.div`
	display: flex;
	padding: 16px;
	background: #E5F5F5;
	border-radius: 4px;
	width: 100%;
	gap: 12px;
	margin-bottom: 64px;
`;

export default OTPPageStyle;
