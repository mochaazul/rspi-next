
import { getHospitals, } from '@/lib/api';
import ContactUsPage from './ContactUsPage';

const ContactUs = async() => {
	const hospitals = await getHospitals();

	return (
		<ContactUsPage
			hospitalSelector = { hospitals.data }
			breadcrumbsPath={ [{ name: 'Contact Us', url: '/contact-us' }] }
		/>
	);
};

export default ContactUs;
