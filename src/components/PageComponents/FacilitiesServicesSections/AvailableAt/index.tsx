
import { Languages, colors } from '@/constant';
import { FacilityServicesHospital } from '@/interface';

import Text from '../../../Text';

const { servicesLocationHeading, phoneHeading, informationHeading, emailHeading, operationalHourHeading } = Languages.page.facilities.facilitiesMenu;

type Props = {
	hospital: FacilityServicesHospital[];
};

const AvailableAt: React.FC<Props> = ({ hospital }) => {
	return (
		<div className='mt-8 md:mt-[92px]'>
			{
				hospital && hospital.length > 0 &&
				<Text fontSize='20px' fontWeight='900' color={ colors.paradiso.default }>
					{ servicesLocationHeading }
				</Text>
			}
			<div className='divide-y divide-solid'>
				{ hospital.map((item, index) => {
					return (
						<div className='mb-[32px]' key={ `hospital-${ index }` }>
							<Text className='mt-[32px]' fontSize='20px' fontWeight='900' lineHeight='24px'>
								{ item?.unit }
							</Text>
							<Text className='mt-[12px]' fontSize='16px' fontWeight='900' color={ colors.grey.dark }>
								{ item?.floor }
							</Text>
							<div className='sm:flex mt-[24px]'>
								<div className='flex-1'>
									<Text fontSize='14px' fontWeight='900' lineHeight='24px'>
										{ phoneHeading }
									</Text>
									<Text fontSize='14px' fontWeight='400' lineHeight='24px'>
										<span style={ { color: colors.paradiso.default, fontWeight: '700' } }>{ item.hospital_phone || '-' }</span>
									</Text>

									<Text className='mt-[16px]' fontSize='14px' fontWeight='900' lineHeight='24px'>
										{ informationHeading }
									</Text>
									<Text fontSize='14px' fontWeight='400' lineHeight='24px'>
										{ item.information }
									</Text>
								</div>
								<div className='flex-1'>
									<Text fontSize='14px' fontWeight='900' lineHeight='24px'>
										{ emailHeading }
									</Text>
									<Text fontSize='14px' fontWeight='700' lineHeight='24px' color={ colors.paradiso.default }>
										{ item.hospital_email || '-' }
									</Text>

									<Text className='mt-[16px]' fontSize='14px' fontWeight='900' lineHeight='24px'>
										{ operationalHourHeading }
									</Text>
									<Text fontSize='14px' fontWeight='400' lineHeight='24px'>
										{
											item.operational_hour?.map((operationalHour: string, index: number) => (<span key={ `op-hour-${ index }` }>{ operationalHour }</span>))
										}
									</Text>
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