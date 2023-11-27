'use client';

import Link from 'next/link';
import Image from 'next/image';

import images from '@/constant/images';
import { WrapperMobileAppBanner } from './style';
import Text from '@/components/ui/Text';
import { useScopedI18n } from '@/locales/client';
import { colors } from '@/constant';
import { appStoreMobileUrl, playStoreMobileUrl } from '@/constant/config';

const MobileAppBanner = () => {

	const t = useScopedI18n('page.landingPage.mobileAppBanner');

	return (
		<WrapperMobileAppBanner>
			<div className='sm:flex-1'>
				<div className='sm:hidden w-full'>
					<img className='mx-auto' src={ images.MobileGroup.src } />
				</div>

				<div className='flex flex-col sm:justify-center sm:items-center sm:h-[546px]'>
					<div>
						<Text fontSize='44px' fontWeight='900' lineHeight='51px' color={ colors.grey.darker }>
							{ t('heading') }
						</Text>
						<div className='mt-3'>
							<Text fontSize='20px' fontWeight='400' lineHeight='28px' color={ colors.grey.dark }>
								{ t('subHeading') }
							</Text>
						</div>
						<div className='mt-[40px]'>
							<Text text='Get the App' fontSize='20px' fontWeight='900' lineHeight='28px' />
							<div className='flex gap-[13px] mt-[10px]'>
								<Link
									href={ playStoreMobileUrl }
									target='_blank'
									rel='noopener noreferrer'
								>
									<Image src={ images.GooglePlay.src } alt='store-badge' width={ 158 } height={ 48 } className='w-[158px] h-[48px] max-lg:w-[132px] max-lg:h-[40px] cursor-pointer' />
								</Link>
								<Link
									href={ appStoreMobileUrl }
									target='_blank'
									rel='noopener noreferrer'
								>
									<Image src={ images.AppStore.src } alt='store-badge' width={ 158 } height={ 48 } className='w-[158px] h-[48px] max-lg:w-[132px] max-lg:h-[40px] cursor-pointer' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='max-sm:hidden sm:flex-1 ml-[15px]'>
				<div className='relative h-[546px] max-w-[580px] ml-auto'>
					<img src={ images.PhoneMockup1.src } className='absolute top-0 mr-[32px]' />
					<img src={ images.PhoneMockup2.src } className='absolute bottom-0 right-0' />
				</div>
			</div>
		</WrapperMobileAppBanner>
	);
};

export default MobileAppBanner;