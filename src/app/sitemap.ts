import { getArticle, getCoe, getFooterSlug } from '@/lib/api';
import { getFAS } from '@/lib/api/clinics';
import { getAllEvents } from '@/lib/api/events';
import { getMedicalSpecialities } from '@/lib/api/facilities';
import { getHospital } from '@/lib/api/hospital';
import { MetadataRoute } from 'next';
 
const URL = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'https://www.rspondokindah.co.id';

const getIdn = async():Promise<MetadataRoute.Sitemap> => {
	const hospitals = await getHospital({ query: { is_active: true }, overideLang: 'idn' });
	const coe = await getCoe({ query: { is_active: true }, pagination: { limit: 99999 }, overideLang: 'idn' });
	const fas = await getFAS({ query: { is_active: true }, pagination: { limit: 99999 }, overideLang: 'idn' });
	const footer = await getFooterSlug({ query: { is_active: true }, pagination: { limit: 99999 }, overideLang: 'idn' });
	const medicalSpecialties = await getMedicalSpecialities({ query: { is_active: true }, pagination: { limit: 99999 }, overideLang: 'idn' });
	const articles = await getArticle({ query: { is_active: true },  pagination: { limit: 99999 }, overideLang: 'idn' });
	const promo = await getAllEvents({ query: { is_active: true },  pagination: { limit: 99999 }, overideLang: 'idn' });
	
	const hospitalSitemap:MetadataRoute.Sitemap = hospitals.data.map(hospital => {
		return {
			url: `${ URL }/id/hospital/${ hospital.slug }`,
			changeFrequency: 'weekly',
			lastModified: hospital.updated_date,
			priority: 1
		};
	});

	const coeSitemap:MetadataRoute.Sitemap = coe.data.map(item => {
		return {
			url: `${ URL }/id/center-of-excellence/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.updated_date,
			priority: 1
		};
	});
  
	const fasSitemap:MetadataRoute.Sitemap = fas.data.map(item => {
		return {
			url: `${ URL }/id/facilities-service/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.updated_date,
			priority: 1
		};
	});
  
	const footerSitemap: MetadataRoute.Sitemap = footer.data.map(item => {
		return {
			url: `${ URL }/id/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.updated_date,
			priority: 1
		};
	});

	const medspecSitemap: MetadataRoute.Sitemap = medicalSpecialties.data.map(item => {
		return {
			url: `${ URL }/id/medical-specialties/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.updated_date,
			priority: 1
		};
	});

	const articleSitemap: MetadataRoute.Sitemap = articles.data.map(item => {
		return {
			url: `${ URL }/id/news/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.created_at,
			priority: 1
		};
	});

	const promoSitemap: MetadataRoute.Sitemap = promo.data.map(item => {
		return {
			url: `${ URL }/id/promo/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.created_date,
			priority: 1
		};
	});

	const staticSitemap: MetadataRoute.Sitemap = [
		{ url: `${ URL }/id/find-a-doctor`, changeFrequency: 'weekly', lastModified: new Date(), priority: 1 },
		{ url: `${ URL }/id/promo`, changeFrequency: 'weekly', lastModified: new Date(), priority: 1 },
		{ url: `${ URL }/id/contact`, changeFrequency: 'yearly', lastModified: new Date(), priority: 1 },
		{ url: `${ URL }/id/contact/faq`, changeFrequency: 'yearly', lastModified: new Date(), priority: 1 },
		{ url: `${ URL }/id/news`, changeFrequency: 'weekly', lastModified: new Date(), priority: 1 },
		{ url: `${ URL }/id/facilities-service/medical-specialties`, changeFrequency: 'yearly', priority: 1 },
	];

	return [
		...hospitalSitemap,
		...coeSitemap,
		...fasSitemap,
		...footerSitemap,
		...articleSitemap,
		...medspecSitemap,
		...promoSitemap,
		...staticSitemap
	];
};

const getEn = async() => {
	const hospitals = await getHospital({ query: { is_active: true }, overideLang: 'en' });
	const coe = await getCoe({ query: { is_active: true }, pagination: { limit: 99999 }, overideLang: 'en' });
	const fas = await getFAS({ query: { is_active: true }, pagination: { limit: 99999 }, overideLang: 'en' });
	const footer = await getFooterSlug({ query: { is_active: true }, pagination: { limit: 99999 }, overideLang: 'en' });
	const medicalSpecialties = await getMedicalSpecialities({ query: { is_active: true }, pagination: { limit: 99999 }, overideLang: 'en' });
	const articles = await getArticle({ query: { is_active: true }, pagination: { limit: 99999 }, overideLang: 'en' });
	const promo = await getAllEvents({ query: { is_active: true },  pagination: { limit: 99999 }, overideLang: 'en' });

	const hospitalSitemap:MetadataRoute.Sitemap = hospitals.data.map(hospital => {
		return {
			url: `${ URL }/en/hospital/${ hospital.slug }`,
			changeFrequency: 'weekly',
			lastModified: hospital.updated_date,
			priority: 1
		};
	});

	const coeSitemap:MetadataRoute.Sitemap = coe.data.map(item => {
		return {
			url: `${ URL }/en/center-of-excellence/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.updated_date,
			priority: 1
		};
	});

	const fasSitemap:MetadataRoute.Sitemap = fas.data.map(item => {
		return {
			url: `${ URL }/en/facilities-service/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.updated_date,
			priority: 1
		};
	});
  
	const footerSitemap: MetadataRoute.Sitemap = footer.data.map(item => {
		return {
			url: `${ URL }/en/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.updated_date,
			priority: 1
		};
	});

	const medspecSitemap: MetadataRoute.Sitemap = medicalSpecialties.data.map(item => {
		return {
			url: `${ URL }/en/medical-specialties/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.updated_date,
			priority: 1
		};
	});

	const articleSitemap: MetadataRoute.Sitemap = articles.data.map(item => {
		return {
			url: `${ URL }/en/news/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.created_at,
			priority: 1
		};
	});

	const promoSitemap: MetadataRoute.Sitemap = promo.data.map(item => {
		return {
			url: `${ URL }/en/promo/${ item.slug }`,
			changeFrequency: 'weekly',
			lastModified: item.created_date,
			priority: 1
		};
	});

	const staticSitemap: MetadataRoute.Sitemap = [
		{ url: `${ URL }/en/find-a-doctor`, changeFrequency: 'weekly', lastModified: new Date(), priority: 1 },
		{ url: `${ URL }/en/promo`, changeFrequency: 'weekly', lastModified: new Date(), priority: 1 },
		{ url: `${ URL }/en/contact`, changeFrequency: 'yearly', lastModified: new Date(), priority: 1 },
		{ url: `${ URL }/en/contact/faq`, changeFrequency: 'yearly', lastModified: new Date(), priority: 1 },
		{ url: `${ URL }/en/news`, changeFrequency: 'weekly', lastModified: new Date(), priority: 1 },
		{ url: `${ URL }/en/facilities-service/medical-specialties`, changeFrequency: 'yearly', priority: 1 },
	];

	return [
		...hospitalSitemap,
		...coeSitemap,
		...fasSitemap,
		...footerSitemap,
		...medspecSitemap,
		...articleSitemap,
		...promoSitemap,
		...staticSitemap

	];
};
export default async function sitemap():Promise<MetadataRoute.Sitemap> {
  
	const idn = await getIdn();
	const en = await getEn();

	return [
		...idn,
		...en
	];
 
}