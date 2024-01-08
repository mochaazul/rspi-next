'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { icons, sosmedLink } from '@/constant';
import Text from '@/components/ui/Text';

import { useHostname } from '@/utils/useHostname';

interface PropsType {
	slug?: string;
	className?: string;
}

const buttonSocmed = [
	{
		action: 'link',
		url: sosmedLink.twitter,
		label: 'Twitter',
		icon: <Image src='/images/ic/twitter_x_dark.svg' alt='RSPI twitter link' width={ 16 } height={ 16 } />
	},
	{
		action: 'link',
		url: sosmedLink.facebook,
		label: 'Facebook',
		icon: <Image src='/images/ic/facebook.svg' alt='RSPI Facebook link' width={ 16 } height={ 16 } />

	},
	{
		action: 'link',
		url: sosmedLink.linkedin,
		label: 'LinkedIn',
		icon: <Image src='/images/ic/LinkedIn/Negative.svg' alt='RSPI Linkedin link' width={ 16 } height={ 16 } />

	},
];

const Share = (props: PropsType) => {
	const hostname = useHostname({ fullUrl: false });

	const [isHoverShare, setIsHoverShare] = useState(false);

	const copy = () => {
		navigator.clipboard.writeText(hostname + '/' + props.slug)
			.then(() => {
				alert('URL Link copied');
			});
	};

	const handleClickSocialShare = (e: any) => {
		e.stopPropagation();
		setIsHoverShare(prevHover => !prevHover);
	};
	return (
		<div className={ `absolute right-0 mr-[10px] ${props?.className} mt-[10px] top-0 cursor-pointer flex flex-col items-end group` }>
			<div onClick={ handleClickSocialShare } className='pb-2 z-1'>
				<icons.SocialShare />
			</div>
			<div
				className={ 'hidden group-hover:block z-10 rounded-[10px] bg-white divide-y divide-gray-100 shadow custom-scrollbar' }
			>
				<div className='relative'>
					<ul className='text-sm text-gray-700 z-10 ' aria-labelledby='dropdownDefault'>
						{ buttonSocmed.map((item, idx) => (
							<Link
								key={ idx }
								className='border-b border-gray flex py-4 px-4 items-center'
								href={ item?.url + hostname + '/' + props.slug }
								target='_blank'
							>
								{ item?.icon }
								<div className='ml-[10px]'>
									<Text text={ item?.label } fontSize='16px' fontWeight='400' subClassName='hover:text-green-secondary' />
								</div>
							</Link>
						)) }
						<div
							className='flex py-4 px-4 z-10 items-center'
							onClick={ copy }
						>
							<icons.ShareNetwork className='w-4' />

							<div className='ml-[10px]'>
								<Text text={ 'Copy Link' } fontSize='16px' fontWeight='400' subClassName='hover:text-green-secondary' />
							</div>
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Share;