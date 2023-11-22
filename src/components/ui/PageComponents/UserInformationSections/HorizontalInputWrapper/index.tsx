'use client';

import React from 'react';

import { colors, icons } from '@/constant';

import { BalloonPopupStyle, PopupInfoContainerStyle } from './style';

import Form from '../../../Form';
import Text from '../../../Text';
import WithInputLabel from '../../../withInputLabel';
import { useScopedI18n } from '@/locales/client';

interface HorizontalInputType {
	inputProps: Partial<typeof Form.TextField>,
	label: string,
	labelInfo?: string,
	value?: string,
	inputType?: string,
}

const HorizontalInputWrapper = (props: HorizontalInputType) => {
	const t = useScopedI18n('page.profilePage.profileDetail');

	return (
		<div className='flex max-sm:flex-col sm:grid sm:grid-cols-[240px_1fr] sm:items-center max-sm:mb-4 mb-5'>
			<WithInputLabel.LabelText className='mb-2.5 sm:mb-0 flex gap-3 items-center'>
				{ props.label }
				{
					!!props.labelInfo ?
						<PopupInfoContainerStyle>
							<icons.ExclamationMark className='cursor-pointer' />
							<BalloonPopupStyle className='balloon-popup min-[300px]:min-w-[250px] min-[480px]:min-w-[400px]'>
								<div className='rounded-[10px] px-[10px] py-[5px] h-full relative z-10'>
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
									label: t('patientGenderMaleLabel')
								},
								{
									key: '2',
									value: 'Female',
									label: t('patientGenderFemaleLabel')
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