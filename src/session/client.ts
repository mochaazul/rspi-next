'use client';

import { useEffect, useState } from "react";

import { cookiesHelper } from "@/helpers";
import { UserSessionData } from "@/interface";

const useSession = (): UserSessionData => {
	const [session, setSession] = useState<UserSessionData>({
		user: null,
		token: '',
		isAuthenticated: false
	});

	useEffect(() => {
		const getCookiesData = async () => {
			const userData = await cookiesHelper.getUserData();
			const token = await cookiesHelper.getToken();

			setSession({
				user: userData,
				token,
				isAuthenticated: !!token
			});
		};

		getCookiesData();
	}, []);

	return session;
};

export default useSession;