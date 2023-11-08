import React from 'react';
import { useRouter, useParams } from 'next/navigation';

const Navigation = () => {
	const navigate = useRouter();
	const params = useParams();

	// const { state, pathname, search } = useLocation();

	// const useQuery = () => {
	// 	return React.useMemo(() => new URLSearchParams(search), [search]);
	// };
	// const query = useQuery();
	// End Migrate

	return {
		// Migrate
		// navigate,
		// state,
		// pathname,
		// params,
		// query
	};
};

export default Navigation;
