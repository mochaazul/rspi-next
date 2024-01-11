import { icons, colors } from '@/constant';
import { useScopedI18n } from '@/locales/client';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Text from '@/components/ui/Text';

import { ModalStyle } from './style';

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
	const languages = useScopedI18n('page.registerPage.infoModal');
	return (
		<Modal
			visible={ visible }
			onClose={ onClose }
			noPadding
			containerClassName='w-[90vw] md:w-[480px]'
		>
			<ModalStyle>
				<icons.Confirmed />
				<Text
					text={ languages('heading') }
					className='mt-4 mb-2'
					fontSize='20px'
					fontWeight='900'
					lineHeight='32px'
				/>
				<Text
					text={ `${ languages('subHeading') } ${ emailUser } ${ languages('subHeadingTail') }` }
					fontSize='16px'
					fontWeight='400'
					color={ colors.grey.pencil }
					subClassName='text-xs leading-[18px] sm:text-base'
					textAlign='center'
				/>
				<Button
					className='mt-4 max-sm:text-sm'
					theme='primary'
					onClick={ onOK }
				>{ languages('buttonLabel') }</Button>
			</ModalStyle>
		</Modal>
	);
};

export default InfoModal;