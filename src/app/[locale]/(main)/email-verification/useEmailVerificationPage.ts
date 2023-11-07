import { verifyEmail as verifyEmailAction } from '@/stores/actions';
import { useAppDispatch } from '@/hooks';

const useEmailVerificationPage = () => {
	const verifyEmail = useAppDispatch(verifyEmailAction);
	const onEmailVerification = ({ token }: any) => {
		verifyEmail({
			queryParam: {
				token
			}
		});
	};

	return {
		onEmailVerification,
	};
};

export default useEmailVerificationPage;
