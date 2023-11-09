import Modal from '@/components/Modal';
import { PinModalContainer } from './style';
import Text from '@/components/Text';
import Button from '@/components/Button';

type Props = {
	visible: boolean,
	hospitalName: string,
	hospitalPhone: string,
	clickCloseContactHospital: () => void,
};
const PhoneModal = ({
	visible,
	hospitalName,
	hospitalPhone,
	clickCloseContactHospital
}: Props) => {
	return (
		<Modal visible={ visible }>
			<PinModalContainer>
				<Text text={ hospitalName } fontWeight='900' fontSize='20px' lineheight='48px' />
				<Text text={ hospitalPhone } fontWeight='900' fontSize='28px' lineheight='normal' />
				<Button type='submit' label='Tutup' className='mt-[32px]' onClick={ clickCloseContactHospital } />
			</PinModalContainer>
		</Modal>
	);
};

export default PhoneModal;