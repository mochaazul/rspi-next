import Link from 'next/link';

import { Modal, Text, Button } from '@/components';
import { icons, colors } from '@/constant';

import { ModalStyle } from './style';
import Image from 'next/image';

interface ModalProps {
	visible?: boolean;
	onClose?: () => void;
	email?: string;
	errorMsg: string | null;
}

const ConfirmationModal: React.FC<ModalProps> = ({
	visible,
	onClose,
	email,
	errorMsg,
}) => {
	return (
		<Modal
			visible={ visible }
			onClose={ onClose }
			containerClassName='w-[90vw] md:w-[440px] drop-shadow-lg'
		>
			{ !errorMsg ?
				<ModalStyle>
					<Image src={icons.Confirmed} alt="" />
					<Text text={ 'Link Ubah Kata Sandi Sudah Dikirim' } className={ 'mt-[16px] mb-[8px]' } fontSize={ '20px' } fontWeight={ '800' } />
					<Text text={ `Periksa kembali email ${ email } untuk melanjutkan proses ubah kata sandi` } fontSize={ '16px' } fontWeight={ '400' } color={ colors.grey.pencil } textAlign={ 'center' } />
					<Link href='/login'>
						<Button className='mt-[16px]' theme='primary'>Okay</Button>
					</Link>
				</ModalStyle>
				:
				<Text text={ errorMsg || '' } color={ colors.red.default } textAlign='center' />
			}
		</Modal>
	);
};

export default ConfirmationModal;