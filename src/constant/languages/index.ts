// import { getLanguage } from '@/helpers/localStorage'; // TODO: migrate

import id from './id';
import en from './en';

// TODO: migrate
// const lang = () => ({
// 	idn: id,
// 	en
// }[getLanguage() ?? 'idn']) ?? id;
const lang = () => ({
	idn: id,
	en
}['idn']) ?? id; // TODO: migrate

export default lang();
