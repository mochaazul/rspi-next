import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * @deprecated We need to refactor this, since we have differrent router now,
 * we need to implement scroll on top for next js
 */
const ScrollToTopOnTransition = () => {
	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [pathname]);

	return null;
};

export default ScrollToTopOnTransition;
