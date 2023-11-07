import { GlobalCardShadow } from 'constant/globalstyle';
import styled from 'styled-components';

const OTPPageStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  height: 100vh;
`;

export const Box = styled.div`
	max-width: 600px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 32px 64px;
	${ GlobalCardShadow }
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
