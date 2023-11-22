import type { useScopedI18n } from '@/locales/client';

export type ScopedValidationTranslation = Awaited<ReturnType<typeof useScopedI18n<'validation.formValidation'>>>;
export type ValidationParams = {
	label?: string;
	minLength?: string | number;
	length?: string | number;
	minCapitalize?: string | number;
	maxFileSize?: string | number;
};

export const getValidationTranslation = (
	passedScopedT: ScopedValidationTranslation,
	errorKey?: string,
	params?: ValidationParams
) => {
	// Notes: untuk translation dynamic value selain label, seperti minLength dan minCapitalize, params dapat di define di error message yup.
	// contoh: `yup.string().min(8, 'minLength_8')`
	const keys = errorKey?.split('_');

	if (!keys?.[0]) return;

	switch (keys?.[0]) {
		case 'required':
			return passedScopedT('required', { label: params?.label });
		case 'emailNotValid':
			return passedScopedT('emailNotValid');
		case 'minLength':
			return passedScopedT('minLength', { minLength: params?.minLength ?? keys?.[1], label: params?.label });
		case 'minCapitalize':
			return passedScopedT('minCapitalize', { minCapitalize: params?.minCapitalize ?? keys?.[1], label: params?.label });
		case 'exactLength':
			return passedScopedT('exactLength', { length: params?.length ?? keys?.[1], label: params?.label });
		case 'notMatch':
			return passedScopedT('notMatch', { label: params?.label });
		case 'fileNotValid':
			return passedScopedT('fileNotValid');
		case 'maxFileSize':
			return passedScopedT('maxFileSize', { maxFileSize: params?.maxFileSize ?? keys?.[1] });
		case 'phoneNotValid':
			return passedScopedT('phoneNotValid');
		default:
			return errorKey; // return error message from message value yup
	}
};