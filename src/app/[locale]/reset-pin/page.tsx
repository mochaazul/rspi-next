'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import SpinVerification from '@/components/ui/SpinVerification';
import { verifyPinEmail } from '@/lib/api/auth';

import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
	token?: string;
	authorization?: string;
}

const ResetPinPage = () => {
	const navigate = useRouter();
	const searchParams = useSearchParams()!;

	const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
	const [tokenVerified, setTokenVerified] = useState<boolean>(false);

	const hasToken = async () => {
		try {
			if (!searchParams.get('token')) return navigate.replace('/login');

			setVerificationStatus('loading');
			const token = searchParams.get('token');
			const decoded = jwtDecode<JwtPayload>(token || '', { header: false });
			const response = await verifyPinEmail(decoded.token ?? '', decoded.authorization ?? '');

			if (response?.stat_code === 'APP:SUCCESS') {
				setVerificationStatus('success');
				setTimeout(() => {
					setTokenVerified(true);
					navigate.replace('/pin-reset');
				}, 1200);
			} else {
				setVerificationStatus('failed');
			}
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

export default ResetPinPage;