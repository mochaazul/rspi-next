import 'moment/locale/id';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

import { useScopedI18n } from '@/locales/client';
import { Button, Modal, Text } from '@/components/ui';
import { icons } from '@/constant';

import { SuccessConfModalContainer } from './style';
import { useSWRConfig } from 'swr';

type Props = {
	doctorName?: string;
	hospitalName?: string;
	date?: string;
	visible: boolean;
};

const SuccessConfirmationModal = ({
	date,
	doctorName,
	hospitalName,
	visible
}: Props) => {
	const t = useScopedI18n('page.bookingAppointment.success');
	const router = useRouter();
	const { mutate } = useSWRConfig();

	const onclickButton = () => {
		mutate('getNotification');
		router.push('/patient-portal');
	};

	const subHeadingText = () => {
		return `${ t('subHeading.main') } ${ doctorName } ${ t('subHeading.at') } ${ hospitalName } ${ t('subHeading.on') } ${ dayjs(date).format('dddd, DD MMMM YYYY') } ${ t('subHeading.done') }`;
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
			
			<Button label={ t('btnLabel') } onClick={ onclickButton } />
			
		</SuccessConfModalContainer>
	</Modal>;
};

export default SuccessConfirmationModal;