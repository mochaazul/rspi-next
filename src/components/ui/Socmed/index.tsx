'use client';
import React from 'react';
import { icons, } from '@/constant';
import SocmedStyle from './style';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	withBackground?: boolean;
	isDark?: boolean;
}

const Socmed: React.FC<Props> = ({ withBackground, isDark }: any) => {
	
	return (
		<SocmedStyle>
			<div className={ withBackground ? 'socmed-bg-content' : 'socmed-container' }>
				<Link href='https://www.facebook.com/RumahSakitPondokIndah' target='_blank' className={ isDark ? 'dark-content' : 'content' }>
					<Image src='/images/ic/facebook.svg' width={ 16 } height={ 16 } alt='RSPI Facebook'/>
				</Link>
				<Link href='https://twitter.com/rspondokindah' target='_blank' className={ isDark ? 'dark-content' : 'content' }>
					<Image src='/images/ic/twitter_x.svg' width={ 16 } height={ 16 } alt='RSPI Facebook'/>
				</Link>
				<Link href='https://www.youtube.com/channel/UC4h7C4VVkb7B4Q_ogHxt7fw' target='_blank' className={ isDark ? 'dark-content' : 'content' }>
					<Image src='/images/ic/youtube.svg' width={ 16 } height={ 16 } alt='RSPI Facebook'/>
				</Link>
				<Link href='https://www.instagram.com/rspondokindah/' target='_blank' className={ isDark ? 'dark-content' : 'content' }>
					<Image src='/images/ic/instagram.svg' width={ 16 } height={ 16 } alt='RSPI Facebook'/>
				</Link>
			</div>
		</SocmedStyle>
	);
};

export default Socmed;
