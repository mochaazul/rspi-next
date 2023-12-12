import HospitalDetail from '@/components/ui/PageComponents/HospitalServices';

import { getHospitalDetail } from '@/lib/api/hospital';

const HospitalPages = async({ params }: { params: { id: string; }; }) => {

	const param = {
		param: params?.id,
	};

	const dataDetail = await getHospitalDetail(param);

	const breadcrumbsPath = [{ name: 'Hospital', url: '#' }, { url: '#', name: dataDetail?.data?.name || '' }];

	return (
		<HospitalDetail
			detail={ dataDetail?.data }
			breadcrumbsPath={ breadcrumbsPath }
		/>
	);
};

export default HospitalPages;