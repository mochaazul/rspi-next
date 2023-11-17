import Image from 'next/image';
import React from 'react';
import * as Icons from 'react-feather';
import { usePathname } from 'next/navigation';

import { Text } from '@/components/ui';
import { Images } from '@/constant';

type Props = {
	profile_url: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ShareDoctor = (props: React.HTMLAttributes<HTMLDivElement>) => {
	const pathName = usePathname();

	const handleOpenSocmed = (link: string) => () => {
		window.open(link, '_blank');
	};

	return (
		<div className={ props.className }>
			<Text
				text={ 'Share This Doctor' }
				className='related lg:mt-[30px]  '
				fontWeight='900'
				fontSize='12px'
				lineHeight='24px'
			/>
			<div className='flex gap-[10px] mt-[20px] '>
				<div className='cursor-pointer' onClick={ handleOpenSocmed('https://www.facebook.com/RumahSakitPondokIndah') }>
					<Icons.Facebook
						width='16px'
						height='16px' />
				</div>
				<div className='cursor-pointer' onClick={ handleOpenSocmed('https://twitter.com/rspondokindah') }>
					<Icons.Twitter
						width='16px'
						height='16px' />
				</div>
				<div className='cursor-pointer' onClick={ handleOpenSocmed('https://www.linkedin.com/company/rumah-sakit-pondok-indah/') }>
					<Icons.Linkedin
						width='16px'
						height='16px'
					/>
				</div>
				<div className='cursor-pointer' onClick={ () => { navigator.clipboard.writeText(pathName); } }>
					<Icons.Link width='16px' height='16px' />
				</div>
			</div>
		</div>
	);
};

const DoctorAvatar: React.FC<Props> = ({ profile_url, className }) => {

	return <>
		<div className={ `mb-[30px] max-sm:flex max-sm:justify-center ${ className }` }>
			<img src={ profile_url ?? Images.DoctorProfile.src } className='object-cover rounded lg:w-[254px] lg:h-[304px] w-[118px] h-[118px]' />
			<ShareDoctor className='max-sm:hidden' />
		</div>
	</>;
};

export default DoctorAvatar;