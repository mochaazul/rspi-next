'use client';

import { useState } from 'react';
import { FormikProps, useFormik } from 'formik';
import Link from 'next/link';

import Modal from '@/components/ui/Modal';
import Text from '@/components/ui/Text';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import { colors, icons } from '@/constant';
import NotificationPanel from '@/components/ui/NotificationPanel';
import Spinner from '@/components/ui/Spinner';
import { usePostCheckPinMutation, usePostRequestEmailVerifPinMutation } from '@/lib/api/client/auth';
import { useScopedI18n } from '@/locales/client';
import { getValidationTranslation } from '@/helpers/getValidationTranslation';
import { CheckPinSchema } from '@/validator/profile';
import { CheckPinType } from '@/interface';

import { PinModalContainer } from './style';
import { ModalStyle } from '../PageComponents/RegisterSections/InfoModal/style';

type Props = {
	visible: boolean,
	onSuccess: () => void;
	isLoading?: boolean;
	onClose?: () => void;
};

const PinModal = ({ visible, onSuccess, isLoading, onClose }: Props) => {
	const t = useScopedI18n('modalDialog.pin');
	const tValidation = useScopedI18n('validation.formValidation');

	const { trigger: checkPinTrigger, isMutating: checkPinLoading } = usePostCheckPinMutation();

	const [enableValidation, setEnableValidation] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const { trigger: reqEmailPinVerification } = usePostRequestEmailVerifPinMutation();
	const [showModalSuccessSentEmailPinVerification, setShowModalSuccessSentEmailPinVerification] = useState<boolean>(false);

	const formikPin: FormikProps<CheckPinType> = useFormik<CheckPinType>({
		validateOnBlur: enableValidation,
		validateOnChange: enableValidation,
		initialValues: { pin: '' },
		validationSchema: CheckPinSchema,
		onSubmit: async (formPin: CheckPinType) => {
			try {
				await checkPinTrigger(formPin);

				if (onSuccess) onSuccess();
			} catch (error: any) {
				setError(error?.message ?? '');
			} finally {
				setEnableValidation(false);
			}
		},
	});

	const onChangeValuePin = (data: { name?: string; value?: string; }) => {
		if (data?.name) {
			formikPin.setFieldValue(data?.name, data?.value ?? '');
		}
	};

	return (
		<>

			<Modal visible={ visible } onClose={ onClose }>
				<PinModalContainer>
					<Text text={ t('header') } fontWeight='900' fontSize='28px' lineHeight='48px' />
					<Text text={ t('subHeader') } fontWeight='400' fontSize='16px' lineHeight='normal' color={ colors.grey.default } />
					{
						error &&
						<div className='mt-5 w-full'>
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
					<Form
						onSubmit={ async e => {
							e.preventDefault();
							setEnableValidation(true);
							formikPin.handleSubmit();
						} }>
						<div className='mt-12 mb-5'>
							<Form.TextFieldPin
								className='input'
								digitLength={ 6 }
								semiSecure={ false }
								password={ true }
								value={ formikPin.values.pin }
								onChangeValue={ onChangeValuePin }
								id='pin'
								name='pin'
								type='password'
								label={ t('pinLabel') }
								errorMessage={ getValidationTranslation(tValidation, formikPin.errors.pin, { label: t('pinLabel') }) }
								isError={ !!formikPin.errors.pin }
							/>
						</div>
						<div className='mb-10 flex justify-center'>
							<Text
								fontSize='14px'
								lineHeight='21px'
								fontType={ null }
								fontWeight='700'
								color={ colors.paradiso.default }
								className='ml-1 inline-block cursor-pointer'
								subClassName='text-justify max-sm:leading-[18px]'
								text={ t('forgotPin') }
								onClick={ async () => {

									const res = await reqEmailPinVerification();
									if (res?.stat_code !== 'APP:SUCCESS') throw new Error(res?.stat_msg);
									setShowModalSuccessSentEmailPinVerification(true);

								} }
							/>
						</div>
						<Button type='submit' disabled={ checkPinLoading || isLoading } >
							{ checkPinLoading || isLoading ? <Spinner /> : t('submitBtnLabel') }
						</Button>
					</Form>
				</PinModalContainer>
			</Modal>
			<Modal noPadding containerClassName='w-[90vw] md:w-[480px]' visible={ showModalSuccessSentEmailPinVerification }>
				<ModalStyle>
					<icons.Confirmed />
					<Text
						fontSize='20px'
						lineHeight='19px'
						fontWeight='900'
						color={ colors.black.default }
						text={ 'Link Verifikasi Ubah PIN Terkirim' }
						className='mt-4'
						textAlign='center'
					/>
					<Text
						fontSize='16px'
						lineHeight='19px'
						fontWeight='400'
						color={ colors.grey.pencil }
						text={ 'Mohon periksa email Anda [email], untuk memverifikasi permintaan ubah PIN' }
						className='mt-2'
						textAlign='center'
					/>
					<Button
						className='mt-6'
						theme='primary'
						onClick={ () => { setShowModalSuccessSentEmailPinVerification(false); setError(''); } }
					>{ 'Okay' }</Button>
				</ModalStyle>
			</Modal>
		</>

	);
};

export default PinModal;