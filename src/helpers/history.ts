import { NavigateFunction, NavigateOptions } from 'react-router-dom';

type CustomHistory = {
	navigate: NavigateFunction | null;
	push: (page: string, rest: any) => void;
};

const History: CustomHistory = {
	navigate: null,
	push: (page: any, options?: NavigateOptions) => {
		if (History.navigate) {
			History.navigate(page, options);
		}
	},
};

export default History;