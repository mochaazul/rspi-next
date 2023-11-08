import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom'; //migrate

const ScrollToTopOnTransition = () => {
	// const { pathname } = useLocation(); // migrate

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []); //pathname inside listener // migrate

	return null;
};

export default ScrollToTopOnTransition;
