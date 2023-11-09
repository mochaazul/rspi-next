import { Breadcrumbs, Layout, Text } from '@/components';
import { AwardsDetail, AwardsState, BreadcrumbsProps } from '@/interface';

import { colors } from '@/constant';
// import { useAppDispatch, useTypedSelector } from '@/hooks';
// import { getAwards } from '@/stores/actions';
import { Languages as lang } from '@/constant';

import { CentreOfExcellenceStyle } from './style';

const AwardsPage = (props: BreadcrumbsProps) => {
	// TODO: migrate
	// const awardDispatch = useAppDispatch(getAwards);
	// const awardsSelector = useTypedSelector<AwardsState>('awards');

	// useEffect(() => {
	// 	awardDispatch({
	// 		queryParam: {
	// 			page: 1,
	// 			limit: 10,
	// 			is_publish: true
	// 		}
	// 	});
	// }, []);

	const AwardItem = (data: AwardsDetail) => (
		<div>
			<div className='image-cont'>
				<img src={ data.img_url } alt={ data.title } />
			</div>
			<Text
				fontSize='20px'
				lineHeight='30px'
				fontWeight='900'
				color={ colors.grey.darker }
				text={ data.title }
				className='sm:mt-[30px] mt-[16px]'
				subClassName='max-sm:text-[16px]'
			/>
			<Text
				fontSize='20px'
				lineHeight='30px'
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
					<Breadcrumbs datas={ props.breadcrumbsPath } />
				</Layout.PanelH1>
				<Layout.PanelH3>
					<div className='mt-[50px]'>
						<Text
							fontType='h1'
							fontSize='44px'
							lineHeight='57px'
							fontWeight='900'
							textAlign='center'
							color={ colors.grey.darker }
							text={ lang.page.awards.heading }
							subClassName='max-sm:text-[24px] max-sm:text-left'
						/>
						<Text
							fontSize='20px'
							lineHeight='30px'
							fontWeight='400'
							textAlign='center'
							color={ colors.grey.dark }
							text={ lang.page.awards.subHeading }
							className='sm:mt-4 mt-1'
							subClassName='max-sm:text-left'
						/>
					</div>
					<div className='sm:pt-[50px] pt-7 pb-[84px] grid sm:grid-cols-2 grid-cols-1 sm:gap-[32px] gap-6'>
						{/* {
							awardsSelector?.awards?.map((data, index) => ((index + 1) % 2 === 0 && (index + 1) < awardsSelector.awards.length) ?
								[
									<AwardItem key={ data.id } { ...data } />,
									<div key={ `${ data.id }-${ index }` } className='col-span-2 border-t-[1px] my-[30px] max-sm:hidden' />
								] :
								<AwardItem key={ data.id } { ...data } />
							)
						} */}
					</div>
				</Layout.PanelH3>
			</Layout.PanelV1>
		</CentreOfExcellenceStyle>
	);
};

export default AwardsPage;