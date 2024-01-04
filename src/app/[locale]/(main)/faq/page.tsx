'use server';
import { getScopedI18n } from '@/locales/server';
import FAQDatas from '../contact/FAQDatas';
import FaqDetail from './detail';

export default async function Page({ params }:{params:{id:string}}) {
	const faqData = await FAQDatas();
	const t = await getScopedI18n('page.contactUs.faq');
	
	const breadCrumbsPath = [
		{ name: t('contactUsLabel'), url: '/contact' },
		{ name: t('heading'), url: '/contact/faq' }
	];

	if (params.id) {
		breadCrumbsPath.push({ name: faqData[parseInt(params.id as string)].title, url: '#' });
	}
	
	return <FaqDetail faqDatas={ faqData } breadCrumbPath={ breadCrumbsPath } subHeading={ t('subHeading') }/>;
}