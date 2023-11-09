import { colors } from '@/constants';
import React from 'react';
import styled from 'styled-components';

interface CheckboxType {
	isslider?: boolean;
	checkposition?: 'left' | 'right';
}

export interface InputType extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, CheckboxType {
	ref?: React.Ref<HTMLInputElement>;
	label: string | React.ReactNode;
	labelBold?: string | React.ReactNode;
}

export const CheckboxStyle = styled.div<CheckboxType>`
	input[type='checkbox'] {
		display: none;

		${ props => !props.isslider && `
			& + label .check-box {
				display: inline-block;
				border: 1px solid ${ colors.paradiso.default };
				border-radius: 4px;
				background-color: ${ colors.white.default };
				cursor: pointer;
				width: 24px;
				height: 24px;
				transition: all .2s;
				@media not all and (min-width: 640px) {
					width: 18px;
					height: 18px;
				}
			}
			
			&:checked + label .check-box {
				background-color: ${ colors.paradiso.default };
				color: ${ colors.white.default };
				transition: all .2s;
			}
		`}
	}

	${ props => props.isslider && `
		label {
			.check-box-cont {
				height: 32px;
				width: 60px;
			}
		}

		.check-box > * {
			display: none;
		}

		.check-box {
			height: 32px;
			width: 60px;
			border: 0;
			position: absolute;
			cursor: pointer;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: ${ colors.grey.light };
			border-radius: 32px;
			-webkit-transition: .4s;
			transition: .4s;
		}

		.check-box:before {
			position: absolute;
			content: "";
			height: 24px;
			width: 24px;
			left: 4px;
			bottom: 4px;
			background-color: ${ colors.white.default };
			border-radius: 50%;
			-webkit-transition: .4s;
			transition: .4s;
		}

		input[type='checkbox']:checked + label .check-box {
			background-color: ${ colors.paradiso.default };
		}
		
		input[type='checkbox']:focus + label .check-box {
			box-shadow: 0 0 1px ${ colors.paradiso.default };
		}

		input[type='checkbox']:checked + label .check-box:before {
			-webkit-transform: translateX(28px);
			-ms-transform: translateX(28px);
			transform: translateX(28px);
		}
	`}
`;