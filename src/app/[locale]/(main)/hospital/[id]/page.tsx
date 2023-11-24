import HospitalDetail from '@/components/ui/PageComponents/HospitalServices';
export default function HospitalPages(props: { params: { id: any; }; }) {

	const breadcrumbsPath = [
		{ name: 'Hospital', url: '#' },
	];

	return (
		<HospitalDetail
			id={ props.params.id }
			breadcrumbsPath={ breadcrumbsPath }
		/>
	);
};