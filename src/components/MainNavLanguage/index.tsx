import Link from 'next/link';
import Image from 'next/image';

import { Text } from '@/components';
import { colors, icons, Languages } from '@/constant';
import LanguageSelector from '@/components/LanguageSelector';
import { useTypedSelector } from '@/hooks';
import { UserState } from '@/interface';

const MainNavLanguage = () => {
	const { welcome } = Languages.topNav;

	const userSelector = useTypedSelector<UserState>('user');

	const isLoggedIn = !!userSelector?.user?.token;

	const handleOpenSocmed = (link: string) => () => {
		window.open(link, '_blank');
	};

	const renderWelcomeText = () => {
		const userIdentity = userSelector?.userDetail?.no_mr
			? userSelector?.userDetail?.name
			: userSelector?.userDetail?.email;
		const welcomeText = isLoggedIn
			? `${ welcome }, ${ userIdentity }`
			: welcome;

		return (
			<Text
				fontSize='14px'
				fontWeight='700'
				color={ colors.white.default }
				text={ welcomeText }
			/>
		);
	};

	return (
		<div
			className='hidden lg:flex items-center h-10 animate-slideUpToDown transition-all duration-300'
			style={ { background: colors.paradiso.default } }
		>
			<div className='flex justify-between w-full mx-10'>
				<div className='flex divide-x divide-white/20 gap-5'>
					<Link to='/contact-us'>
						<Text fontSize='14px' fontWeight='400' color='white'>
							Contact Us
						</Text>
					</Link>
					<div className='flex gap-[30px] pl-5'>
						<div className='flex items-center cursor-pointer' onClick={ handleOpenSocmed('https://www.instagram.com/rspondokindah/') }>
							<icons.WhiteInstagram className='mr-[5px]' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</div>
						<div className='flex items-center cursor-pointer' onClick={ handleOpenSocmed('https://twitter.com/rspondokindah') }>
							<icons.WhiteTwitter className='mr-[5px]' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</div>
						<div className='flex items-center cursor-pointer' onClick={ handleOpenSocmed('https://www.facebook.com/RumahSakitPondokIndah') }>
							<icons.WhiteFacebook className='mr-[5px]' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</div>
					</div>
				</div>
				<div className='flex items-center divide-x divide-white/20 gap-5'>
					{ renderWelcomeText() }
					<div className='flex items-center pl-5'>
						<LanguageSelector />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainNavLanguage;