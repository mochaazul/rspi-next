import { colors } from '@/constant';
import { DoctorProfileImage, DoctorProfileWidgetContainer } from './style';
import { Text } from '@/components/ui';
import { FindDoctorDetail, TimeSlot } from '@/interface';
import dayjs from 'dayjs';
import { formatTimeslot } from '@/helpers/datetime';

type Props = {
	doctorData?: FindDoctorDetail;
	timeSlot: TimeSlot;
};
const DoctorProfileWidget = ({ doctorData, timeSlot }: Props) => {

	return <DoctorProfileWidgetContainer>
		<DoctorProfileImage src={ doctorData?.img_url } />
		<div>
			<Text text={ doctorData?.name } fontWeight='800' fontSize='14px' lineHeight='21px' />
			<Text text={ doctorData?.specialty?.[0] } fontWeight='400' fontSize='12px' color={ colors.grey.dark } />
			<hr className='mt-[12px]' />
			<div className='grid grid-cols-2 mt-[12px] gap-[16px]'>
				<div>
					<Text text={ `${ dayjs(timeSlot.date).format('DD MMMM YYYY') }, ${ formatTimeslot(timeSlot.session_app_start) } ` } fontWeight='700' fontSize='14px' />
					<Text text='Visit Schedule' fontWeight='400' className='mt-[10px]' fontSize='12px' color={ colors.grey.dark } />
				</div>
				<div>
					<Text text={ `${ doctorData?.clinic[0].clinic_name }` } fontWeight='700' fontSize='14px' />
					<Text text={ `${ doctorData?.hospital[0].hospital_name }` } fontWeight='400' className='mt-[10px]' fontSize='12px' color={ colors.grey.dark } />
				</div>
			</div>
		</div>
	</DoctorProfileWidgetContainer>;
};

export default DoctorProfileWidget;