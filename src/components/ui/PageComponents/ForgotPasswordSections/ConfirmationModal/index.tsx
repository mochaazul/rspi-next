import Link from 'next/link';

import { icons, colors } from '@/constant';
import { useScopedI18n } from '@/locales/client';

import Modal from '@/components/ui/Modal';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';

import { ModalStyle } from './style';

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
	const languages = useScopedI18n('page.forgotPassword');

	return (
		<Modal
			visible={ visible }
			onClose={ onClose }
			containerClassName='w-[90vw] md:w-[480px] drop-shadow-lg'
			padding='16px'
		>
			{ !errorMsg ?
				<ModalStyle>
					<icons.Confirmed />
					<Text
						text={ languages('successMessage.heading') }
						className='mt-4 mb-2'
						fontSize='20px'
						lineHeight='32px'
						fontWeight='900'
					/>
					<Text
						text={ `${ languages('successMessage.subHeading') } ${ email } ${ languages('successMessage.subHeadingTail') }` }
						fontSize='16px'
						lineHeight='24px'
						fontWeight='400'
						color={ colors.grey.pencil }
						textAlign='center'
					/>
					<Link href='/login' className='w-full mt-4'>
						<Button theme='primary' className='!py-2 !px-4 max-sm:!text-sm'>{ languages('successMessage.buttonLabel') }</Button>
					</Link>
				</ModalStyle>
				:
				<Text text={ errorMsg || '' } color={ colors.red.default } textAlign='center' />
			}
		</Modal>
	);
};

export default ConfirmationModal;