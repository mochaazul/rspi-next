
import {
	getHospitals, postContactUs,
} from '@/lib/api';
import ContactUsPage from './ContactUsPage';
import { ContactUsSubmitType } from '@/interface';

const ContactUs = async () => {
	const hospitals = getHospitals();

	return (
		<ContactUsPage
			hospitalSelector = {(await hospitals).data}
			breadcrumbsPath={[{ name: 'Contact Us', url: '/contact-us' }]}
		/>
	);
};

export default ContactUs;