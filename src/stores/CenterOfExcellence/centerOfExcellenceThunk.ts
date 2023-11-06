import { CenterOfExcellenceDetail, PayloadCenterCenterOfExcellence } from 'interface';
import { endpoints } from 'constant';
import { thunkUtils } from 'utils';

export const getCenterOfExcellence = thunkUtils<CenterOfExcellenceDetail[], PayloadCenterCenterOfExcellence>({
	type: 'centerOfExcellence/getCenterOfExcellence',
	method: 'GET',
	endpoint: endpoints.centerOfExcellences,
});

export const getCenterOfExcellenceNewsByID = thunkUtils({
	type: 'centerOfExcellence/getRelatedNewsByID',
	method: 'GET',
	endpoint: `${ endpoints.newsCenterOfExcellence }`,
});