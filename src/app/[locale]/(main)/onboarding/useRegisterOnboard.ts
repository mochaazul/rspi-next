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
	const registerOnboard = useAppDispatch<RegisterOnboardType>(registerOnboardAction);
	const registerOnboardAsync = useAppAsyncDispatch<RegisterOnboardType>(registerOnboardAction);

	const [loadingOnBoarding, setLoadingOnBoarding] = useState<boolean>(false);

	const onClickRegisterOnboard = async({ medical_record, phone, birth_date, name }: any) => {
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
			// console.log(res);
		} catch (error) {
			// console.log(error);
		} finally {
			setLoadingOnBoarding(false);
		}
	};

	return {
		onClickRegisterOnboard,
		registerOnboardField,
		loadingOnBoarding
	};
};

export default useRegisterOnboard;
