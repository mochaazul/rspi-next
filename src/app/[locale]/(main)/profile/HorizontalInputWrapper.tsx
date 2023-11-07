import React from 'react';

import { colors } from 'constant';
import { icons } from 'constant';
import { Form, Text } from 'components';
import WithInputLabel from 'components/withInputLabel';

import { BalloonPopupStyle, PopupInfoContainerStyle } from './style';

interface HorizontalInputType {
	inputProps: Partial<typeof Form.TextField>,
	label: string,
	labelInfo?: string,
	value?: string,
}

const HorizontalInputWrapper = (props: HorizontalInputType) => {
	return (
		<div className='grid grid-cols-[240px_1fr] items-center'>
			<WithInputLabel.LabelText className='mb-0 flex gap-3 items-center'>
				{ props.label }
				{
					!!props.labelInfo ?
						<PopupInfoContainerStyle>
							<icons.ExclamationMark className='cursor-pointer' />
							<BalloonPopupStyle className='balloon-popup min-w-[400px]'>
								<div className='rounded-[10px] px-[10px] py-[5px] h-full'>
									<Text
										fontWeight='400'
										fontSize='12px'
										lineHeight='23px'
										color={ colors.white.default }
										text={ props.labelInfo }
										className={ '' }
									/>
								</div>
							</BalloonPopupStyle>
						</PopupInfoContainerStyle> :
						null
				}
			</WithInputLabel.LabelText>
			<div className='col-auto'>
				<Form.TextField
					value={ props.value }
					{ ...props.inputProps } />
			</div>
		</div>
	);
};

export default React.memo(HorizontalInputWrapper);