'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import SpinVerification from '@/components/ui/SpinVerification';
import { cookiesHelper } from '@/helpers';
import { useVerifyChangeEmailToken } from '@/lib/api/client/auth';

const ResetEmailPage = () => {
	const navigate = useRouter();
	const searchParams = useSearchParams()!;

	const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
	const [tokenVerified, setTokenVerified] = useState<boolean>(false);

	const { trigger: verifyChangeEmail } = useVerifyChangeEmailToken();

	const hasToken = async () => {
		try {
			if (!searchParams.get('token')) return navigate.replace('/login');

			// verify token if present
			setVerificationStatus('loading');
			await verifyChangeEmail({
				token: searchParams.get('token') ?? ''
			});

			setVerificationStatus('success');

			const accessToken = await cookiesHelper.getToken();

			if (accessToken) {
				await cookiesHelper.clearStorage();
			}
			// need timeout to wait for animation
			setTimeout(() => {
				setTokenVerified(true);
				navigate.replace('/login?ref=reset&stat=email');
			}, 1200);

		} catch (error) {
			setVerificationStatus('failed');
		}
		// redirect to login page if user manualy navigate to this page
	};

	useEffect(() => {
		hasToken();
	}, []);

	if (!tokenVerified)
		return <SpinVerification status={ verificationStatus } />;

	return null;
};

export default ResetEmailPage;