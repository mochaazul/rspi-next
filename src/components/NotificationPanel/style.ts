import styled, { css } from 'styled-components';

import { colors } from 'constant';

export interface StyleProps {
	mode: 'success' | 'error';
	visible?: boolean;
}

export const NotificationStyle = styled.div<StyleProps>`
	transition: all .5s;
	max-height: ${ props => props.visible ? '900vh' : '0' };
	padding: ${ props => props.visible ? '16px' : '0' };
	opacity: ${ props => props.visible ? '1' : '0' };
	overflow: hidden;

	svg.svg-white path {
		stroke: ${ colors.white.default };
		fill: ${ colors.white.default };
	}

	.icon-cont {
		background-color: ${ colors.green.light };
		& svg {
			width: 15px;
			height: 15px;
		}
	}

	.icon-cont-close {
		& svg {
			width: 20px;
			height: 20px;
		}
	}

	${ props => props.mode === 'success' && SuccessStyle }
	${ props => props.mode === 'error' && ErrorStyle }
`;

const SuccessStyle = css`
	background-color: ${ colors.green.accent };
`;

const ErrorStyle = css`
	background-color: ${ colors.red.accentOpacity90 };

	.icon-cont {
		background-color: ${ colors.red.default };
	}
`;