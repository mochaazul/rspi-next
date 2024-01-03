import Modal from '@/components/ui/Modal';
import { PinModalContainer } from './style';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { HospitalDetail } from '@/interface';
import { useScopedI18n } from '@/locales/client';

type Props = {
	visible: boolean;
	clickCloseContactHospital: () => void;
	hospitalDetail?: HospitalDetail;
	onClose?: () => void;
};
const PhoneModal = ({
	visible,
	clickCloseContactHospital,
	hospitalDetail,
	onClose
}: Props) => {
	const t = useScopedI18n('page.doctorProfile');

	return (
		<Modal visible={ visible } borderRadius='12px' padding='24px'>
			<PinModalContainer>
				<Text text={ t('labelPhoneModal') } fontWeight='400' fontSize='20px' lineHeight='14px' />
				<Text text={ hospitalDetail?.name || '' } fontWeight='400' fontSize='20px' lineHeight='30px' />
				<Text text={ hospitalDetail?.phone || '' } fontWeight='700' fontSize='24px' lineHeight='28px' />
				<Button type='submit' label='Tutup' className='mt-[10px]' onClick={ clickCloseContactHospital } />
			</PinModalContainer>
		</Modal>
	);
};

export default PhoneModal;