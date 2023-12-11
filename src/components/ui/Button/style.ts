'use client';

import React from 'react';
import styled from 'styled-components';

import { colors, fonts } from '@/constant';

type ThemeType = 'primary' | 'secondary' | 'outline' | 'text';

export type ButtonType = {
	theme?: ThemeType;
	themeColor?: string;
	$hoverTheme?: ThemeType;
	label?: string;
	type?: 'button' | 'submit' | 'reset';
	width?: string;
	noPadding?: boolean;
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export type ButtonStyleType = ButtonType & {
	$hoverTheme?: ThemeType;
	$themeColor?: string;
};

const buttonTheme = ({
	theme,
	disabled,
	$themeColor
}: ButtonStyleType) => {
	let style = `
		color: ${ $themeColor };
			> div.bg-overlay {
				opacity: 1;
				border-radius: 5px;
			}
	`;

	if (theme === 'primary') {
		style += `
			color: ${ colors.white.default };
			> div.bg-overlay {
				background-color: ${ $themeColor };
				border: 1px solid ${ $themeColor };
			}
    `;
	}

	if (theme === 'secondary') {
		style += `
			color: ${ $themeColor };
			> div.bg-overlay {
				opacity: .1;
				background-color: ${ $themeColor };
				border: 1px solid transparent;
			}
    `;
	}

	if (theme === 'outline') {
		style += `
			color: ${ $themeColor };
			> div.bg-overlay {
				background-color: transparent;
				border: 1px solid ${ $themeColor };
			}
    `;
	}

	if (theme === 'text') {
		style += `
			color: ${ $themeColor };
			> div.bg-overlay {
				background-color: transparent;
				border: 0;
				width: fit-content;
				padding: 0px;
			}
    `;
	}

	if (disabled) {
		style += `
			color: ${ colors.white.default };
			> div.bg-overlay {
				background-color: ${ colors.grey.light };
				border: 1px solid ${ colors.grey.light };
			}
		`;
	}

	return style;
};

const buttonHoverTheme = ({
	theme,
	$hoverTheme,
	...props
}: ButtonStyleType) => {
	if (theme === $hoverTheme) {
		return 'opacity: 0.9;';
	}

	return buttonTheme({ ...props, theme: $hoverTheme ?? theme });
};

const ButtonStyle = styled.button<ButtonStyleType>`
	transition: all .3s;
	font-family: ${ fonts.lato }, Arial, sans-serif;
  background-color: white;
  border-radius: 5px;
  padding: ${ props => props.noPadding ? '0px' : '12px 20px' };
	${ props => `width: ${ props.width };` }
  cursor: ${ props => props.disabled ? 'default' : 'pointer' };
  font-size: 16px;
  font-weight: bold;
  border: none;
	position: relative;
	overflow: hidden;
	user-select: none;
	position: relative;
	width: 100%;

	&::before {
		content: ' ';
		position: absolute;
		display: block;
		background-color: ${ colors.white.default };
		opacity: .3;
		top: 0;
		bottom: -30px;
		left: 0;
		right: 0;
		transform: scale(0);
		border-radius: 100%;
		transform-origin: bottom center;
		transition: all 1s;
	}

	&:active {
		&::before {
			transform: scale(3);
			transition: all .5s;
			z-index: 10;
		}
	}

	> div.children-wrapper {
		position: relative;
		z-index: 1;
	}

	> div.bg-overlay {
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	${ props => buttonTheme(props) }

	&:hover {
		${ props => !props.disabled && buttonHoverTheme(props) }
	}
`;

export default ButtonStyle;
