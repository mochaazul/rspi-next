import { PropsWithChildren, PropsWithRef } from 'react';
import { MobileSubMenuWrapper } from './style';
import { Text } from '@/components/ui';
import { colors } from '@/constant';
import * as Icons from 'react-feather';
import Link from 'next/link';

export type MenuEntry = {
  id?: number
  label: string
  slug: string
}
type Props = PropsWithRef<PropsWithChildren<{
  props?: any
  label: string
  data?: MenuEntry[]
  triggerId: string
  className?: string
  urlPrefix: string
}>>

const MobileSubMenus = ({ label, data, triggerId, className, urlPrefix }:Props) => {
	
	return (
		<MobileSubMenuWrapper className={ `
     left-0 top-0 h-screen bg-white w-full z-40 absolute divide-y ${className}
    `  } >
			<label htmlFor={ triggerId } className='p-4 bg-[#F0F2F9] flex items-center gap-2 '>
				<Icons.ArrowLeft size={ 20 } color={ colors.grey.darkOpacity } />
				<Text fontSize='16px' fontWeight='700'>{ label }</Text>
			</label>
			{
				data?.map((item, index) => {
					return (
						<Link href={ `/${urlPrefix}/${item.slug}` } key={ `sub-menu-${index}-${urlPrefix}` }>
							<div className='nav-menu'>
								<Text text={ item.label } fontSize='16px' fontWeight='700' />
							</div>
						</Link>
					);
				})
			}
			
		</MobileSubMenuWrapper>
	);
};

export default MobileSubMenus;