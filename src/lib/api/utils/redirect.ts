'use server';

import { redirect } from 'next/navigation';

export const redirectInvalidToken = (errMessage?: string) => {
	const shouldRedirectLogin = errMessage?.toLowerCase()?.includes('token is invalid')
		|| errMessage?.toLowerCase()?.includes('token is expired')
		|| errMessage?.toLowerCase()?.includes('signed out because your account is signed in from another device');

	if (shouldRedirectLogin) {
		redirect('/login?ref=invalid');
	}
};