
import {
	getHospitals, postContactUs,
} from '@/lib/api';
import ContactUsPage from './ContactUsPage';
import { ContactUsSubmitType } from '@/interface';

const ContactUs = async () => {
	const hospitals = await getHospitals();

	return (
		<ContactUsPage
			hospitalSelector = { hospitals.data }
			breadcrumbsPath={[{ name: 'Contact Us', url: '/contact-us' }]}
		/>
	);
};

export default ContactUs;
