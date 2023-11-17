'use client';

import { useState } from 'react';

import { icons, sosmedLink } from '@/constant';
import { Text } from '@/components/ui';
import Image from 'next/image';

interface PropsType {
	id?: number;
}

const buttonSocmed = [
	{
		action: 'link',
		url: sosmedLink.twitter,
		label: 'Twitter',
		icon: <icons.TwitterIcon width='16px' height='13px' />
	},
	{
		action: 'link',
		url: sosmedLink.facebook,
		label: 'Facebook',
		icon: <icons.FacebookIcon width='16px' height='16px' />
	},
	{
		action: 'link',
		url: sosmedLink.linkedin,
		label: 'LinkedIn',
		icon: <icons.LinkedIn width='16px' height='16px' />
	},
];

const Share = (props: PropsType) => {
	const [isHoverShare, setIsHoverShare] = useState(false);

	const toggleMouseHoverShare = (hovered: boolean) => () => {
		setIsHoverShare(hovered);
	};

	const copy = () => {
		navigator.clipboard.writeText(window.location.href + '/' + props.id)
			.then(() => {
				alert('URL Link copied');
			});
	};

	return (
		<div onMouseEnter={ toggleMouseHoverShare(true) } onMouseLeave={ toggleMouseHoverShare(false) } className='w-full'>
			<div className='absolute right-0 mr-[10px] mt-[10px]'>
				<icons.SocialShare />
			</div>
			<div
				className={ `${ isHoverShare === false ? 'hidden' : 'fixed right-0 mr-[10px] mt-[50px] rounded-[10px]' } mt-[15px] bg-white divide-y divide-gray-100 shadow custom-scrollbar` }
				onMouseEnter={ toggleMouseHoverShare(true) }
				onMouseLeave={ toggleMouseHoverShare(false) }
			>
				<ul className='text-sm text-gray-700' aria-labelledby='dropdownDefault'>
					{ buttonSocmed.map((item, idx) => (
						<div
							key={ idx }
							className='border-b border-gray flex py-4 px-4 items-center'
							onClick={ () => window.open(item?.url + window.location.href + '/' + props.id) }
						>
							{ item?.icon }
							<div className='ml-[10px]'>
								<Text text={ item?.label } fontSize='16px' fontWeight='400' />
							</div>
						</div>
					)) }
					<div
						className='border-b border-gray flex py-4 px-4 items-center'
						onClick={ copy }
					>
						<icons.ShareNetwork />

						<div className='ml-[10px]'>
							<Text text={ 'Share Link' } fontSize='16px' fontWeight='400' />
						</div>
					</div>
				</ul>
			</div>
		</div>
	);
};

export default Share;