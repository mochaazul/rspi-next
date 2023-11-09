import React from 'react';
import Image from 'next/image';

import { icons } from '@/constant';

import SocmedStyle from './style';

interface Props {
	withBackground?: boolean;
	isDark?: boolean;
}

const Socmed: React.FC<Props> = ({ withBackground, isDark }: any) => {
	const handleOpenSocmed = (link: string) => () => {
		window.open(link, '_blank');
	};

	return (
		<SocmedStyle>
			<div className={ withBackground ? 'socmed-bg-content' : 'socmed-container' }>
				<div onClick={ handleOpenSocmed('https://www.facebook.com/RumahSakitPondokIndah') } className={ isDark ? 'dark-content' : 'content' }>
					<Image
						src={icons.FacebookIcon}
						alt=""
					/>
				</div>
				<div onClick={ handleOpenSocmed('https://twitter.com/rspondokindah') } className={ isDark ? 'dark-content' : 'content' }>
					<Image 
						src={icons.TwitterIcon}
						alt=""
					/>
				</div>
				<div onClick={ handleOpenSocmed('https://www.youtube.com/channel/UC4h7C4VVkb7B4Q_ogHxt7fw') } className={ isDark ? 'dark-content' : 'content' }>
					<Image 
						src={icons.YoutubeIcon}
						alt=""
					/>
				</div>
				<div onClick={ handleOpenSocmed('https://www.instagram.com/rspondokindah/') } className={ isDark ? 'dark-content' : 'content' }>
					<Image 
						src={icons.InstagramIcon}
						alt=""
					/>
				</div>
			</div>
		</SocmedStyle>
	);
};

export default Socmed;
