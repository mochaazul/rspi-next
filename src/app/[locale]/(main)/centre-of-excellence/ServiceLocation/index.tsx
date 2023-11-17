import React, { useState, useMemo } from 'react';

import { CustomCarousel, Text, Tabs } from '@/components/ui';
import { colors, Languages as lang } from '@/constant';
import { useTypedSelector } from '@/hooks';
import { CenterOfExcellenceState } from '@/interface';
import CardMenu from '../CardMenu';

interface NewsProps {
	content?: any;
	activeMenuIndex?: number;
}

const tabsData = ['Conditions', 'Treatments We Offer', 'Medical Technology', 'Our Doctors'];

const language = lang.page.centerOfExcellence.serviceLocation;

const Servicelocation: React.FC<NewsProps> = ({ content, activeMenuIndex }) => {

	const { centerOfExcellence } = useTypedSelector<CenterOfExcellenceState>('centerOfExcellence');

	const [activeTabIdx, setActiveTabIdx] = useState(0);

	const renderContent = useMemo(() => {
		const Contents = [];
		Contents.push(
			<div className='mt-[30px] innerHTML text-16' dangerouslySetInnerHTML={ { __html: content?.conditions } } />
		);
		Contents.push(
			<div className='mt-[30px] innerHTML text-16' dangerouslySetInnerHTML={ { __html: content?.treatments } } />
		);
		Contents.push(
			<div className='mt-[30px] innerHTML text-16' dangerouslySetInnerHTML={ { __html: content?.technology } } />
		);
		Contents.push(
			<div className='mt-[30px]'>
				{ content?.doctors?.map((doctor: any, index: number) => {
					return <div key={ index } className='mb-[20px]'>
						<Text text={ doctor?.doctor_name } fontWeight='700' className='mb-[5px]' />
						<Text text={ doctor?.speciality } fontWeight='400' color={ colors.grey.dark } />
					</div>;
				}) }
			</div>
		);
		return Contents[activeTabIdx] ?? null;
	}, [activeTabIdx, activeMenuIndex]);

	return (
		<div>
			<Text fontSize='24px' fontWeight='900' color={ colors.paradiso.default }>
				{ content?.title }
			</Text>

			<div className='mt-[32px]'>
				<CustomCarousel arrowButton={ true }>
					{ content?.img_url?.map((image: any, index: any) => {
						return <img
							key={ index }
							src={ image }
							alt='slider'
							className='bg-white h-[220px] md:h-[420px] sm:w-[729px] rounded-[5px] object-cover'
						/>;
					}) }
				</CustomCarousel>
			</div>

			<div className='mt-[16px] md:hidden'>
				<CardMenu data={ centerOfExcellence } activeMenuIndex={ activeMenuIndex ?? 0 } />
			</div>

			<div className='mt-[48px]'>
				<div className='innerHTML text-16' dangerouslySetInnerHTML={ { __html: content?.content } } />
			</div>

			<div className='mt-[50px]'>
				<div className='w-full overflow-auto'>
					<Tabs
						activeTabIndex={ activeTabIdx }
						setActiveTabIndex={ setActiveTabIdx }
						tabsData={ tabsData }
					/>
				</div>
				<div style={ { color: colors.grey.darker, lineHeight: '24px' } }>
					{ renderContent }
				</div>
			</div>
			<div className='mt-[92px]'>
				<Text fontSize='20px' fontWeight='900' color={ colors.paradiso.default }>
					{ language.heading }
				</Text>

				<Text className='mt-[32px]' fontSize='20px' fontWeight='900' lineHeight='24px'>
					{ content.available_at[0] }
				</Text>

				<div className='sm:flex gap-x-5'>
					<div className='grid grid-cols-2 gap-x-20 mt-[24px]'>
						{
							content.available_at?.map((data: any, index: number) => {
								if (index !== 0)
									return (
										<div className='flex flex-col mt-[16px]' key={ index }>
											<Text fontSize='18px' fontWeight='900' lineHeight='24px'>
												{ data?.split(':+split+:')[0] }
											</Text>
											<div className='innerHTML text-16 mt-[10px]' dangerouslySetInnerHTML={ { __html: data?.split(':+split+:')[1] } } />
										</div>
									);
							})
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Servicelocation;