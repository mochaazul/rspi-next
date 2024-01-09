'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

import { CustomCarousel, Text, Tabs } from '@/components/ui';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { colors } from '@/constant';
import TextHtml from '@/components/ui/TextHtml';
import { numberHelper } from '@/helpers';

import CardMenu from '../CardMenu';

interface NewsProps {
	content?: any;
	activeMenuIndex?: string;
	centerOfExcellence?: any;
}

const tabsData = ['Conditions', 'Treatments We Offer', 'Medical Technology', 'Our Doctors'];

const ServiceLocation: React.FC<NewsProps> = ({ content, activeMenuIndex, centerOfExcellence }) => {
	const t = useScopedI18n('page.centerOfExcellence');

	const currentLang = useCurrentLocale();

	const [activeTabIdx, setActiveTabIdx] = useState(0);

	const renderContent = useMemo(() => {
		const Contents = [];
		Contents.push(
			<div className='mt-[30px] text-16' >
				<TextHtml className='innerHTML' htmlStr={ content?.conditions } />
			</div>
		);
		Contents.push(
			<div className='mt-[30px] text-16' >
				<TextHtml className='innerHTML' htmlStr={ content?.treatments } />
			</div>
		);
		Contents.push(
			<div className='mt-[30px] text-16'>
				<TextHtml className='innerHTML' htmlStr={ content?.technology } />
			</div>
		);
		Contents.push(
			<div className='mt-[30px]'>
				{ content?.doctors?.map((doctor: any, index: number) => {
					return <div key={ index } className='mb-[20px]'>
						<Link href={ `/doctor/${ doctor?.doctor_code }` } className='hover:underline'>
							<Text text={ doctor?.doctor_name } fontWeight='700' className='mb-[5px]' />
						</Link>
						<Text text={ doctor?.speciality } fontWeight='400' color={ colors.grey.dark } />
					</div>;
				}) }
			</div>
		);
		return Contents[activeTabIdx] ?? null;
	}, [activeTabIdx, activeMenuIndex]);

	return (
		<div>
			<Text fontSize='24px' fontWeight='900' color={ colors.paradiso.default } fontType={ 'h1' }>
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
				<CardMenu data={ centerOfExcellence } activeMenuIndex={ activeMenuIndex ?? '' } />
			</div>

			<div className='mt-[48px]'>
				<div className='text-16' >
					<TextHtml className='innerHTML' htmlStr={ content?.content } />
				</div>
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
			<div className='mt-[62px]'>
				{ content?.coe_hospitals?.length && (
					<Text fontSize='20px' fontWeight='900' color={ colors.paradiso.default } fontType={ 'h4' }>
						{ t('serviceLocation.heading') }
					</Text>
				) }

				<div className='divide-y divide-[#EAEAEA]'>
					{
						content?.coe_hospitals?.map((item: any, index: number) => {
							return (
								<div className='mb-4 sm:mb-8' key={ `hospital-${ index }` }>
									<Text className='mt-4 sm:mt-8' fontSize='20px' fontWeight='900' subClassName='!leading-normal'>
										{ item?.unit }
									</Text>
									<Text className='mt-2 sm:mt-3' fontSize='16px' fontWeight='900' color={ colors.grey.dark } subClassName='max-sm:text-sm !leading-normal'>
										{
											currentLang === 'id'
												? `${ item?.hospital_name } ${ t('serviceLocation.floor') } ${ item?.floor }`
												: `${ item?.hospital_name } ${ numberHelper(item?.floor) } ${ t('serviceLocation.floor') }`
										}
									</Text>
									<div className='flex flex-col gap-y-3 sm:gap-y-4 mt-3 sm:mt-6'>

										<div className='grid sm:grid-cols-2 gap-3 sm:gap-4'>
											<div className='flex flex-col gap-y-2'>
												<Text fontSize='14px' fontWeight='900' subClassName='leading-normal'>
													{ t('serviceLocation.appointmentHeading') }
												</Text>
												<Text fontSize='14px' fontWeight='400' subClassName='leading-normal'>
													<span style={ { color: colors.paradiso.default, fontWeight: '700' } }>{ item.appointment || '-' }</span>
												</Text>
											</div>

											<div className='flex flex-col gap-y-2'>
												<Text fontSize='14px' fontWeight='900' subClassName='leading-normal'>
													{ t('serviceLocation.informationHeading') }
												</Text>
												<Text fontSize='14px' fontWeight='400' subClassName='leading-normal'>
													{ item.information }
												</Text>
											</div>

											<div className='flex flex-col gap-y-2'>
												<Text fontSize='14px' fontWeight='900' subClassName='leading-normal'>
													{ t('serviceLocation.phoneNumberHeading') }
												</Text>
												<Text fontSize='14px' fontWeight='400' subClassName='leading-normal'>
													<span style={ { color: colors.paradiso.default, fontWeight: '700' } }>{ item.hospital_phone || '-' }</span>
												</Text>
											</div>

											<div className='flex flex-col gap-y-2'>
												<Text fontSize='14px' fontWeight='900' subClassName='leading-normal'>
													{ t('serviceLocation.emailHeading') }
												</Text>
												<Text fontSize='14px' fontWeight='700' color={ colors.paradiso.default } subClassName='leading-normal'>
													{ item.hospital_email || '-' }
												</Text>
											</div>

											<div className='flex flex-col gap-y-2'>
												<Text fontSize='14px' fontWeight='900' subClassName='leading-normal'>
													{ t('serviceLocation.operationalHourHeading') }
												</Text>
												<Text fontSize='14px' fontWeight='400' className='leading-normal' fontType={ null }>
													<ul className='list-disc list-outside pl-5'>
														{
															item.operational_hour?.filter((operationalHour: string) => !!operationalHour)?.map((operationalHour: string, index: number) => (<li key={ `op-hour-${ index }` }>{ operationalHour }</li>))
														}
													</ul>
												</Text>
											</div>
										</div>
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		</div>
	);
};

export default ServiceLocation;