import { Button, Text, Share } from '@/components/ui';
import { colors } from '@/constant';

import { CardNewsStyle } from './styles';

interface PropsType {
	id: number;
	imgThumb: string;
	title: string;
	author?: string;
	date: string;
	category: string;
	isActive?: boolean;
	onClick?: (id: number) => any;
}

const CardNews = (props: PropsType) => {
	const handleOnClick = (id: number) => () => {
		props.onClick?.(id);
	};

	return (
		<CardNewsStyle>
			<div
				className={ `shrink-0 max-sm:px-3 max-sm:py-5 cursor-pointer flex relative justify-between ${ props.isActive ? 'active' : '' }` }
				onClick={ handleOnClick(props.id) }
			>
				<div>
					<Share id={ props.id } />
				</div>
				<div className='mr-[30px] lg:w-1/2'>
					<div className='flex items-center'>
						<div className='max-w-[160px]'>
							<Button theme='primary' label={ props.category } className='btn-category' />
						</div>
						<div className='ml-[10px]'>
							<Text
								fontSize='14px'
								fontWeight='400'
								lineHeight='17px'
								color={ colors.grey.dark }
								text={ props.date }
							/>
						</div>
					</div>
					<div className='sm:mt-4 mt-1 gap-y-3 max-w-[255px]'>
						<Text
							fontSize='16px'
							fontWeight='900'
							lineHeight='24px'
							color={ colors.grey.darker }
							text={ props.title }
						/>
						<Text
							fontSize='14px'
							fontWeight='400'
							lineHeight='24px'
							color={ colors.grey.dark }
							className='mt-[5px]'
							text={ props.author }
						/>
					</div>
				</div>
				<img src={ props.imgThumb || '' } alt={ props.title } className='w-[254px] h-[145px] rounded-md object-cover' />
			</div>
		</CardNewsStyle>
	);
};

export default CardNews;