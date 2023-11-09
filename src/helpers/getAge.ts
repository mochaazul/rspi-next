import moment from 'moment';

export const getAge = (date: string) => {
	const isValid = moment(date).isValid();

	if (!isValid) {
		return 'Invalid Date';
	}

	const years = moment().diff(date, 'years');
	const month = moment().diff(date, 'months');
	if (years > 0) {
		return `${years} Yrs`;
	}
	return `${month} Mo`;
};