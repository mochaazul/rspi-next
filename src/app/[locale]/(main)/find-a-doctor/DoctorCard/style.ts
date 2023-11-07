import styled from 'styled-components';

import { colors } from '@/constant';
import { GlobalCardShadow } from '@/constant/globalstyle';

export const DoctorCardStyle = styled.div`
	background-color: ${ colors.white.default };
	border-radius: 10px;
	padding: 24px;
	${ GlobalCardShadow };

	.telemedicine-available {
		display: flex;
		flex-direction: row;
		gap: 6px;
		border-radius: 100px;
		padding: 4px 10px;
		background-color: ${ colors.grey.darkerFindDoctor };
		align-items: center;
		
		@media not all and (min-width: 640px) {
			padding: 0px 10px;
		}
	}

	@media not all and (min-width: 640px) {
		padding: 16px;
	}
`;

export const AccordionItemStyle = styled.div<{ isOpen: boolean; }>`
	align-items: center;
	gap: 2rem;
	border: 1px solid ${ colors.grey.lighter };
	border-radius: 8px;
	padding: 16px 24px;
	position: relative;
	overflow: hidden;
	&::before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 0px;
		background-color: ${ colors.paradiso.default };
		transition: all .3s;
	}

	${ props => props.isOpen && `
		background-color: ${ colors.white.body };
		&::before {
			width: 8px;
			transition: all .3s;
		}
	` }

	& .item-desc {
		overflow: auto;
		position: relative;
		opacity: ${ props => props.isOpen ? '1' : '0' };
		max-height: ${ props => props.isOpen ? '1000px' : '0px' };
		margin-top: ${ props => props.isOpen ? '16px' : '0' };
		transition: all .5s;
	}

	.chevron {
		transition: all .5s;
		&.up {
			transform: rotateZ(180deg);
		}
	}
`;

export const TitleStyle = styled.div`
	.vertical-divider {
		margin: 0 8px;
		height: 90%;
		border-left: 1px solid ${ colors.grey.light };
	}
`;

export const ItemChildrenStyle = styled.div`
	.border-bottom { 
		border-bottom: 1px solid ${ colors.grey.light };
		padding-bottom: 16px;
		margin-bottom: 16px;
	}
`;