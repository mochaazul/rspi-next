
import { Images, colors } from '@/constant';
import Text from '@/components/ui/Text';

import { getScopedI18n } from '@/locales/server';

import { UnSubscribeStyle } from './style';

export default async function UnSubscribe() {
	const t = await getScopedI18n('unsubscribe');
	return (
		<UnSubscribeStyle>
			<div className='grid max-sm:grid-cols-1 grid-cols-1 max-sm:gap-0 gap-3 w-full'>
				<div className='col-span-2'>
					<div className='mb-[32px] flex flex-col items-center'>
						<Images.LogoRSPI />
					</div>
					<div className=''>
						<Text
							fontType='h2'
							fontSize='20px'
							color={ colors.grey.dark }
							className='mt-2 sm:mt-4'
							subClassName='max-lg:text-base max-lg:leading-6'
						>
							{ t('heading') }
						</Text>
						<Text
							fontType='h4'
							fontSize='20px'
							color={ colors.grey.dark }
							className='mt-2 sm:mt-4'
							subClassName='max-lg:text-base max-lg:leading-6'
						>
							{ t('subHeading') }
						</Text>
					</div>
				</div>
			</div>
		</UnSubscribeStyle >
	);
};