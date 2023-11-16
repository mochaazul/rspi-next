import Image from 'next/image';

import { icons } from '@/constant';

import { StyleProps, NotificationStyle } from './style';

import Text from '../Text';

export interface PropsTypes extends Omit<StyleProps, '$visible'> {
	showIconLeft?: boolean;
	showIconRight?: boolean;
	showIconLeftOverride?: JSX.Element;
	showIconRightOverride?: JSX.Element;
	onClickLeftIcon?: () => any;
	onClickRightIcon?: () => any;
	text?: string;
	children?: JSX.Element;
	visible?: boolean;
}

const NotificationPanel = ({
	showIconLeft,
	showIconRight,
	showIconLeftOverride,
	showIconRightOverride,
	onClickLeftIcon,
	onClickRightIcon,
	...props
}: PropsTypes) => {
	const LeftIcon = props.mode === 'success' ? icons.Check : icons.Close;

	return (
		<NotificationStyle mode={ props.mode } $visible={ props.visible } className='flex items-center justify-center rounded-[4px] min-w-full'>
			<div className={ `grow-0 mr-[8px] ${ showIconLeft === false && 'hidden' }` }>
				<div className={ `icon-cont rounded-full p-[3px] ${ !!onClickLeftIcon === true && 'cursor-pointer' }` } onClick={ onClickLeftIcon && onClickLeftIcon }>
					{
						!!showIconLeftOverride ?
							showIconLeftOverride :
							<LeftIcon className='svg-white' />
					}
				</div>
			</div>
			<div className='grow'>
				{
					props.text !== undefined && <Text fontType={ null } fontSize='14px' fontWeight='500' text={ props.text } />
				}
				{
					props.children && props.children
				}
			</div>
			<div className={ `grow-0 ml-[8px] ${ showIconRight === false && 'hidden' }` }>
				<div className={ `icon-cont-close ${ !!onClickRightIcon === true && 'cursor-pointer' }` } onClick={ onClickRightIcon && onClickRightIcon }>
					{
						!!showIconRightOverride ?
							showIconRightOverride :
							<icons.Close alt="" />
					}
				</div>
			</div>
		</NotificationStyle>
	);
};

export default NotificationPanel;