'use client';
import React, { useEffect, useState } from 'react';

import { icons } from '@/constant';

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
	padding?: string;
	overflow?: string;
	containerClassName?: string;
	bottomSheet?: boolean,
	header?: JSX.Element;
	backdropClassname?: string;
	paddingSm?: string;
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
	padding = ' 40px',
	overflow,
	containerClassName,
	bottomSheet = false,
	header,
	backdropClassname,
	paddingSm = ' 20px',
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
				$noPadding={ noPadding }
				$bgColor={ bgColor }
				$borderRadius={ borderRadius }
				backdropColor={ backdropColor }
				$padding={ padding }
				overflow={ overflow }
				$paddingSm={ paddingSm }
			>
				<div className={ `modal-wrapper ${ bottomSheet && 'bottom-sheet' } ` }>
					<div className={ `modal-backdrop ${ visible ? 'backdrop-open-animation' : 'backdrop-close-animation' } ${ backdropClassname }` } onClick={ onClose } />
					<div id='modal-content' className={ ` ${ bottomSheet && 'bottom-sheet' } modal-content-container ${ visible ? 'open-animation' : 'close-animation' } ${ containerClassName }` }>
						{
							header && <div className='modal-header'>{ header }</div>
						}
						<div className='modal-content'>
							{ children }
							{
								onClose && <div className='cursor-pointer absolute top-5 right-5' onClick={ onClose }>
									<icons.Close alt='' className='w-[18px] h-[18px] sm:w-6 sm:h-6' />
								</div>
							}
						</div>
					</div>
				</div>
			</ModalStyle>
		);
	}

	return null;
};

export default Modal;