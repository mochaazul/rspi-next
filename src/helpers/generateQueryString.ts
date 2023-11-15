import { Pagination } from '@/interface';
const generateQueryString = (obj: Pagination) => {
	const str: string[] = [];
	for (const p in obj) {
		str.push(p + '=' + obj[p as keyof Pagination]);
	}
	return str.join('&');
};

export default generateQueryString;