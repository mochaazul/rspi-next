import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useTypedSelector } from '@/hooks';
import { UserState } from '@/interface';
import { Button, Spinner, Text } from '@/components';
import { icons } from '@/constant';

import useEmailVerificationPage from './useEmailVerificationPage';
import { EmailVerificationStyle } from './style';
import languages from '@/constant/languages';

const EmailVerificationPage = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const { onEmailVerification } = useEmailVerificationPage();
	const { loading, error } = useTypedSelector<UserState>('user');
	const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

	const [status, setStatus] = useState<'' | 'loading' | 'success' | 'failed'>('');

	const handleBackLogin = () => {
		navigate('/login');
	};

	const handleNavigateSuccess = () => {
		navigate('/register-onboard');
	};

	useEffect(() => {
		setStatus('loading');
	}, []);

	useEffect(() => {
		if (status === 'loading') {
			const token: string = searchParams.get('token') ?? '';
			onEmailVerification({ token });
		}
	}, [status]);

	useEffect(() => {
		if (!loading && status === 'loading') {
			if (error.stat_msg) {
				setStatus('failed');
				return;
			}
			setStatus('success');
			setIsEmailVerified(true);
			setTimeout(handleNavigateSuccess, 2000);
		}
	}, [loading, error]);

	return (
		<EmailVerificationStyle>
			<div className='status-cont'>
				<div className={ `status loading ${ status === 'loading' ? 'active' : '' }` }>
					<Spinner size='xl' />
				</div>
				<div className={ `status success ${ status === 'success' ? 'active' : '' }` }>
					<div className='icon-cont'>
						<icons.Check className='svg-white' />
					</div>
				</div>
				<div className={ `status failed ${ status === 'failed' ? 'active' : '' }` }>
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
						text='Mohon Tunggu Sebentar...'
						className={ `loading ${ status === 'loading' ? 'active' : '' }` }
						subClassName='text-center'
					/>
					<Text
						fontSize='32px'
						fontWeight='900'
						lineHeight='48px'
						text='Validation Succesfull'
						className={ `success ${ status === 'success' ? 'active' : '' }` }
						subClassName='text-center'
					/>
					<Text
						fontSize='32px'
						fontWeight='900'
						lineHeight='48px'
						text={ languages.validation.tokenValidation.failed }
						className={ `failed ${ status === 'failed' ? 'active' : '' }` }
						subClassName='text-center'
					/>
				</div>
				<div className={ `back-login ${ status !== 'failed' ? 'invisible' : '' }` }>
					<Button
						theme='primary'
						hoverTheme='outline'
						label='Back to Login'
						onClick={ handleBackLogin }
					/>
				</div>
			</div>
		</EmailVerificationStyle>
	);
};

export default EmailVerificationPage;