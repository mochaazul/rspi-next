import { I_SpecialtyDropdownResponse } from '@/interface/specialities';
import fetcher, { ApiOptions } from './utils/fetcher';

export const getSpecialtyDropdown = (option?: ApiOptions) => {
	return fetcher<I_SpecialtyDropdownResponse[]>('specialtyDropdown', option);
};