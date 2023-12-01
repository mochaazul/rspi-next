'use client';

import React from 'react';
import { Edit3 } from 'react-feather';

import { colors, icons } from '@/constant';
import { useScopedI18n } from '@/locales/client';

import { BalloonPopupStyle, PopupInfoContainerStyle } from './style';

import Form from '../../../Form';
import Text from '../../../Text';
import WithInputLabel, { PropsType } from '../../../withInputLabel';

interface HorizontalInputType {
	inputProps: PropsType,
	label: string,
	labelInfo?: string,
	inputType?: string,
	onEditClick?: () => void;
}

const HorizontalInputWrapper = (props: HorizontalInputType) => {
	const t = useScopedI18n('page.profilePage.profileDetail');

	const renderInput = () => {
		if (props.inputType === 'dropdown') {
			return (
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
					{ ...props.inputProps }
				/>
			);
		}

		if (props.inputType === 'date') {
			return (
				<Form.DateField
					{ ...props.inputProps }
					applyMaxDateForDoB={ true }
				/>
			);
		}

		if (props.inputType === 'phone') {
			return (
				<>
					<span className='absolute top-1/2 -translate-y-1/2 left-0 pl-[18px] z-[1]'>
						<Text
							fontSize='16px'
							color={ props.inputProps.disabled ? colors.grey.darkOpacity : colors.grey.darker }
							subClassName='!text-base'
						>+62</Text>
					</span>

					<Form.TextField
						{ ...props.inputProps }
						isNumber
						mask='999999999999'
						className='!pl-[50px]'
					/>
				</>
			);
		}

		return (
			<Form.TextField	{ ...props.inputProps } />
		);
	};

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
			<div className='col-auto relative'>
				{ renderInput() }

				{ props.onEditClick && (
					<div className='absolute pr-5 right-0 inset-y-0 flex items-center'>
						<button
							type='button'
							className='flex items-center gap-2 focus:outline-none'
							onClick={ props.onEditClick }
						>
							<Edit3 className='w-[18px] h-[18px] sm:w-5 sm:h-5' color={ colors.green.brandAccent } />
							<Text
								fontSize='14px'
								fontWeight='900'
								color={ colors.green.brandAccent }
								subClassName='max-sm:text-xs'
							>{ t('editLabel') }</Text>
						</button>
					</div>
				) }
			</div>
		</div>
	);
};

export default React.memo(HorizontalInputWrapper);