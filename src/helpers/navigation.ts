import React from 'react';
<<<<<<< HEAD
// import { useNavigate, useLocation, useParams } from 'react-router-dom'; // migrate
||||||| parent of 952c203 ([Link, Navigate] Replace Link and useNavigate with Link and useRouter from Next API)
import { useNavigate, useLocation, useParams } from 'react-router-dom';
=======
import { useLocation, useParams } from 'react-router-dom';
import { useRouter } from 'next/navigation';
>>>>>>> 952c203 ([Link, Navigate] Replace Link and useNavigate with Link and useRouter from Next API)

const Navigation = () => {
<<<<<<< HEAD
	// Migrate
	// const navigate = useNavigate();
	// const params = useParams();
||||||| parent of 952c203 ([Link, Navigate] Replace Link and useNavigate with Link and useRouter from Next API)
	const navigate = useNavigate();
	const params = useParams();
=======
	const navigate = useRouter();
	const params = useParams();
>>>>>>> 952c203 ([Link, Navigate] Replace Link and useNavigate with Link and useRouter from Next API)

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
