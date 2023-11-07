import { useState } from 'react';
import { registerOnboard as registerOnboardAction } from 'stores/actions';
import { useAppDispatch } from 'hooks';
import {
	requiredRule,
	createFieldConfig,
} from 'helpers';
import { RegisterOnboardType } from 'interface';
import { Languages } from 'constant';
import { useAppAsyncDispatch } from 'hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';

const { birthDateLabel, mrlabel, phoneLabel } = Languages.page.registerOnboard.form;

export const registerOnboardField = {
	nomorRekamMedis: {
		...createFieldConfig({
			name: 'nomorRekamMedis',
			type: 'nomorRekamMedis'
		}),
		validationRules: [
			requiredRule('nomorRekamMedis'),
		],
		label: mrlabel
	},
	phone: {
		...createFieldConfig({
			name: 'phone',
			type: 'phone'
		}),
		validationRules: [
			requiredRule('phone'),
		],
		label: phoneLabel
	},
	dateOfBirth: {
		...createFieldConfig({
			name: 'dateOfBirth',
			type: 'dateOfBirth'
		}),
		validationRules: [
			requiredRule('dateOfBirth'),
		],
		label: birthDateLabel
	},
};

const useRegisterOnboard = () => {
	const navigate = useNavigate();
	const registerOnboardAsync = useAppAsyncDispatch<RegisterOnboardType>(registerOnboardAction);

	const [loadingOnBoarding, setLoadingOnBoarding] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const onClickRegisterOnboard = async ({ medical_record, phone, birth_date, name }: any) => {
		try {
			setLoadingOnBoarding(true);
			await registerOnboardAsync({
				payload: {
					medical_record,
					phone,
					birth_date,
					name,
				}
			});
			navigate(`/otp-verification?mr=${ medical_record }&phone=${ phone }&bod=${ birth_date }&name=${ name }`);
			// console.log(res);
		} catch (error) {
			setModalVisible(false);
		} finally {
			setLoadingOnBoarding(false);
		}
	};

	return {
		modalVisible,
		setModalVisible,
		onClickRegisterOnboard,
		registerOnboardField,
		loadingOnBoarding
	};
};

export default useRegisterOnboard;
