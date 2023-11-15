import Link from 'next/link';

import Text from '@/components/Text';
import { colors, icons } from '@/constant';

import { ItemStyle } from './style';
import { isMobile } from 'react-device-detect';
import Image from 'next/image';

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
								<p className={ `item-text text-ellipsis ${ isMobile ? 'text-[10px]' : 'text-sm' } ${ (index + 1) < props.datas.length ? 'font-normal text-[#6a6d81]' : 'font-black text-[#358888]' }` }>
									{ data.name }
								</p>
							</ItemStyle>
						</Link>
						{
							(index + 1) < props.datas.length ? <Image src={ icons.ArrowRight } style={ { width: 15, height: 15 } } alt="" /> : null
						}
					</div>
				))
			}
		</div>
	);
};

export default Breadcrumbs;