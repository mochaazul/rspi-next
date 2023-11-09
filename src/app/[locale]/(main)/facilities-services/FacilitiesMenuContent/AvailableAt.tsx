import { Text } from '@/components';
import { Languages, colors } from '@/constant';
import { useTypedSelector } from '@/hooks';
import { FacilityServicesState } from '@/interface';

const { servicesLocationHeading, phoneHeading, informationHeading, emailHeading, operationalHourHeading } = Languages.page.facilities.facilitiesMenu;

const AvailableAt = () => {
	const { hospital } = useTypedSelector<FacilityServicesState>('facilityServices');

	if (hospital && !hospital.length) return null;

	return (
		<div className='mt-[92px]'>
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
							<Text className='mt-[32px]' fontSize='20px' fontWeight='900' lineheight='24px'>
								{ item?.unit }
							</Text>
							<Text className='mt-[12px]' fontSize='16px' fontWeight='900' color={ colors.grey.dark }>
								{ item?.floor }
							</Text>
							<div className='sm:flex mt-[24px]'>
								<div className='flex-1'>
									<Text fontSize='14px' fontWeight='900' lineheight='24px'>
										{ phoneHeading }
									</Text>
									<Text fontSize='14px' fontWeight='400' lineheight='24px'>
										<span style={ { color: colors.paradiso.default, fontWeight: '700' } }>{ item.hospital_phone || '-' }</span>
									</Text>

									<Text className='mt-[16px]' fontSize='14px' fontWeight='900' lineheight='24px'>
										{ informationHeading }
									</Text>
									<Text fontSize='14px' fontWeight='400' lineheight='24px'>
										{ item.information }
									</Text>
								</div>
								<div className='flex-1'>
									<Text fontSize='14px' fontWeight='900' lineheight='24px'>
										{ emailHeading }
									</Text>
									<Text fontSize='14px' fontWeight='700' lineheight='24px' color={ colors.paradiso.default }>
										{ item.hospital_email || '-' }
									</Text>

									<Text className='mt-[16px]' fontSize='14px' fontWeight='900' lineheight='24px'>
										{ operationalHourHeading }
									</Text>
									<Text fontSize='14px' fontWeight='400' lineheight='24px'>
										{
											item.operational_hour?.map((operationalHour, index) => (<li key={ `op-hour-${ index }` }>{ operationalHour }</li>))
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