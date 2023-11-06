import { endpoints } from 'constant';
import { ContactUsSubmitType } from 'interface';
import { thunkUtils } from 'utils';

// function that accepts a Redux action type string and a callback function that should return a promise

export const addContactUs = thunkUtils<null, ContactUsSubmitType>({
	type: 'add/contactUs',
	endpoint: endpoints.contactUs,
	method: 'POST',
});