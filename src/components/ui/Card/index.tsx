'use client';

import { useState } from 'react';
import Link from 'next/link';

import * as Icons from 'react-feather';

import { colors } from '@/constant';
import Text from '../Text';

import {
	CardWrapper,
	CardHorizontalStyle,
	CardStyle,
	CardStyleType,
	CardContentHTML
} from './style';
import Image from 'next/image';
import { Share } from '@/components';
import { icons } from '@/constant';

interface PropsType {
	image?: string;
	content?: JSX.Element | JSX.Element[];
	header?: JSX.Element | JSX.Element[] | React.JSXElementConstructor<{ isHover?: boolean; }>;
	footer?: JSX.Element | JSX.Element[] | React.JSXElementConstructor<{ isHover?: boolean; }>;
	to?: string;
	imageHeight?: number | string;
	cardStyle?: CardStyleType;
	className?: string | undefined;
	iconShare?: boolean;
	id?: number;
}

interface CardsScrollHorizontalType {
	children: JSX.Element | JSX.Element[];
	customRef?: React.RefObject<HTMLDivElement>;
	noHorizontalPadding?: boolean;
}

const Card = (props: PropsType) => {
	const [isHover, setIsHover] = useState(false);

	const toggleMouseHover = (hovered: boolean) => () => {
		setIsHover(hovered);
	};

	return (
		<CardWrapper href={ props.to || '#' } className={ `shrink-0 ${ props.className }` } onMouseEnter={ toggleMouseHover(true) } onMouseLeave={ toggleMouseHover(false) }>
			<CardStyle { ...props.cardStyle }>
				{
					props.iconShare &&
					<div>
						<Share id={ props.id } />
					</div>
				}
				{
					props.image &&
					<div className={ `relative w-full ${ props.imageHeight ? `h-[${ props.imageHeight }]` : 'h-fit' }` } >
						<Image src={ props.image } alt={ 'img-thumbnail' } className='object-cover' fill />
					</div>
				}
				{
					props.header &&
					<div className='footer px-[20px] pt-[20px]'>
						{ typeof props.header === 'function' ? <props.header isHover={ isHover } /> : props.header }
					</div>
				}
				{
					props.content &&
					<div className='content px-[20px] pb-[20px]'>
						{ props.content }
					</div>
				}
				{
					props.footer &&
					<div className='footer pb-[20px] px-[20px] grow flex items-end'>
						{ typeof props.footer === 'function' ? <props.footer isHover={ isHover } /> : props.footer }
					</div>
				}
			</CardStyle>
		</CardWrapper>
	);
};

export const CardContent = ({ title, description }: { title: string, description: string; }) => (
	<>
		<Text fontSize='20px' fontType='h3' fontWeight='900' color={ colors.grey.darker } text={ title } lineHeight='28px' className='pt-[20px]' />
		<Text fontSize='16px' fontType='p' fontWeight='400' color={ colors.grey.dark } text={ description } className='mt-[10px]' lineHeight='23px' />
	</>
);

export const CardContentWithInner = ({ title, description, author, RSLocation }: { title: string, description: string; author?: string; RSLocation?: string[]; }) => (
	<CardContentHTML>
		<Text fontSize='20px' fontType='h3' fontWeight='900' color={ colors.grey.darker } text={ title } lineHeight='28px' className='pt-[10px]' subClassName='max-sm:text-base' />
		{
			!!RSLocation &&
			<div className='flex gap-3 mt-3 items-center'>
				<Icons.MapPin color={ colors.paradiso.default } />
				<div className='flex flex-col gap-1'>
					{
						RSLocation.map(name =>
							<Text
								key={ name }
								fontSize='16px'
								lineHeight='19px'
								fontWeight='900'
								color={ colors.paradiso.default }
								text={ name }
							/>
						)
					}
				</div>
			</div>
		}
		<Text fontSize='14px' fontType='p' fontWeight='400' color={ colors.grey.dark } text={ author } className='mt-[5px] mb-[2px] max-sm:!text-xs' lineHeight='24px' />
		<div className='innerHTML text-xs max-sm:leading-[18px] sm:text-sm md:text-base mt-[10px]' style={ { color: colors.grey.dark } } dangerouslySetInnerHTML={ { __html: description } } />
	</CardContentHTML>
);

export const CardFooter = ({ content, to }: { content: string; to?: string; }) => (
	<div className='flex flex-row gap-x-2 items-center'> { /* TODO: if use a Link it will cause an error <a> cannot appear as a descendant of <a> because CardWrapper = styled(Link) */ }
		<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default } text={ content } />
		<icons.LongArrowRight className='svg-green' style={ { width: '20px' } } />
	</div>
);

export const CardsScrollHorizontal = ({ children, customRef, noHorizontalPadding }: CardsScrollHorizontalType) => (
	<CardHorizontalStyle ref={ customRef } className={ ` ${ noHorizontalPadding ? '' : 'pl-3 md:px-40' } flex gap-x-[32px] pr-[32px] w-full` }>
		{ children }
	</CardHorizontalStyle>
);

export default Card;