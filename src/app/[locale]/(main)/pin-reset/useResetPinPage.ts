import { createPin as pinAction, updatePin } from '@/stores/actions';
import { useAppDispatch } from '@/hooks';
import {
	requiredRule,
	minLengthRule,
	maxLengthRule,
	createFieldConfig,
	fieldsMatchRule
} from '@/helpers';
import { PinType } from '@/interface';
import { Languages } from '@/constant';

const { pinConfirmLabel, pinFieldLabel } = Languages.page.pinPage.form;

export const pinField = {
	pin: {
		...createFieldConfig({
			name: 'pin',
			type: 'password'
		}),
		validationRules: [
			requiredRule('pin'),
			minLengthRule('pin', 6),
			maxLengthRule('pin', 6),
			fieldsMatchRule('pin', ['confirmPin'])
		],
		label: pinFieldLabel
	},
	confirmPin: {
		...createFieldConfig({
			name: 'confirmPin',
			type: 'password'
		}),
		validationRules: [
			requiredRule('confirmPin'),
			minLengthRule('confirmPin', 6),
			maxLengthRule('confirmPin', 6),
			fieldsMatchRule('confirmPin', ['pin'])
		],
		label: pinConfirmLabel
	},
};

const useResetPinPage = () => {
	const pinDispatch = useAppDispatch<PinType>(updatePin);
	const onClickPin = ({ pin, confirmPin }: any) => {
		return pinDispatch({
			payload: {
				pin: pin,
				confirm_pin: confirmPin
			}
		});
	};

	return {
		onClickPin,
		pinField
	};
};

export default useResetPinPage;
