import { Images, colors, icons } from '@/constant';
import { useScopedI18n } from '@/locales/client';
import Text from '@/components/ui/Text';

import { UnSubscribeStyle } from './style';
import LoadingSkeleton from '@/components/Layout/LoadingSkeleton';
interface PageUnSubscribeProps {
	success: string;
	message: string;
}
const PageUnSubscribe: React.FC<PageUnSubscribeProps> = ({ success, message }) => {

	const t = useScopedI18n('page.unsubscribe');

	return (
		<UnSubscribeStyle>
			<div className='mb-[32px]'>
				<Images.LogoRSPI />
			</div>
			<div className='flex flex-col items-center justify-center gap-3 w-[500px] shadow-2xl p-5 rounded-xl'>
				<div className='pt-5'>
					{ success === '' ? <LoadingSkeleton type='block'/> :
						success === 'Success' ? <icons.Confirmed /> : <div className='p-4 bg-gray-200 rounded-full'><icons.Close /></div>
					}
				</div>
				{ success === '' ? <LoadingSkeleton type='line'/> :
					<div className='flex items-center justify-center flex-col py-5'>
						<Text
							fontType='h2'
							fontSize='20px'
							color={ colors.grey.dark }
							subClassName='max-lg:text-base max-lg:leading-6'
						>
							{ success ? t('headingSuccess') : t('headingFailed') }
						</Text>
						<Text
							fontType='h4'
							fontSize='18px'
							color={ colors.grey.dark }
							className='sm:mt-2'
							subClassName='max-lg:text-base max-lg:leading-6 text-center'
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