import React from 'react';

import { colors } from '@/constant';
import { icons } from '@/constant';
import { Form, Text } from '@/components';
import WithInputLabel from '@/components/withInputLabel';

import { BalloonPopupStyle, PopupInfoContainerStyle } from './style';
import Image from 'next/image';

interface HorizontalInputType {
	inputProps: Partial<typeof Form.TextField>,
	label: string,
	labelInfo?: string,
	value?: string,
	inputType?: string,
}

const HorizontalInputWrapper = (props: HorizontalInputType) => {
	return (
		<div className='grid min-[480px]:grid-cols-[240px_1fr] items-center max-[480px]:mb-4'>
			<WithInputLabel.LabelText className='mb-0 flex gap-3 items-center'>
				{ props.label }
				{
					!!props.labelInfo ?
						<PopupInfoContainerStyle>
							<Image src={icons.ExclamationMark} alt="" className='cursor-pointer'/>
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
				{
					props.inputType === 'dropdown' ?
						<Form.Dropdown
							menuItems={ [
								{
									key: '1',
									value: 'Male',
									label: 'Male'
								},
								{
									key: '2',
									value: 'Female',
									label: 'Female'
								}
							] }
							{ ...props.inputProps } /> :
						props.inputType === 'date' ?
							<Form.DateField
								{ ...props.inputProps } /> :
							<Form.TextField
								{ ...props.inputProps } />
				}

			</div>
		</div>
	);
};

export default React.memo(HorizontalInputWrapper);