import colors from '../../../constant/colors';
import LanguageSelector from '../../../components/ui/LanguageSelector';
import Text from '../../../components/ui/Text';

import WhiteInstagram from '/public/images/ic/whiteInstagram.svg';
import WhiteFacebook from '/public/images/ic/whiteFacebook.svg';
import WhiteTwitter from '/public/images/ic/whiteTwitter.svg';

export const MainNavLanguage = () => {

	const handleOpenSocmed = (links: string) => () => {
		window.open(links, '_blank');
	};

	return (
		<div
			className='hidden sm:flex items-center h-[40px] animate-slideUpToDown transition-all duration-300'
			style={ { background: colors.paradiso.default } }
		>
			<div className='flex justify-between w-full mx-[40px]'>
				<div className='flex divide-x divide-solid gap-[20px]'>
					<a href='/contact-us'>
						<Text fontSize='14px' fontWeight='400' color='white'>
							Contact Us
						</Text>
					</a>
					<div className='flex gap-[30px]'>
						<div className='flex items-center ml-[20px] cursor-pointer' onClick={ handleOpenSocmed('https://www.instagram.com/rspondokindah/') }>
							<WhiteInstagram className='mr-1' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</div>
						<div className='flex items-center cursor-pointer' onClick={ handleOpenSocmed('https://twitter.com/rspondokindah') }>
							<WhiteTwitter className='mr-1' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</div>
						<div className='flex items-center cursor-pointer' onClick={ handleOpenSocmed('https://www.facebook.com/RumahSakitPondokIndah') }>
							<WhiteFacebook className='mr-1' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</div>
					</div>
				</div>
				<div className='flex items-center divide-x divide-solid'>
					<LanguageSelector />
				</div>
			</div>
		</div>
	);
};

export default MainNavLanguage;