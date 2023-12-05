import { getDoctorDetail } from '@/lib/api/doctors';

import BookingForm from './BookingForm';

type PageProps = {
	params: { [key: string]: string; };
	searchParams: { [key: string]: string; };
};

const Page = async (props: PageProps) => {
	const doctorResponse = await getDoctorDetail({ param: props.searchParams.doctor_code });

	return (
		<BookingForm doctorResponse={ doctorResponse } />
	);
};

export default Page;