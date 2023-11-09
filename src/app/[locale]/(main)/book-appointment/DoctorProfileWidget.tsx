import { colors } from '@/constant';
import { DoctorProfileImage, DoctorProfileWidgetContainer } from './style';
import { Text } from '@/components';
import { I_MasterDoctor, TimeSlot } from '@/interface';
import dayjs from 'dayjs';
import { formatTimeslot } from '@/helpers/datetime';

type Props = {
	doctorData?: I_MasterDoctor;
	timeSlot: TimeSlot;
};
const DoctorProfileWidget = ({ doctorData, timeSlot }: Props) => {

	const getClinic = () => {
		const docSchedule = doctorData?.doctor_schedule.find(schedule => schedule.hospital_code === timeSlot.hospital_code);
		return docSchedule?.clinics[0].clinic_name;
	};
	const getHospital = () => {
		return doctorData?.doctor_schedule.find(schedule => schedule.hospital_code === timeSlot.hospital_code)?.hospital;
	};

	return <DoctorProfileWidgetContainer>
		<DoctorProfileImage src={ doctorData?.img_url } />
		<div>
			<Text text={ doctorData?.doctor_name } fontWeight='800' fontSize='14px' lineHeight='21px' />
			<Text text={ doctorData?.specialty } fontWeight='400' fontSize='12px' color={ colors.grey.dark } />
			<hr className='mt-[12px]' />
			<div className='grid grid-cols-2 mt-[12px] gap-[16px]'>
				<div>
					<Text text={ `${ dayjs(timeSlot.date).format('DD MMMM YYYY') }, ${ formatTimeslot(timeSlot.session_app_start) } ` } fontWeight='700' fontSize='14px' />
					<Text text='Visit Schedule' fontWeight='400' className='mt-[10px]' fontSize='12px' color={ colors.grey.dark } />
				</div>
				<div>
					<Text text={ `${ getClinic() }` } fontWeight='700' fontSize='14px' />
					<Text text={ `${ getHospital() }` } fontWeight='400' className='mt-[10px]' fontSize='12px' color={ colors.grey.dark } />
				</div>
			</div>
		</div>
	</DoctorProfileWidgetContainer>;
};

export default DoctorProfileWidget;