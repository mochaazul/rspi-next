'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { icons } from '@/constant';

import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import Text from '@/components/ui/Text';
import { verifyEmail } from '@/lib/api/auth';
import { useScopedI18n } from '@/locales/client';

import { EmailVerificationStyle } from './style';

const EmailVerificationPage = () => {
	const navigate = useRouter();
	const searchParams = useSearchParams()!;

	const [status, setStatus] = useState<'' | 'loading' | 'success' | 'failed'>('');

	const languages = useScopedI18n('validation.tokenValidation');

	const handleBackLogin = () => {
		navigate.replace('/login');
	};

	const handleNavigateSuccess = () => {
		navigate.replace('/register-onboard?isHome=false');
	};

	useEffect(() => {
		setStatus('loading');
	}, []);

	useEffect(() => {
		if (status === 'loading') {
			const onEmailVerification = async () => {
				try {
					const token: string = searchParams.get('token') ?? '';
					const response = await verifyEmail(token);

					if (response?.stat_code === 'APP:SUCCESS') {
						setStatus('success');
						setTimeout(handleNavigateSuccess, 2000);
					} else {
						setStatus('failed');
					}
				} catch (error) {
					setStatus('failed');
				}
			};

			onEmailVerification();
		}
	}, [status]);

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
						text={ `${ languages('loading') }...` }
						className={ `loading ${ status === 'loading' ? 'active' : '' }` }
						subClassName='text-center'
					/>
					<Text
						fontSize='32px'
						fontWeight='900'
						lineHeight='48px'
						text={ languages('success') }
						className={ `success ${ status === 'success' ? 'active' : '' }` }
						subClassName='text-center'
					/>
					<Text
						fontSize='32px'
						fontWeight='900'
						lineHeight='48px'
						text={ languages('failed') }
						className={ `failed ${ status === 'failed' ? 'active' : '' }` }
						subClassName='text-center'
					/>
				</div>
				<div className={ `back-login ${ status !== 'failed' ? 'invisible' : '' }` }>
					<Button
						theme='primary'
						label={ languages('backToLogin') }
						onClick={ handleBackLogin }
					/>
				</div>
			</div>
		</EmailVerificationStyle>
	);
};

export default EmailVerificationPage;