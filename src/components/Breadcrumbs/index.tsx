import { Link } from 'react-router-dom';

import Text from 'components/Text';
import { colors, icons } from 'constant';

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
		<div className='flex flex-row ml-[-0.25rem]'>
			{
				datas.map((data, index) => (
					<div key={ index } className='flex flex-row items-center'>
						<Link to={ data.url }>
							<ItemStyle className='px-1 py-1 max-sm:px-0.5'>
								<Text
									className='item-text'
									fontSize='14px'
									lineHeight='17px'
									fontWeight={ (index + 1) < props.datas.length ? '400' : '900' }
									color={ (index + 1) < props.datas.length ? colors.grey.dark : colors.paradiso.default }
									text={ data.name }
								/>
							</ItemStyle>
						</Link>
						{
							(index + 1) < props.datas.length ? <icons.ArrowRight style={ { width: 15, height: 15 } } /> : null
						}
					</div>
				))
			}
		</div>
	);
};

export default Breadcrumbs;