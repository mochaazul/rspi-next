import Image from 'next/image';

import { AwardsDetail } from '@/interface';
import { colors } from '@/constant';
import { getAwards } from '@/lib/api/awards';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Layout from '@/components/Layout';
import Text from '@/components/ui/Text';
import { getScopedI18n } from '@/locales/server';

import { CentreOfExcellenceStyle } from './style';

export default async function AwardsPage() {
	const awardsRes = await getAwards({ is_publish: true }, { page: 1, limit: 10 });
	const awards: AwardsDetail[] = awardsRes?.data;

	const languages = await getScopedI18n('page.awards');

	const breadcrumbsPath = [{ name: 'Accreditations & Awards', url: '/accreditation-and-awards' }];

	const AwardItem = (data: AwardsDetail) => (
		<div>
			<div className='image-cont relative overflow-hidden'>
				{ data.img_url && (
					<Image
						src={ data.img_url }
						alt={ data.title ?? '' }
						className='w-full h-full object-contain'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						fill
					/>
				) }
			</div>
			<Text
				fontSize='20px'
				lineHeight='30px'
				fontWeight='900'
				color={ colors.grey.darker }
				text={ data.title }
				className='sm:mt-[30px] mt-4'
				subClassName='max-sm:text-base'
			/>
			<Text
				fontSize='18px'
				lineHeight='27px'
				fontWeight='400'
				color={ colors.grey.darker }
				text={ data.description }
				className='sm:mt-4 mt-2'
			/>
		</div>
	);

	return (
		<CentreOfExcellenceStyle>
			<Layout.PanelV1>
				<Layout.PanelH1>
					<Breadcrumbs datas={ breadcrumbsPath } />
				</Layout.PanelH1>
				<Layout.PanelH3>
					<div className='mt-[25px] sm:mt-[50px]'>
						<Text
							fontType='h1'
							fontSize='44px'
							lineHeight='57px'
							fontWeight='900'
							textAlign='center'
							color={ colors.grey.darker }
							text={ languages('heading') }
							subClassName='max-sm:text-[24px] max-sm:text-left'
						/>
						<Text
							fontSize='20px'
							lineHeight='30px'
							fontWeight='400'
							textAlign='center'
							color={ colors.grey.dark }
							text={ languages('subHeading') }
							className='sm:mt-4 mt-1'
							subClassName='max-sm:text-left'
						/>
					</div>
					<div className='sm:pt-[50px] pt-7 pb-[84px] grid sm:grid-cols-2 grid-cols-1 sm:gap-[32px] gap-6'>
						{
							awards?.map((data, index) => ((index + 1) % 2 === 0 && (index + 1) < awards?.length) ?
								[
									<AwardItem key={ data.id } { ...data } />,
									<div key={ `${ data.id }-${ index }` } className='col-span-2 border-t-[1px] my-[30px] max-sm:hidden' />
								] :
								<AwardItem key={ data.id } { ...data } />
							)
						}
					</div>
				</Layout.PanelH3>
			</Layout.PanelV1>
		</CentreOfExcellenceStyle>
	);
};
