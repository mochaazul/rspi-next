import Link from 'next/link';

import { colors } from '@/constant';
import { FacilityServicesDetail } from '@/interface';

import Text from '../../../Text';

type Props = {
	data: FacilityServicesDetail[];
	paramsSlug: string;
};

const CardMenu = ({ data, paramsSlug }: Props) => {
	return (
		<div className='cardMenu p-4 sm:p-6 flex flex-col gap-y-2 md:gap-y-[15px]'>
			{ data.map((item, index) => {
				return (
					<Link key={ index } href={ `/facilities/${ item.slug }` }>
						<div className='flex'>
							<Text
								text={ item.name }
								key={ index }
								className='cursor-pointer'
								fontSize='14px'
								fontWeight='700'
								lineHeight='21px'
								subClassName='max-sm:text-xs'
								color={ paramsSlug === item.slug ? colors.paradiso.default : colors.grey.dark }
							/>
						</div>
					</Link>
				);
			}) }
		</div>
	);
};

export default CardMenu;