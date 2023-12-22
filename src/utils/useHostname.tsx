import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

export const useHostname = ({
    fullUrl,
}: {
    fullUrl?: boolean
}) => {
	const [hostname, setHostname] = useState('');
	const pathname = usePathname();

	useEffect(() => {
		if (typeof window && window.location.origin) {
            
			const currentUrl = fullUrl ? window.location.origin + pathname : window.location.origin;
			
			setHostname(currentUrl);
		}
	}, []);

	return hostname;
};
