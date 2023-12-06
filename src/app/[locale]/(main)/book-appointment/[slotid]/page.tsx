import { getDoctorDetail } from '@/lib/api/doctors';

import BookingForm from './BookingForm';
import { getFamilyProfiles, getProfile } from '@/lib/api/profile';

type PageProps = {
	params: { [key: string]: string; };
	searchParams: { [key: string]: string; };
};

const Page = async(props: PageProps) => {
	const doctorResponse 	= await getDoctorDetail({ param: props.searchParams.doctor_code });
	const familyProfiles 	= await getFamilyProfiles();
	const userProfile 		= await getProfile();
	return (
		<BookingForm doctorResponse={ doctorResponse } familyProfiles={ familyProfiles.data } userProfile={ userProfile.data }/>
	);
};

export default Page;