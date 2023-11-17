import Image from 'next/image';
import { Button, Modal, Text } from '@/components/ui';
import { icons, Languages as lang } from '@/constant';
import { SuccessConfModalContainer } from './style';
import 'moment/locale/id';
import Link from 'next/link';
import { useScopedI18n } from '@/locales/client';
import dayjs from 'dayjs';

type Props = {
	doctorName?: string;
	hospitalName?: string;
	date?: string;
	visible: boolean;
};

const language = lang.page.doctorProfile;

const SuccessConfirmationModal = ({
	date,
	doctorName,
	hospitalName,
	visible
}: Props) => {
	const t = useScopedI18n('page.bookingAppointment.success');
	const subHeadingText = () => {
		return `${t('subHeading.main')} ${doctorName} ${t('subHeading.at')} ${hospitalName} ${t('subHeading.on')} ${dayjs(date).format('dddd, DD MMMM YYYY')} ${t('subHeading.done')}`;
	};
	
	return <Modal visible={ visible }
		noPadding
		width='526px'
		containerClassName='mx-[10px]'
		borderRadius='12px'
	>
		<SuccessConfModalContainer>
			<icons.CheckShadowed />
			<Text
				className='mt-[24px]'
				fontSize='24px'
				fontWeight='700'
				lineHeight='28px'
				text={ t('heading') } />
		 <Text
				className='mt-[8px] mb-[32px]'
				fontSize='14px'
				fontWeight='400'
				lineHeight='20px'
				textAlign='center'
				text={ subHeadingText() } />
			<Link href={ '/patient-portal' }>
				<Button label={ t('btnLabel') } />
			</Link>
		</SuccessConfModalContainer>
	</Modal>;
};

export default SuccessConfirmationModal;