'use client';
import { I18nProviderClient, useCurrentLocale } from '@/locales/client';
import { PropsWithChildren, PropsWithRef } from 'react';

type Props = PropsWithRef<PropsWithChildren<any>>

const LangWrapper = ({ children, ...props }:Props) => {
  
	const currentLocale = useCurrentLocale();
 
	return (
		<I18nProviderClient locale={ currentLocale }>
			{ children }
		</I18nProviderClient>
	);
};

export default LangWrapper;