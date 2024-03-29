'use client';

import Link from 'next/link';

import { colors, icons } from '@/constant';
import { useScopedI18n } from '@/locales/client';

import Text from '../Text';
import { ItemStyle } from './style';

export interface BreadcrumbsType {
	datas: {
		name: string;
		url: string;
	}[];
	removeHome?: boolean;
}

const BreadCrumbs = (props: BreadcrumbsType) => {
	const t = useScopedI18n('navMenu');

	const datas: BreadcrumbsType['datas'] = props.datas;

	if (!!props.removeHome === false && datas.filter(data => data.url === '/').length <= 0) {
		datas.splice(0, 0,
			{
				name: t('home'),
				url: '/'
			}
		);
	}

	return (
		<div className='flex flex-row sm:ml-[-0.25rem] pt-[25px] sm:pt-8'>
			{
				datas.map((data, index) => (
					<div key={ index } className='flex flex-row items-center'>
						<Link href={ data.url }>
							<ItemStyle className='px-1 py-1 max-sm:px-0.5'>
								<Text
									fontType='p'
									className='item-text'
									fontSize='14px'
									lineHeight='17px'
									fontWeight={ (index + 1) < props.datas.length ? '400' : '900' }
									color={ (index + 1) < props.datas.length ? colors.grey.dark : colors.paradiso.default }
									subClassName={ `max-sm:!text-[10px] ${ index === (props.datas.length - 1) ? 'line-clamp-1' : 'whitespace-no-wrap w-max' } max-sm:!leading-normal` }
									text={ data.name }
								/>
							</ItemStyle>
						</Link>
						{
							(index + 1) < props.datas.length ? <icons.ArrowRight className='w-3 h-3 sm:w-4 sm:h-4' /> : null
						}
					</div>
				))
			}
		</div>
	);
};

export default BreadCrumbs;