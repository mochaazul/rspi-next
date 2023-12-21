'use client';

import { useState } from 'react';
import Link from 'next/link';

import * as Icons from 'react-feather';

import { colors, icons } from '@/constant';
import Text from '../Text';

import {
	CardWrapper,
	CardHorizontalStyle,
	CardStyle,
	CardStyleType,
	CardContentHTML
} from './style';

import Image from 'next/image';
import Share from '../Share';
import TextHtml from '../TextHtml';
import { Tooltip } from 'react-tooltip';

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
	className?: string;
}

const Card = (props: PropsType) => {
	const [isHover, setIsHover] = useState(false);

	const toggleMouseHover = (hovered: boolean) => () => {
		setIsHover(hovered);
	};

	return (
		<CardWrapper className={ `shrink-0 ${ props.className } relative` }>
			<Link href={ props.to || '#' } onMouseEnter={ toggleMouseHover(true) } onMouseLeave={ toggleMouseHover(false) }>
				<CardStyle { ...props.cardStyle }>

					{
						props.image &&
						<div className={ `relative w-full ${ props.imageHeight ? `h-[${ props.imageHeight }]` : 'h-fit' }` } >
							<Image src={ props.image } alt={ 'img-thumbnail' } className='object-cover' fill />
						</div>
					}
					{
						props.header &&
						<div className='footer px-4 md:px-5 pt-4 md:pt-5'>
							{ typeof props.header === 'function' ? <props.header isHover={ isHover } /> : props.header }
						</div>
					}
					{
						props.content &&
						<div className='content px-4 md:px-5 pb-4 md:pb-5'>
							{ props.content }
						</div>
					}
					{
						props.footer &&
						<div className='footer pb-4 md:pb-5 px-4 md:px-5 grow flex items-end'>
							{ typeof props.footer === 'function' ? <props.footer isHover={ isHover } /> : props.footer }
						</div>
					}
				</CardStyle>
			</Link>
			{
				props.iconShare &&
				<div className='block'>
					<Share id={ props.id } />
				</div>
			}
		</CardWrapper>
	);
};

export const CardContent = ({ title, description }: { title: string, description: string; }) => (
	<>
		<Text fontSize='20px' fontType='h3' fontWeight='900' color={ colors.grey.darker } text={ title } lineHeight='28px' className='pt-4 md:pt-5' />
		<Text fontSize='16px' fontType='p' fontWeight='400' color={ colors.grey.dark } text={ description } className='mt-[10px] line-clamp-3' lineHeight='23px' />
	</>
);

export const CardContentWithInner = ({ title, description, author, RSLocation, index = 0 }: { title: string, description: string; author?: string; RSLocation?: string[]; index?: number; }) => (
	<CardContentHTML>
		<Text fontSize='20px' fontType='h3' fontWeight='900' color={ colors.grey.darker } text={ title } lineHeight='28px' className='pt-1 sm:pt-2.5' subClassName='max-sm:text-base' />
		{
			!!RSLocation &&
			<div className='flex gap-2 sm:gap-2.5 mt-1 sm:mt-2.5 items-center'>
				<Icons.MapPin color={ colors.paradiso.default } size={ 16 } />
				<div className='flex flex-col gap-1'>
					<Text
						fontSize='16px'
						fontWeight='900'
						color={ colors.paradiso.default }
						fontType={ null }
						subClassName='max-sm:text-xs !leading-normal'
					>{ RSLocation?.[0] }
						{ RSLocation?.length > 1
							? (
								<span className='relative group'>
									<span data-tooltip-place='top-end' data-tooltip-id={ `rslocation-tooltip-${ index }` }>, +{ RSLocation?.length - 1 }..</span>
									<Tooltip id={ `rslocation-tooltip-${ index }` } offset={ 24 } style={ { width: 220, padding: '10px', borderRadius: '5px' } }>
										{ RSLocation?.slice(1)?.map(name => (
											<Text
												key={ name }
												fontSize='14px'
												fontWeight='400'
												color={ colors.white.default }
												text={ name }
												subClassName='max-sm:text-xs max-sm:leading-normal'
											/>
										)) }
									</Tooltip>
								</span>
							)
							: null }
					</Text>

				</div>
			</div>
		}
		{ author && (
			<Text fontSize='14px' fontType='p' fontWeight='400' color={ colors.grey.dark } text={ author } className='mt-[5px] mb-[2px] max-sm:!text-xs' lineHeight='24px' />
		) }
		<TextHtml className='innerHTML text-xs max-sm:leading-[18px] sm:text-sm md:text-base mt-4 sm:mt-5 line-clamp-3' style={ { color: colors.grey.dark } } htmlStr={ description ?? '' } />
	</CardContentHTML>
);

export const CardFooter = ({ content, to }: { content: string; to?: string; }) => (
	<div className='flex flex-row gap-x-2 items-center'> { /* TODO: if use a Link it will cause an error <a> cannot appear as a descendant of <a> because CardWrapper = styled(Link) */ }
		<Text fontSize='16px' fontType='p' fontWeight='900' color={ colors.paradiso.default } text={ content } />
		<icons.LongArrowRight className='svg-green' style={ { width: '20px' } } />
	</div>
);

export const CardsScrollHorizontal = ({ children, customRef, noHorizontalPadding, className }: CardsScrollHorizontalType) => (
	<CardHorizontalStyle ref={ customRef } className={ ` ${ noHorizontalPadding ? '' : 'container-content' } ${ className } flex gap-x-4 xl2:gap-x-[32px] w-full` }>
		{ children }
	</CardHorizontalStyle>
);

export default Card;