import { useRouter } from 'next/navigation';

import { icons } from '@/constant';
import languages from '@/constant/languages';

import Button from '../Button';
import Spinner from '../Spinner';
import Text from '../Text';

import { SpinContainer } from './style';
import { useScopedI18n } from '@/locales/client';

type Props = {
	status?: 'loading' | 'success' | 'failed';
};

const SpinVerification = ({ status }: Props) => {
	const navigate = useRouter();
	const languages = useScopedI18n('validation.tokenValidation');

	// const session = useSession(); // TODO: uncomment after merge migration/login

	const handleBackLogin = async () => {
		// if (session.isAuthenticated) { // TODO: uncomment after merge migration/login
		// await cookiesHelper.clearStorage(); // TODO: uncomment after merge migration/login
		navigate.replace('/login');
		// }
	};

	return <SpinContainer>
		<div className='status-cont'>
			<div className={ `status loading ${ status === 'loading' && 'active' }` }>
				<Spinner size='xl' />
			</div>
			<div className={ `status success ${ status === 'success' && 'active' }` }>
				<div className='icon-cont'>
					<icons.Check className='svg-white' />
				</div>
			</div>
			<div className={ `status failed ${ status === 'failed' && 'active' }` }>
				<div className='icon-cont'>
					<icons.Close className='svg-white' />
				</div>
			</div>
		</div>
		<div>
			<div className='desc-cont'>
				<Text
					fontSize='32px'
					fontWeight='900'
					lineHeight='48px'
					text={ languages('loading') + '...' }
					className={ `loading ${ status === 'loading' && 'active' }` }
					subClassName='text-center'
				/>
				<Text
					fontSize='32px'
					fontWeight='900'
					lineHeight='48px'
					text={ languages('success') }
					className={ `success ${ status === 'success' && 'active' }` }
					subClassName='text-center'
				/>
				<Text
					fontSize='32px'
					fontWeight='900'
					lineHeight='48px'
					text={ languages('failed') }
					className={ `failed ${ status === 'failed' && 'active' }` }
					subClassName='text-center'
				/>
			</div>
			<div className={ `back-login failed ${ status !== 'failed' && 'hidden' }` }>
				<Button
					theme='primary'
					hoverTheme='outline'
					label={ languages('backToLogin') }
					onClick={ handleBackLogin }
				/>
			</div>
		</div>
	</SpinContainer>;
};

export default SpinVerification;