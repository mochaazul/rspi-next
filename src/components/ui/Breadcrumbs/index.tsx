import Image from 'next/image';
import Link from 'next/link';

import { colors, icons } from '@/constant';

import Text from '../Text';
import { ItemStyle } from './style';

export interface BreadcrumbsType {
	datas: {
		name: string;
		url: string;
	}[];
	removeHome?: boolean;
}

const Breadcrumbs = (props: BreadcrumbsType) => {
	const datas: BreadcrumbsType['datas'] = props.datas;

	if (!!props.removeHome === false && datas.filter(data => data.url === '/').length <= 0) {
		datas.splice(0, 0,
			{
				name: 'Home',
				url: '/'
			}
		);
	}

	return (
		<div className='flex flex-row ml-[-0.25rem] max-sm:px-4'>
			{
				datas.map((data, index) => (
					<div key={ index } className='flex flex-row items-center'>
						<Link href={ data.url }>
							<ItemStyle className='px-1 py-1 max-sm:px-0.5'>
								<Text
									className='item-text text-ellipsis'
									fontSize='14px'
									lineHeight='17px'
									fontWeight={ (index + 1) < props.datas.length ? '400' : '900' }
									color={ (index + 1) < props.datas.length ? colors.grey.dark : colors.paradiso.default }
									text={ data.name }
								/>
							</ItemStyle>
						</Link>
						{
							(index + 1) < props.datas.length ? <icons.ArrowRight className='w-[15px] h-[15px]' /> : null
						}
					</div>
				))
			}
		</div>
	);
};

export default Breadcrumbs;