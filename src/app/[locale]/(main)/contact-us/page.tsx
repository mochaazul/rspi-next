
import { getHospitals, } from '@/lib/api';
import ContactUsPage from './ContactUsPage';
import { getScopedI18n } from '@/locales/server';

const ContactUs = async () => {
	const hospitals = await getHospitals();
	const t = await getScopedI18n('page.contactUs');

	return (
		<ContactUsPage
			hospitalSelector={ hospitals.data }
			breadcrumbsPath={ [{ name: t('heading'), url: '/contact-us' }] }
		/>
	);
};

export default ContactUs;
