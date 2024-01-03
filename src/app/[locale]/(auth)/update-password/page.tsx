import { getProfile } from '@/lib/api/profile';
import UpdatePasswordContent from './UpdatePasswordContent';
import AuthError from '@/components/Layout/AuthError';

export default async function Page() {
	const profile = await getProfile();

	if (profile?.stat_code !== 'APP:SUCCESS') {
		return (
			<AuthError errorMessage={ profile?.stat_msg }>
				<UpdatePasswordContent patientProfile={ null } />
			</AuthError>
		);
	}

	return (
		<UpdatePasswordContent patientProfile={ profile?.data } />
	);
}