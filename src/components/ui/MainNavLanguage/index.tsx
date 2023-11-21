import colors from '@/constant/colors';
import LanguageSelector from '@/components/ui/LanguageSelector';
import Text from '@/components/ui/Text';
import useSession from '@/session/client';
import { useScopedI18n } from '@/locales/client';

import WhiteInstagram from '/public/images/ic/whiteInstagram.svg';
import WhiteFacebook from '/public/images/ic/whiteFacebook.svg';
import WhiteTwitter from '/public/images/ic/whiteTwitter.svg';
import Link from 'next/link';


export const MainNavLanguage = () => {
	const session = useSession();
	const t = useScopedI18n('page.topNav');

	const isLoggedIn = !!session?.token;

	const handleOpenSocmed = (links: string) => () => {
		window.open(links, '_blank');
	};

	const renderWelcomeText = () => {
		// Migrate
		const userIdentity = session?.user?.no_mr
			? session?.user?.name
			: session?.user?.email;

		const welcomeText = isLoggedIn
			? `${ t('welcome') }, ${ userIdentity }`
			: t('welcome');

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
					<Link href='/contact-us'>
						<Text fontSize='14px' fontWeight='400' color='white'>
							Contact Us
						</Text>
					</Link>
					<div className='flex gap-[30px] pl-5'>
						<div className='flex items-center cursor-pointer' onClick={ handleOpenSocmed('https://www.instagram.com/rspondokindah/') }>
							<WhiteInstagram className='mr-[5px]' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</div>
						<div className='flex items-center cursor-pointer' onClick={ handleOpenSocmed('https://twitter.com/rspondokindah') }>
							<WhiteTwitter className='mr-[5px]' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</div>
						<div className='flex items-center cursor-pointer' onClick={ handleOpenSocmed('https://www.facebook.com/RumahSakitPondokIndah') }>
							<WhiteFacebook className='mr-[5px]' />
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