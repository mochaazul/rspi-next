import React from 'react';

import FacebookIcon from '/public/images/ic/facebook.svg';
import YoutubeIcon from '/public/images/ic/youtube.svg';
import InstagramIcon from '/public/images/ic/instagram.svg';
import TwitterIcon from '/public/images/ic/twitter.svg';

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
					<FacebookIcon />
				</div>
				<div onClick={ handleOpenSocmed('https://twitter.com/rspondokindah') } className={ isDark ? 'dark-content' : 'content' }>
					<TwitterIcon />
				</div>
				<div onClick={ handleOpenSocmed('https://www.youtube.com/channel/UC4h7C4VVkb7B4Q_ogHxt7fw') } className={ isDark ? 'dark-content' : 'content' }>
					<YoutubeIcon />
				</div>
				<div onClick={ handleOpenSocmed('https://www.instagram.com/rspondokindah/') } className={ isDark ? 'dark-content' : 'content' }>
					<InstagramIcon />
				</div>
			</div>
		</SocmedStyle>
	);
};

export default Socmed;
