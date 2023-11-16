import { useRouter, useParams, usePathname } from 'next/navigation';

/**
 *
 * @deprecated this helper will be replaced / removed since next js did not use react-router-dom
 */
const Navigation = () => {
	const navigate = useRouter();
	const params = useParams();
	const pathname = usePathname();

	// Migrate
	// const { state, search } = useLocation();

	// const useQuery = () => {
	// 	return React.useMemo(() => new URLSearchParams(search), [search]);
	// };
	// const query = useQuery();

	return {
		navigate,
		// state,
		pathname,
		params,
		// query
	};
};

export default Navigation;
