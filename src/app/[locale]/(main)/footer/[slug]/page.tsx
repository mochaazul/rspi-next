import { headers } from 'next/headers';

import FooterServices from '@/components/ui/PageComponents/FooterServices';
export default function FooterPages(props: { params: { slug: any; }; }) {
	const headersList = headers();
	
	const pathname = headersList.get('x-invoke-path') || '';
	const isMedSpec = pathname.includes('medical-specialities');

	const breadcrumbsPath = [
		{ name: 'Facilities & Services', url: '/facilities' },
	];
	
	return (
		<FooterServices
			slug={ props.params.slug }
			breadcrumbsPath={ breadcrumbsPath }
			isMedSpec={ isMedSpec }
		/>
	);
};