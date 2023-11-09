'use client';
import React, { useState, useCallback, useEffect } from 'react';

interface UseFormtype<T> {
	fields: T,
}

interface OnChangeValue {
	name?: string;
	value?: string;
}

interface UseFormReturnType<T> {
	onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => any;
	onChangeValue?: (event: OnChangeValue) => any;
	value: string;
	valid: boolean;
	errorMessage: string;
	label: string;
	name: keyof T;
	type: string;
}

const useForm = <T>({ fields }: UseFormtype<T>) => {
	const [form, setForm] = useState<T | any>(fields);
	const [error, setError] = useState<T | any>(fields);

	const registeredValue = (fieldname: keyof typeof fields, isCustomChange?: boolean) => {
		const inputObj = form[fieldname];
		const {
			value, label, errorMessage, valid, type
		} = inputObj;

		const returnData: UseFormReturnType<T> = {
			onChange: onInputChange,
			value,
			valid,
			errorMessage,
			label,
			name: fieldname,
			type,
			...inputObj
		};
		if (isCustomChange) {
			returnData.onChangeValue = onInputChangeValue;
		}

		return returnData;
	};

	const isInputFieldValid = useCallback(
		(inputField: any) => {
			for (const rule of inputField.validationRules) {
				if (!rule.validate(inputField.value, form)) {
					inputField.errorMessage = rule.message;
					return false;
				}
			}

			return true;
		},
		[form]
	);

	const onInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			const { name, value } = event.target;

			setForm({
				...form,
				[name]: {
					...form[name],
					value: value,
					valid: isInputFieldValid(form[name])
				}
			});
		},
		[form, isInputFieldValid]
	);

	const onInputChangeValue = useCallback(
		(event: OnChangeValue) => {
			const { name, value } = event;

			setForm({
				...form,
				[name as string]: {
					...form[name as string],
					value: value,
					valid: isInputFieldValid(form[name as string])
				}
			});
		},
		[form, isInputFieldValid]
	);

	const isFormValid = useCallback(() => {
		let isValid = true;
		let arr = Object.values(form) as any;
		arr = arr.map((field: T) => {
			const isValidInput = isInputFieldValid(field);
			return {
				...field,
				valid: isValidInput
			};
		});

		for (let i = 0; i < arr.length; i++) {
			if (!arr[i].valid) {
				isValid = false;
				break;
			}
		}

		return isValid;
	}, [form]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>): T => {
		e.preventDefault();
		return form;
	};

	const setFieldsValue = useCallback((obj: any) => {
		const newObj = { ...form };
		for (const [key, values] of Object.entries(form)) {
			newObj[key] = {
				...values as any,
				value: obj[key] || ''
			};
		}
		setForm({
			...form,
			...newObj
		});
	}, [form]);

	/**
	 * @description Set HTML attribute on a form
	 * @param attributeName string Name of the prop you want to change
	 * @param obj {key: value} Key used to determined which field and value is the value of the props
	 * @returns void
	 */
	const setFieldsProps = useCallback((attributeName: string, obj: any) => {
		const newObj = { ...form };

		for (const [key, values] of Object.entries(form)) {
			newObj[key] = {
				...values as any,
				[attributeName]: obj[key] || form[key][attributeName]
			};
		}
		setForm({
			...form,
			...newObj
		});
	}, [form]);

	const resetFieldsValue = useCallback(() => {
		setForm(fields);
	}, [form]);

	const getCurrentForm = (): T => form;

	return {
		registeredValue,
		isFormValid,
		onSubmit,
		setFieldsValue,
		resetFieldsValue,
		setFieldsProps,
		getCurrentForm
	};
};

export default useForm;
