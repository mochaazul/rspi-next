'use client';
import { Text } from '@/components/ui';
import { sosmedLink } from '@/constant';
import { useScopedI18n } from '@/locales/client';
import { useHostname } from '@/utils/useHostname';
import Image from 'next/image';
import Link from 'next/link';

const SocialShare = () => {
	const hostname = useHostname({ fullUrl: true });

	const t = useScopedI18n('global');

	const getLinkShareSocmed = (link: any) => {
		return link + hostname;
	};
  
	return (
		<div className='flex items-center gap-[30px] mt-[10px] sm:mx-0 mx-[16px]'>
			<div className='flex gap-[15px] items-center'>
				<Text
					fontType='p'
					lineHeight='24px'
					fontSize='20px'
					fontWeight='400'
					text={ t('share') }
					subClassName='leading-[24px] text-gray-1'
				/>
				<div className='flex gap-[15px]'>
					<Link href={ getLinkShareSocmed(sosmedLink.facebook) ?? '' } target='_blank' className='cursor-pointer' >
						<Image src='/images/ic/facebook.svg' alt='RSPI Facebook link' width={ 16 } height={ 16 } />
					</Link>
					<Link href={ getLinkShareSocmed(sosmedLink.twitter) ?? '' } target='_blank' className='cursor-pointer' >
						<Image src='/images/ic/twitter_x_dark.svg' alt='RSPI twitter link' width={ 16 } height={ 16 } />
					</Link>
					<Link href={ getLinkShareSocmed(sosmedLink.linkedin) ?? '' } target='_blank' className='cursor-pointer' >
						<Image src='/images/ic/LinkedIn/Negative.svg' alt='RSPI Linkedin link' width={ 16 } height={ 16 } />
					</Link>
					<div className='cursor-pointer' onClick={ () => {
						navigator?.clipboard?.writeText(window?.location?.href).then(() => {
							alert('URL Link copied');
						});
					} }>
						<Image src='/images/ic/Link.svg' alt='RSPI link' width={ 16 } height={ 16 } />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SocialShare;