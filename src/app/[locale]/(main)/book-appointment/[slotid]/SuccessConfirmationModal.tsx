import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { Button, Modal, Text } from '@/components/ui';
import { icons } from '@/constant';

import { SuccessConfModalContainer } from './style';
import { useSWRConfig } from 'swr';

type Props = {
	doctorName?: string;
	hospitalName?: string;
	date?: string;
	visible: boolean;
	onClose?: () => void;
};

const SuccessConfirmationModal = ({
	date,
	doctorName,
	hospitalName,
	visible,
	onClose
}: Props) => {
	const t = useScopedI18n('page.bookingAppointment.success');
	const currentLang = useCurrentLocale();
	const router = useRouter();
	const { mutate } = useSWRConfig();

	const onclickButton = () => {
		mutate('getNotification');
		router.push('/patient-portal');
	};

	const subHeadingText = () => {
		return `${ t('subHeading.main') } ${ doctorName } ${ t('subHeading.at') } ${ hospitalName } ${ t('subHeading.on') } ${ dayjs(date)?.locale(currentLang)?.format('dddd, DD MMMM YYYY') } ${ t('subHeading.done') }`;
	};

	return <Modal
		visible={ visible }
		noPadding
		width='526px'
		containerClassName='mx-[10px]'
		borderRadius='12px'
		onClose={ onClose }
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
				className='mt-[8px] mb-[24px] px-4'
				fontSize='16px'
				fontWeight='400'
				lineHeight='24px'
				textAlign='center'
				color='#667085'
				text={ subHeadingText() } />

			<Button label={ t('btnLabel') } onClick={ onclickButton } className='text-sm md:text-base' />

		</SuccessConfModalContainer>
	</Modal>;
};

export default SuccessConfirmationModal;