import { Link } from 'react-router-dom';

import { Text } from '@/components';
import { colors, icons } from '@/constant';
import LanguageSelector from '@/components/LanguageSelector';

const MainNavLanguage = () => {
	const handleOpenSocmed = (link: string) => () => {
		window.open(link, '_blank');
	};

	return (
		<div
			className='hidden sm:flex items-center h-[40px] animate-slideUpToDown transition-all duration-300'
			style={ { background: colors.paradiso.default } }
		>
			<div className='flex justify-between w-full mx-[40px]'>
				<div className='flex divide-x divide-solid gap-[20px]'>
					<Link to='/contact-us'>
						<Text fontSize='14px' fontWeight='400' color='white'>
							Contact Us
						</Text>
					</Link>
					<div className='flex gap-[30px]'>
						<div className='flex items-center ml-[20px] cursor-pointer' onClick={ handleOpenSocmed('https://www.instagram.com/rspondokindah/') }>
							<icons.WhiteInstagram className='mr-1' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</div>
						<div className='flex items-center cursor-pointer' onClick={ handleOpenSocmed('https://twitter.com/rspondokindah') }>
							<icons.WhiteTwitter className='mr-1' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</div>
						<div className='flex items-center cursor-pointer' onClick={ handleOpenSocmed('https://www.facebook.com/RumahSakitPondokIndah') }>
							<icons.WhiteFacebook className='mr-1' />
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