import { getCurrentLocale } from '@/helpers/cookies';
import Image from 'next/image';
import Link from 'next/link';

const HeaderBrand = async() => {
	const locale = await getCurrentLocale();
	return (
		<Link href={ `/${locale}` } className='relative overflow-hidden w-[70px] h-8 lg:w-[132px] lg:h-[60px]'>
			<Image
				src='/images/logo_rspi.svg'
				alt='rspi-logo'
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				fill
			/>
		</Link>
	);
};

export default HeaderBrand;