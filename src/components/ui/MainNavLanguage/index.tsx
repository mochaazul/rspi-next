import Link from 'next/link';

import colors from '@/constant/colors';
import LanguageSelector from '@/components/ui/LanguageSelector';
import Text from '@/components/ui/Text';
import { useScopedI18n } from '@/locales/client';
import { UserSessionData } from '@/interface';

import WhiteInstagram from '/public/images/ic/whiteInstagram.svg';
import WhiteFacebook from '/public/images/ic/whiteFacebook.svg';
import WhiteTwitter from '/public/images/ic/whiteTwitter.svg';

type MainNavLanguageProps = {
	session?: UserSessionData;
};

export const MainNavLanguage = ({ session }: MainNavLanguageProps) => {
	const t = useScopedI18n('page.topNav');

	const renderWelcomeText = () => {
		const userIdentity = !!session?.user?.no_mr && session?.user?.mr_active
			? session?.user?.name
			: session?.user?.email;

		const welcomeText = session?.isAuthenticated
			? `${ t('welcome') }, ${ userIdentity }`
			: t('welcome');

		return (
			<Text
				fontSize='14px'
				fontWeight='700'
				color={ colors.white.default }
				text={ welcomeText }
				subClassName='max-lg:text-right max-sm:text-xs'
			/>
		);
	};

	return (
		<div
			className='flex items-center h-10 w-full flex-shrink-0'
			style={ { background: colors.paradiso.default } }
		>
			<div className='flex lg:justify-between w-full px-4 lg:px-10'>
				<div className='hidden lg:flex divide-x divide-white/20 gap-5'>
					<Link href='/contact-us'>
						<Text fontSize='14px' fontWeight='400' color='white'>
							{ t('contactUs') }
						</Text>
					</Link>
					<div className='flex gap-[30px] pl-5'>
						<Link
							href='https://www.instagram.com/rspondokindah/'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center cursor-pointer'
						>
							<WhiteInstagram className='mr-[5px]' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</Link>
						<Link
							href='https://twitter.com/rspondokindah'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center cursor-pointer'
						>
							<WhiteTwitter className='mr-[5px]' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</Link>
						<Link
							href='https://www.facebook.com/RumahSakitPondokIndah'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center cursor-pointer'
						>
							<WhiteFacebook className='mr-[5px]' />
							<Text color='white' fontSize='12px' fontWeight='400'>
								@rspondokindah
							</Text>
						</Link>
					</div>
				</div>
				<div className='flex max-lg:flex-row-reverse items-center max-lg:justify-between max-lg:w-full lg:divide-x lg:divide-white/20 gap-5'>
					{ renderWelcomeText() }
					<div className='flex items-center lg:pl-5'>
						<LanguageSelector />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainNavLanguage;