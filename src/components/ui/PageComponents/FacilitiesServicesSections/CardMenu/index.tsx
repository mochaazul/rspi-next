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
		<div className='bg-[#FAFAFA] rounded-[5px] border border-[#D4D2D8] w-full sm:max-w-[349px] lg:max-w-[349px] xl:w-[349px] p-4 sm:p-6 flex flex-col gap-y-2 md:gap-y-[15px]'>
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
								subClassName='max-sm:text-xs hover:!text-[#358888]'
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