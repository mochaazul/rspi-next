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

export default OTPPageStyle;
