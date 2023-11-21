import type { useScopedI18n } from '@/locales/client';

export type ScopedValidationTranslation = Awaited<ReturnType<typeof useScopedI18n<'validation.formValidation'>>>;
type ValidationParams = {
	label?: string;
	minLength?: string;
	minCapitalize?: string;
};

export const getValidationTranslation = (
	passedScopedT: ScopedValidationTranslation,
	key?: string,
	params?: ValidationParams
) => {
	switch (key) {
		case 'required':
			return passedScopedT('required', { label: params?.label });
		case 'emailNotValid':
			return passedScopedT('emailNotValid');
		case 'minLength':
			return passedScopedT('minLength', { minLength: params?.minLength, label: params?.label });
		case 'minCapitalize':
			return passedScopedT('minCapitalize', { minCapitalize: params?.minCapitalize, label: params?.label });
		case 'notMatch':
			return passedScopedT('notMatch', { label: params?.label });
		default:
			return;
	}
};