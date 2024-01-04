import { headers } from 'next/headers';

import FooterServices from '@/components/ui/PageComponents/FooterServices';

import { getFooterPages } from '@/lib/api/footer';
import { notFound } from 'next/navigation';

const FooterPages = async ({ params }: { params: { slug: string; }; }) => {
	const headersList = headers();

	const pathname = headersList.get('x-invoke-path') || '';
	const isMedSpec = pathname.includes('medical-specialties');

	const param = {
		query: {
			slug: params?.slug
		}
	};

	const dataDetail = await getFooterPages(param);

	if (!dataDetail?.data?.length) {
		notFound();
	}

	return (
		<FooterServices
			detail={ dataDetail?.data }
			isMedSpec={ isMedSpec }
		/>
	);
};

export default FooterPages;