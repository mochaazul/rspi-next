import Modal from '@/components/ui/Modal';
import { PinModalContainer } from './style';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { HospitalDetail } from '@/interface';

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
	return (
		<Modal visible={ visible } onClose={ onClose }>
			<PinModalContainer>
				<Text text={ hospitalDetail?.name || '' } fontWeight='900' fontSize='20px' lineHeight='48px' />
				<Text text={ hospitalDetail?.phone || '' } fontWeight='900' fontSize='28px' lineHeight='normal' />
				<Button type='submit' label='Tutup' className='mt-[32px]' onClick={ clickCloseContactHospital } />
			</PinModalContainer>
		</Modal>
	);
};

export default PhoneModal;