import React from 'react';
import {
	icons,
} from '@/constant';
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
					<icons.FacebookIcon />
				</div>
				<div onClick={ handleOpenSocmed('https://twitter.com/rspondokindah') } className={ isDark ? 'dark-content' : 'content' }>
					<icons.TwitterIcon />
				</div>
				<div onClick={ handleOpenSocmed('https://www.youtube.com/channel/UC4h7C4VVkb7B4Q_ogHxt7fw') } className={ isDark ? 'dark-content' : 'content' }>
					<icons.YoutubeIcon className='w-5 h-5' />
				</div>
				<div onClick={ handleOpenSocmed('https://www.instagram.com/rspondokindah/') } className={ isDark ? 'dark-content' : 'content' }>
					<icons.InstagramIcon />
				</div>
			</div>
		</SocmedStyle>
	);
};

export default Socmed;
