'use client';

import { useState } from 'react';

import Modal from '@/components/ui/Modal';
import Text from '@/components/ui/Text';
import languages from '@/constant/languages';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import { colors } from '@/constant';
import { createFieldConfig, requiredRule } from '@/helpers';
import NotificationPanel from '@/components/ui/NotificationPanel';
import Spinner from '@/components/ui/Spinner';
import { usePostCheckPinMutation } from '@/lib/api/client/auth';

import { PinModalContainer } from './style';

type Props = {
	visible: boolean,
	onSuccess: () => void;
};
const { header, subHeader, submitBtnLabel } = languages.modalDialog.pin;

const PinModal = ({ visible, onSuccess }: Props) => {
	const { data: checkPinResponse, trigger: checkPinTrigger, error: checkPinError, isMutating: checkPinLoading } = usePostCheckPinMutation();

	const pinField = {
		pin: {
			...createFieldConfig({
				name: 'pin',
				type: 'password'
			}),
			validationRules: [
				requiredRule('pin'),
			],
			placeholder: 'PIN'
		}
	};

	const {
		registeredValue,
		onSubmit
	} = Form.useForm({ fields: pinField });

	return (
		<Modal visible={ visible }>
			<PinModalContainer>
				<Text text={ header } fontWeight='900' fontSize='28px' lineHeight='48px' />
				<Text text={ subHeader } fontWeight='400' fontSize='16px' lineHeight='normal' color={ colors.grey.default } />
				<Form
					onSubmit={ async e => {
						const { pin } = onSubmit(e);
						checkPinTrigger({
							pin: pin.value,
						});
						if (checkPinResponse?.stat_msg === 'Success') {
							await onSuccess();
						}
					} }>
					<Text text={ header } fontWeight='900' fontSize='28px' lineHeight='48px' />
					<Text text={ subHeader } fontWeight='400' fontSize='16px' lineHeight='normal' color={ colors.grey.default } />
					{
						checkPinError &&
						<div className='mt-[20px]'>
							<NotificationPanel
								showIconLeft={ false }
								showIconRight={ false }
								mode={ 'error' }
								visible={ true }
							>
								<Text
									fontType={ null }
									fontSize='14px'
									fontWeight='500'
									text={ checkPinError }
									color={ colors.red.default }
								/>
							</NotificationPanel>
						</div>
					}
					<div className='mt-[48px] mb-[20px]'>
						<Text text={ 'PIN' } fontWeight='700' />
						<Form.TextFieldPin
							className='input'
							digitLength={ 6 }
							semiSecure={ false }
							password={ true }
							{ ...registeredValue('pin', true) }
						/>
					</div>
					<Button type='submit' disabled={ checkPinLoading } >
						{ checkPinLoading ? <Spinner /> : submitBtnLabel }
					</Button>
				</Form>
			</PinModalContainer>
		</Modal>
	);
};

export default PinModal;