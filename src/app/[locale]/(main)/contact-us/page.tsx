
import { getHospital } from '@/lib/api/hospital';
import ContactUsPage from './ContactUsPage';
import { getScopedI18n } from '@/locales/server';

const ContactUs = async () => {
	const hospitals = await getHospital();
	const t = await getScopedI18n('page.contactUs');

	return (
		<ContactUsPage
			hospitalSelector={ hospitals.data }
			breadcrumbsPath={ [{ name: t('heading'), url: '/contact' }] }
		/>
	);
};

export default ContactUs;
