'use client';

import React, { useState, useEffect } from 'react';
import * as Icons from 'react-feather';

import CarouselWrapper from './style';

interface CarouselProps {
	children: JSX.Element[];
	onChangeIndex?: (index: number) => any;
	timeout?: number;
	autoplay?: boolean;
	arrowButton?: boolean;
	dotsContainerClassName?: string;
}

const CustomCarousel: React.FC<CarouselProps> = ({ children, ...props }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [slideDone, setSlideDone] = useState(true);
	const [timeID, setTimeID] = useState(0);

	useEffect(() => {
		if (slideDone) {
			setSlideDone(false);
			if (!!props.autoplay || props.autoplay === undefined) {
				setTimeID(
					window.setTimeout(() => {
						slideNext();
						setSlideDone(true);
					}, props.timeout ?? 5000)
				);
			}
		}
	}, [slideDone]);

	useEffect(() => {
		props.onChangeIndex?.(activeIndex);
	}, [activeIndex]);

	const slideNext = () => {
		setActiveIndex(val => {
			if (val >= children.length - 1) {
				return 0;
			} else {
				return val + 1;
			}
		});
	};

	const slidePrev = () => {
		setActiveIndex(val => {
			if (val <= 0) {
				return children.length - 1;
			} else {
				return val - 1;
			}
		});
	};

	const AutoPlayStop = () => {
		if (timeID > 0) {
			clearTimeout(timeID);
			setSlideDone(false);
		}
	};

	const AutoPlayStart = () => {
		if (!slideDone) {
			setSlideDone(true);
		}
	};

	return (
		<CarouselWrapper>
			<div
				className='container__slider relative'
				onMouseEnter={ AutoPlayStop }
				onMouseLeave={ AutoPlayStart }
			>
				<div className='children'>
					{ children.map((item, index) => {
						return (
							<div
								className={ 'max-h-[550px] slider__item slider__item-active-' + (activeIndex + 1) }
								key={ index }
							>
								{ item }
							</div>
						);
					}) }
				</div>
				<div className='shadow-custom' />

				<div className={ `container__slider__links ${ props.dotsContainerClassName ?? '' } md:mb-14` }>
					{
						children.length <= 1
							? null
							:
							children.map((item, index) => {
								return (
									<button
										key={ index }
										className={
											activeIndex === index
												? 'container__slider__links-small container__slider__links-small-active'
												: 'container__slider__links-small'
										}
										onClick={ e => {
											e.preventDefault();
											setActiveIndex(index);
										} }
									/>
								);
							})
					}
				</div>

				{
					!props.arrowButton
						? null
						:
						children.length <= 1
							? null
							:
							<div>
								<button
									className='slider__btn next'
									onClick={ e => {
										e.preventDefault();
										slideNext();
									} }
								>
									<Icons.ArrowRight />
								</button>
								<button
									className='slider__btn prev'
									onClick={ e => {
										e.preventDefault();
										slidePrev();
									} }
								>
									<Icons.ArrowLeft />
								</button>
							</div>
				}
			</div>
		</CarouselWrapper>
	);
};

export default CustomCarousel;
