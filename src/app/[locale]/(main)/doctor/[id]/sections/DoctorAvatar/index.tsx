import React from 'react';
import Image from 'next/image';
import ShareDoctor from '../ShareDoctor';

type Props = {
	profile_url?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const DoctorAvatar: React.FC<Props> = ({ profile_url, className }) => {
	const imgUrl = profile_url ?? '/images/samples/default-avatar.jpg';

	return <>
		<div className={ `mb-[30px] max-sm:flex max-sm:justify-center ${ className }` }>
			<div className='object-cover rounded lg:w-[254px] lg:h-[304px] w-[118px] h-[118px] relative'>
				<Image src={ imgUrl } objectFit='cover' fill alt='doctor image' />
			</div>
			<ShareDoctor className='max-sm:hidden' />
		</div>
	</>;
};

export default DoctorAvatar;