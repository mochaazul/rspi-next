import { Modal, Text, Button } from '@/components';
import { icons, colors } from '@/constant';

import { ModalStyle } from './style';
import Image from 'next/image';

interface ModalProps {
	emailUser: string;
	visible?: boolean;
	onClose?: () => void;
	onOK?: () => void;
}

const InfoModal: React.FC<ModalProps> = ({
	emailUser,
	visible,
	onClose,
	onOK
}) => {
	return (
		<Modal
			visible={ visible }
			onClose={ onClose }
			noPadding
			width='480px'
		>
			<ModalStyle>
				<Image src={icons.Confirmed} alt="" />
				<Text text={ 'Link Verifikasi Email Tekirim' } className={ 'my-[16px]' } fontSize={ '20px' } fontWeight={ '800' } />
				<Text text={ `Mohon periksa email ${ emailUser } untuk memverifikasi email Anda` } fontSize={ '16px' } fontWeight={ '400' } color={ colors.grey.pencil } textalign={ 'center' } />
				<Button className='mt-[16px]' theme='primary' onClick={ onOK }>Okay</Button>
			</ModalStyle>
		</Modal>
	);
};

export default InfoModal;