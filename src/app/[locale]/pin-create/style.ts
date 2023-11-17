<<<<<<< HEAD
import { GlobalCardShadowSmall } from '@/constant/globalstyle';
import styled from 'styled-components';

const PinPageStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  min-height: 100vh;
`;

export const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 32px 64px;

	@media screen and (min-width: 768px) {
		${ GlobalCardShadowSmall }
	}
`;

export default PinPageStyle;
=======
import { GlobalCardShadow } from '@/constant/globalstyle';
import styled from 'styled-components';

const PinPageStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  height: 100vh;
`;

export const Box = styled.div`
	${ GlobalCardShadow }
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
		padding: 32px 64px;
`;

export default PinPageStyle;
>>>>>>> main
