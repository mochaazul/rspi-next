'use server';

import { colors } from '@/constant';
import { FacilityServicesHospital } from '@/interface';

import Text from '../../../Text';
import { getScopedI18n } from '@/locales/server';

type Props = {
	hospital: FacilityServicesHospital[];
};

const AvailableAt: React.FC<Props> = async({ hospital }) => {
	const t = await getScopedI18n('page.facilities.facilitiesMenu');

	return (
		<div className='mt-8 md:mt-[62px]'>
			{
				hospital && hospital.length > 0 &&
				<Text fontSize='20px' fontWeight='900' color={ colors.paradiso.default } subClassName='max-sm:!text-base max-sm:!leading-[30px]'>
					{ t('servicesLocationHeading') }
				</Text>
			}
			<div className='divide-y divide-[#EAEAEA]'>
				{ hospital.map((item, index) => {
					return (
						<div className='mb-4 sm:mb-8' key={ `hospital-${ index }` }>
							<Text className='mt-4 sm:mt-8' fontSize='20px' fontWeight='900' subClassName='!leading-normal'>
								{ item?.unit }
							</Text>
							<Text className='mt-2 sm:mt-3' fontSize='16px' fontWeight='900' color={ colors.grey.dark } subClassName='max-sm:text-[#2A2536] max-sm:text-xs leading-[18px] sm:leading-normal max-sm:font-normal'>
								{ item?.floor }
							</Text>
							<div className='flex flex-col gap-y-3 sm:gap-y-4 mt-3 sm:mt-6'>
								<div className='grid sm:grid-cols-2 gap-3 sm:gap-4'>
									<div className='flex flex-col gap-y-2'>
										<Text fontSize='14px' fontWeight='900' subClassName='max-sm:text-xs !leading-[18px]'>
											{ t('phoneHeading') }
										</Text>
										<Text fontSize='14px' fontWeight='400' subClassName='max-sm:text-xs !leading-[18px]'>
											<span style={ { color: colors.paradiso.default, fontWeight: '700' } }>{ item.hospital_phone || '-' }</span>
										</Text>
									</div>

									<div className='flex flex-col gap-y-2'>
										<Text fontSize='14px' fontWeight='900' subClassName='max-sm:text-xs !leading-[18px]'>
											{ t('emailHeading') }
										</Text>
										<Text fontSize='14px' fontWeight='700' color={ colors.paradiso.default } subClassName='max-sm:text-xs !leading-[18px]'>
											{ item.hospital_email || '-' }
										</Text>
									</div>
								</div>
								<div className='grid sm:grid-cols-2 gap-3 sm:gap-4'>
									<div className='flex flex-col gap-y-2'>
										<Text fontSize='14px' fontWeight='900' subClassName='max-sm:text-xs !leading-[18px]'>
											{ t('informationHeading') }
										</Text>
										<Text fontSize='14px' fontWeight='400' subClassName='max-sm:text-xs !leading-[18px]'>
											{ item.information }
										</Text>
									</div>

									<div className='flex flex-col gap-y-2'>
										<Text fontSize='14px' fontWeight='900' subClassName='max-sm:text-xs !leading-[18px]'>
											{ t('operationalHourHeading') }
										</Text>
										<Text fontSize='14px' fontWeight='400' subClassName='max-sm:text-xs !leading-[18px]'>
											{
												item.operational_hour?.map((operationalHour: string, index: number) => (<span key={ `op-hour-${ index }` }>{ operationalHour }</span>))
											}
										</Text>
									</div>
								</div>
							</div>
						</div>
					);
				}) }
			</div>
		</div>
	);
};

export default AvailableAt;