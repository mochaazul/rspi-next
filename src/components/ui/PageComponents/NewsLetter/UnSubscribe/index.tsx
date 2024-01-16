import { Images, colors, icons } from '@/constant';
import { useScopedI18n } from '@/locales/client';
import Text from '@/components/ui/Text';

import { UnSubscribeStyle } from './style';
import LoadingSkeleton from '@/components/Layout/LoadingSkeleton';
import Image from 'next/image';
interface PageUnSubscribeProps {
	success: string;
	message: string;
}
const PageUnSubscribe: React.FC<PageUnSubscribeProps> = ({ success, message }) => {

	const t = useScopedI18n('page.unsubscribe');

	return (
		<UnSubscribeStyle>
			<div className='mb-[32px]'>
				<Image
					src='/images/logo_rspi.svg'
					alt='rspi-logo'
					width={ 250 }
					height={ 120 }
				/>
			</div>
			<div className='flex flex-col items-center justify-center w-[500px] max-sm:w-[90%] shadow-2xl p-10 rounded-xl'>
				<div className='pt-5 mb-[24px]'>
					{ success === '' ? <LoadingSkeleton type='block'/> :
						success === 'Success' ? <icons.Confirmed /> : <div className='p-4 bg-gray-200 rounded-full'><icons.Close /></div>
					}
				</div>
				{ success === '' ? <LoadingSkeleton type='line'/> :
					<div className='flex items-center justify-center flex-col'>
						<Text
							fontType='h2'
							fontSize='20px'
							color='#000000'
							subClassName='max-lg:leading-6 mb-3'
						>
							{ success ? t('headingSuccess') : t('headingFailed') }
						</Text>
						<Text
							fontType='h4'
							fontSize='14px'
							color={ colors.grey.dark }
							className='sm:mt-2'
							subClassName='max-lg:leading-6 text-center'
						>
							{ success ? t('subHeadingSuccess') : t('subHeadingFailed') + '-' + message }
						</Text>
					</div>
				}
			</div>
		</UnSubscribeStyle >
	);
};

export default PageUnSubscribe;