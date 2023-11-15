/* eslint-disable @typescript-eslint/no-unused-vars */
import { AwardsDetail, PayloadAwards } from '@/interface';
import { endpoints } from '@/constant';
import { thunkUtils } from '@/utils';

export const getAwards = thunkUtils<AwardsDetail[], PayloadAwards>({
	type: 'awards/getAwards',
	method: 'GET',
	endpoint: endpoints.awards,
});