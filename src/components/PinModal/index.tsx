import Modal from 'components/Modal';
import { PinModalContainer } from './style';
import Text from 'components/Text';
import languages from 'constant/languages';
import Form from 'components/Form';
import Button from 'components/Button';
import { colors } from 'constant';
import { useAppDispatch } from 'hooks';
import { CheckPinType, PinType } from 'interface';
import { checkPin } from 'stores/User';
import { createFieldConfig, requiredRule } from 'helpers';
import NotificationPanel from 'components/NotificationPanel';
import { useState } from 'react';
import Spinner from 'components/Spinner';

type Props = {
	visible: boolean,
	onSuccess: () => void;
};
const { header, subHeader, submitBtnLabel } = languages.modalDialog.pin;

const PinModal = ({
	visible,
	onSuccess
}: Props) => {
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const pinDispatch = useAppDispatch(checkPin);

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
						setIsLoading(true);
						const responseData = await pinDispatch({
							payload: {
								pin: pin.value,
							}
						});
						if (responseData.payload.stat_msg === 'Success') {
							await onSuccess();
						} else {
							setIsLoading(false);
							setError(responseData.payload.stat_msg);
						}
					} }>
					<Text text={ header } fontWeight='900' fontSize='28px' lineHeight='48px' />
					<Text text={ subHeader } fontWeight='400' fontSize='16px' lineHeight='normal' color={ colors.grey.default } />
					{
						error &&
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
									text={ error }
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
					<Button type='submit' disabled={ isLoading } >
						{ isLoading ? <Spinner /> : submitBtnLabel }
					</Button>
				</Form>
			</PinModalContainer>
		</Modal>
	);
};

export default PinModal;