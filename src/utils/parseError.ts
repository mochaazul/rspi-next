export const isTokenError = (err: Error) => {
	console.log({ err });
	if (err.message.toLowerCase().includes('token is invalid'))
		return true;
	if (err.message.toLowerCase().includes('token is expired'))
		return true;

	return false;
};