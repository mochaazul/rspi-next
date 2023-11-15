'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

import {
	facilitiesPageEvent,
	findDoctorEvent,
	landingPageEvent,
	newsPageEvent,
	promoPageEvent,
	clinicPageEvent
} from '@/utils/metaPixelTrack';

const FacebookPixel = () => {
	const pathname = usePathname();

	useEffect(() => {
		const customEvent = () => {
			// TODO: adjust jika ada perubahan path dan hapus event dari useEffect di setiap page berikut.
			if (['/', '/en', '/id'].includes(pathname)) return landingPageEvent();
			if (pathname.includes('facilities-services')) return facilitiesPageEvent();
			if (pathname === '/find-a-doctor') return findDoctorEvent();
			if (pathname === '/news') return newsPageEvent();
			if (pathname === '/promo') return promoPageEvent();
			if (pathname === '/centre-of-excellence') return clinicPageEvent();
		};

		customEvent();
	}, [pathname]);

	return (
		<Script
			id='fb-pixel'
			defer
			strategy='afterInteractive'
		>
			{ `
				!function(f,b,e,v,n,t,s)
				{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
				n.callMethod.apply(n,arguments):n.queue.push(arguments)};
				if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
				n.queue=[];t=b.createElement(e);t.async=!0;
				t.src=v;s=b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t,s)}(window, document,'script',
				'https://connect.facebook.net/en_US/fbevents.js');
				fbq('init', '${ process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID as string }');
				fbq('track', 'PageView');
			` }
		</Script>
	);
};

export default FacebookPixel;