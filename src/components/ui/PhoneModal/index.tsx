import { Button, Modal, Text } from '..';
import { PinModalContainer } from './style';
import { HospitalDetail } from '@/interface';

type Props = {
	visible: boolean,
	clickCloseContactHospital: () => void,
	hospitalDetail?: HospitalDetail
};
const PhoneModal = ({
	visible,
	clickCloseContactHospital, hospitalDetail
}: Props) => {
	return (
		<Modal visible={ visible }>
			<PinModalContainer>
				<Text text={ hospitalDetail?.name || '' } fontWeight='900' fontSize='20px' lineHeight='48px' />
				<Text text={ hospitalDetail?.phone || '' } fontWeight='900' fontSize='28px' lineHeight='normal' />
				<Button type='submit' label='Tutup' className='mt-[32px]' onClick={ clickCloseContactHospital } />
			</PinModalContainer>
		</Modal>
	);
};

export default PhoneModal;