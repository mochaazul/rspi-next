import styled from 'styled-components';

import { colors } from 'constant';

export const PickerStyle = styled.div`
	position: absolute;
	right: 0;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
	overflow-y: auto;
	max-height: 400px;

	li:hover > *, li > *.active {
		background-color: ${ colors.paradiso.opacity10 };
	}
	
	li > *.active {
		* {
			color: ${ colors.paradiso.default } !important;
		}
	}
`;