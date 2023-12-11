'use client';

import React from 'react';
import { Edit3 } from 'react-feather';
import Link from 'next/link';

import { colors, icons } from '@/constant';
import { useScopedI18n } from '@/locales/client';

import { BalloonPopupStyle, PopupInfoContainerStyle } from './style';

import Form from '../../../Form';
import Text from '../../../Text';
import WithInputLabel, { PropsType } from '../../../withInputLabel';
import { ErrorText } from '../../../withInputLabel/style';

interface HorizontalInputType {
	inputProps: PropsType,
	label: string,
	labelInfo?: string,
	inputType?: string,
	editHref?: string;
}

const HorizontalInputWrapper = (props: HorizontalInputType) => {
	const t = useScopedI18n('page.profilePage.profileDetail');

	const errorInputProps = {
		className: '!outline-red-default focus-within:!outline-red-default',
		iconPosition: 'right' as PropsType['iconPosition'],
		featherIcon: 'AlertTriangle' as PropsType['featherIcon'],
		iconColor: colors.red.default
	};

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
					className={ props.inputProps.isError ? errorInputProps.className : '' }
					errorMessage={ undefined }
				/>
			);
		}

		if (props.inputType === 'date') {
			return (
				<Form.DateField
					{ ...props.inputProps }
					applyMaxDateForDoB={ true }
					iconPosition='left'
					iconName='CalendarIcon'
					className={ props.inputProps.isError ? errorInputProps.className : '' }
					errorMessage={ undefined }
				/>
			);
		}

		if (props.inputType === 'phone') {
			return (
				<Form.PhoneNumberInput
					{ ...props.inputProps }
					wrapperClassName={ props.inputProps.isError ? errorInputProps.className : '' }
					errorMessage={ undefined }
				/>
			);
		}

		return (
			<Form.TextField
				{ ...props.inputProps }
				{ ...props.inputProps.isError
					? {
						wrapperClassName: errorInputProps.className,
						iconPosition: errorInputProps.iconPosition,
						$iconColor: errorInputProps.iconColor,
						featherIcon: errorInputProps.featherIcon
					} : {} }
				errorMessage={ undefined }
			/>
		);
	};

	return (
		<div className='max-sm:mb-4 mb-5'>
			<div className='flex max-sm:flex-col sm:grid sm:grid-cols-[240px_1fr] sm:items-center'>
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

					{ props.editHref && (
						<div className='absolute pr-5 right-0 inset-y-0 flex items-center'>
							<Link
								className='flex items-center gap-2 focus:outline-none'
								href={ props.editHref }
							>
								<Edit3 className='w-[18px] h-[18px] sm:w-5 sm:h-5' color={ colors.green.brandAccent } />
								<Text
									fontSize='14px'
									fontWeight='900'
									color={ colors.green.brandAccent }
									subClassName='max-sm:text-xs'
								>{ t('editLabel') }</Text>
							</Link>
						</div>
					) }
				</div>
			</div>

			{ props.inputProps?.errorMessage && !!props.inputProps?.isError &&
				<div className='flex justify-end'>
					<ErrorText>{ props.inputProps?.errorMessage }</ErrorText>
				</div>
			}
		</div>
	);
};

export default React.memo(HorizontalInputWrapper);