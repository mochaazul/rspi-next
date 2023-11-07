import { getLanguage } from 'helpers/localStorage';

import id from './id';
import en from './en';

const lang = () => ({
	idn: id,
	en
}[getLanguage() ?? 'idn']) ?? id;

export default lang();
