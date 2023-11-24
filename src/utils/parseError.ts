export const isTokenError = (err: Error) => {
	if (err.message.toLowerCase().includes('token is invalid'))
		return true;
	if (err.message.toLowerCase().includes('token is expired'))
		return true;
	if (err.message.toLowerCase().includes('signed out because your account is signed in from another device'))
		return true;

	return false;
};