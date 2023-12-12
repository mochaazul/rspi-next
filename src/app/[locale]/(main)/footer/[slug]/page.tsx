import { headers } from 'next/headers';

import FooterServices from '@/components/ui/PageComponents/FooterServices';

import { getFooterPages } from '@/lib/api/footer';

const FooterPages = async({ params }: { params: { slug: string; }; }) => {

	const headersList = headers();
	
	const pathname = headersList.get('x-invoke-path') || '';
	const isMedSpec = pathname.includes('medical-specialities');

	const param = {
		query: {
			slug: params?.slug
		}
	};

	const dataDetail = await getFooterPages(param);
	
	return (
		<FooterServices
			detail={ dataDetail?.data }
			isMedSpec={ isMedSpec }
		/>
	);
};

export default FooterPages;