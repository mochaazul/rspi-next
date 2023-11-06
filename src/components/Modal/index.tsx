import React, { useEffect, useState } from 'react';

import ModalStyle from './style';

type ModalType = 'bottom' | 'center';

interface ModalProps {
	children: JSX.Element;
	visible?: boolean;
	width?: string;
	noPadding?: boolean;
	showCloseIcon?: boolean;
	type?: ModalType;
	bgColor?: string;
	modalTitle?: string;
	borderRadius?: string;
	backdropColor?: string;
	onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
	children,
	visible,
	noPadding = false,
	width,
	bgColor = 'var(--bg-modal)',
	borderRadius,
	backdropColor,
	onClose,
}) => {
	const [modalOpen, setModalOpen] = useState(visible);

	const clearTimeOut = setTimeout(() => { setModalOpen(visible); }, 300);

	useEffect(() => {
		if (visible) {
			setModalOpen(true);
			document.body.style.overflow = 'hidden';
		} else {
			clearTimeOut;
		}

		return () => {
			document.body.style.overflow = 'unset';
			clearTimeOut;
		};
	}, [visible]);

	if (modalOpen) {
		return (
			<ModalStyle
				width={ width }
				noPadding={ noPadding }
				bgColor={ bgColor }
				borderRadius={ borderRadius }
				backdropColor={ backdropColor }
			>
				<div className='modal-wrapper'>
					<div className={ `modal-backdrop ${ visible ? 'backdrop-open-animation' : 'backdrop-close-animation' }` } onClick={ onClose } />

					<div id='modal-content' className={ `modal-content-container ${ visible ? 'open-animation' : 'close-animation' }` }>
						<div className='modal-content'>
							{ children }
						</div>
					</div>
				</div>
			</ModalStyle>
		);
	}

	return null;
};

export default Modal;