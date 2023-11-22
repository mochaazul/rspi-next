export const isTokenError = (err: Error) => {
	if (err.message.toLowerCase().includes('token is invalid'))
		return true;
	if (err.message.toLowerCase().includes('token is expired'))
		return true;

	return false;
};