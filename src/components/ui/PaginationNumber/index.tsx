import { colors, icons } from '@/constant';
import Text from '@/components/ui/Text';

import { ItemCont, Spacer } from './style';
import Image from 'next/image';

interface PaginationNumberType {
	totalPage: number;
	currentPage: number;
	onItemClick?: (page: number) => any;
}

const PaginationNumber = (props: PaginationNumberType) => {
	let shownNumber = window.innerWidth <= 768 ? 3 : 5;
	shownNumber = shownNumber > props.totalPage ? props.totalPage : shownNumber;
	const shownNumberCalc = {
		min: Math.floor(shownNumber / 2),
		max: Math.ceil(shownNumber / 2)
	};

	const countStartFrom =
		(props.currentPage - shownNumberCalc.min) <= 1 ? 1 :
			(props.currentPage + shownNumberCalc.min) > props.totalPage ? props.totalPage - (shownNumber - 1) :
				props.currentPage - shownNumberCalc.min;

	const handleOnItemClick = (page: number) => () => {
		if (page > props.totalPage || page <= 0) {
			return false;
		}
		props.onItemClick?.(page);
	};

	return (
		<div className='flex flex-row sm:gap-10 gap-4'>
			<ItemCont className={ `arrow ${ props.currentPage === 1 ? 'disabled' : '' }` } onClick={ handleOnItemClick(props.currentPage - 1) }>
				<Image src={icons.ArrowLeft} alt="" className='svg-white' />
			</ItemCont>
			<div className='flex flex-row gap-4'>
				{
					(props.currentPage - shownNumberCalc.min) > 1 ?
						<>
							<ItemCont onClick={ handleOnItemClick(1) }>
								<Text
									fontSize='16px'
									fontWeight='900'
									color={ colors.white.default }
									text={ 1 }
								/>
							</ItemCont>
							<Spacer>
								<Text
									fontSize='16px'
									fontWeight='900'
									color={ colors.black.default }
									text='. . .'
									className='max-lg:hidden'
									subClassName='tracking-widest'
								/>
								<Text
									fontSize='16px'
									fontWeight='900'
									color={ colors.black.default }
									text='˚'
									className='lg:hidden'
								/>
							</Spacer>
						</> :
						null
				}
				{
					[...Array(shownNumber)].map((item, key) => (
						<ItemCont key={ key } className={ props.currentPage === (countStartFrom + key) ? 'active' : '' } onClick={ handleOnItemClick(countStartFrom + key) }>
							<Text
								fontSize='16px'
								fontWeight='900'
								color={ colors.white.default }
								text={ countStartFrom + key }
							/>
						</ItemCont>
					))
				}
				{
					(props.currentPage + shownNumberCalc.max) <= props.totalPage ?
						<>
							<Spacer>
								<Text
									fontSize='16px'
									fontWeight='900'
									color={ colors.black.default }
									text='. . .'
									className='max-lg:hidden'
									subClassName='tracking-widest'
								/>
								<Text
									fontSize='16px'
									fontWeight='900'
									color={ colors.black.default }
									text='˚'
									className='lg:hidden'
								/>
							</Spacer>
							<ItemCont onClick={ handleOnItemClick(props.totalPage) }>
								<Text
									fontSize='16px'
									fontWeight='900'
									color={ colors.white.default }
									text={ props.totalPage }
								/>
							</ItemCont>
						</> :
						null
				}
			</div>
			<ItemCont className={ `arrow ${ props.currentPage === props.totalPage ? 'disabled' : '' }` } onClick={ handleOnItemClick(props.currentPage + 1) }>
				<Image src={icons.ArrowRight} alt="" className='svg-white' />
			</ItemCont>
		</div>
	);
};

export default PaginationNumber;