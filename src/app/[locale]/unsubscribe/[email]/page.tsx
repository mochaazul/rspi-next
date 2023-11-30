
'use client';

import { useEffect, useState } from 'react';

import { NewsletterPayload } from '@/interface/newsletter';
import { useUnsubscribe } from '@/lib/api/client/newsletter';
import PageUnSubscribe from '@/components/ui/PageComponents/NewsLetter/UnSubscribe';

export default function UnSubscribe(props: { params: { email: any; }; }) {
	
	const { trigger: unSubscribe } = useUnsubscribe();
	const [type, setType] = useState('');
	const [msg, setMsg] = useState('');

	const unSubscribePayload: NewsletterPayload = {
		email: decodeURIComponent(props?.params?.email),
	};

	unSubscribe(unSubscribePayload).then(res => {
		setType(res.stat_msg ?? '');
		setMsg(res.stat_msg ?? '');
	});

	return <PageUnSubscribe success={ type } message={ msg } />;

};