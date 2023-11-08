import { FormEvent, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useRouter } from 'next/navigation';

import { Images, Languages, colors } from '@/constant';
import { Button, Text, Form, NotificationPanel } from '@/components';
import useResetEmail from './useResetEmail';
import SpinVerification from '@/components/SpinVerification';
import { useTypedSelector } from '@/hooks';
import { ChangeEmailPayload, UserState } from '@/interface';
import useAppDispatch, { useAppAsyncDispatch } from '@/hooks/useAppDispatch';
import { changeEmail, verifyEmailToken } from '@/stores/actions';
import { removeUser as removeUserData } from '@/stores/User';
import { isEmpty } from 'lodash';

const {
	heading,
	subHeading,
	resetForm: {
		newEmailLabel,
		newEmailPlaceHolder,
		resetBtnLabel,
	}
} = Languages.page.resetEmail;

const ResetEmailPage = () => {
	const navigate = useRouter();
	const [searchParams, setSearchParams] = useSearchParams();
	const { resetEmailField } = useResetEmail();
	const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
	const [tokenVerified, setTokenVerified] = useState<boolean>(false);

	const [formError, setFormError] = useState<string[]>([]);
	const verifyEmailTokenDispatch = useAppAsyncDispatch(verifyEmailToken);
	const changeEmailDispatch = useAppAsyncDispatch<ChangeEmailPayload>(changeEmail);

	const { error } = useTypedSelector<UserState>('user');
	const userSelector = useTypedSelector<UserState>('user');
	const { user, userDetail } = userSelector;
	const isLoggedIn = !!user.token;
	const removeUser = useAppDispatch(removeUserData);

	const {
		onSubmit, registeredValue, isFormValid
	} = Form.useForm({ fields: resetEmailField });

	useEffect(() => {
		hasToken();
	}, []);

	const hasToken = async () => {
		try {
			if (!searchParams.get('token')) return navigate.replace('/login');

			// verify token if present
			setVerificationStatus('loading');
			await verifyEmailTokenDispatch({
				queryParam: {
					token: searchParams.get('token')
				}
			});
			setVerificationStatus('success');

			// need timeout to wait for animation
			setTimeout(() => {
				setTokenVerified(true);
				if (isLoggedIn) {
					removeUser();
				}
				navigate.replace('/login');
			}, 1200);

		} catch (error) {
			setVerificationStatus('failed');
		}
		// redirect to login page if user manualy navigate to this page
	};

	if (!tokenVerified)
		return <SpinVerification status={ verificationStatus } />;

	return null;
};

export default ResetEmailPage;