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
     left-0 top-0 bg-white w-full z-10 absolute ${className} h-full
    `  } >
			<label htmlFor={ triggerId } className='p-4 flex h-[52px] items-center bg-[#F0F2F9] gap-2 border-b-[1px] border-solid border-[#EAEAEA]'>
				<Icons.ArrowLeft size={ 20 } color={ colors.grey.darkOpacity } />
				<Text fontSize='16px' fontWeight='700'>{ label }</Text>
			</label>
			<div className='overflow-y-auto h-[calc(100vh-156px)]'>
				{
					data?.map((item, index) => {
						return (
							<Link href={ `/${urlPrefix}/${item.slug}` } key={ `sub-menu-${index}-${urlPrefix}` } replace={ true }>
								<div className='p-4 border-b-[1px] border-solid border-gray-200'>
									<Text text={ item.label } fontSize='16px' fontWeight='700' />
								</div>
							</Link>
						);
					})
				}
			</div>
			
		</MobileSubMenuWrapper>
	);
};

export default MobileSubMenus;