const transformObjectToParams = (object: {
	[key: string]: string | number | undefined | null;
}) => {
	const params = Object.entries(object)
		.filter(([, value]) => value !== undefined && value !== null)
		.map(
			([key, value]) =>
				`${ encodeURIComponent(key) }=${ encodeURIComponent(String(value)) }`,
		);

	return params.length > 0 ? `?${ params.join('&') }` : '';
};

const isMobileOrTablet = () => {
	return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
};

type SharedLinkProps = { text?: string; url?: string; };

export const whatsappLink = ({ text, url }: SharedLinkProps) => {
	return (
		'https://' +
		(isMobileOrTablet() ? 'api' : 'web') +
		'.whatsapp.com/send' +
		transformObjectToParams({ text: text ? text : url })
	);
};

export const linkedinLink = ({ text, url }: SharedLinkProps) => {
	return (
		(isMobileOrTablet() ? 'https://www.linkedin.com/shareArticle' : 'https://www.linkedin.com/feed/?shareActive=true') +
		transformObjectToParams({ url, text })
	);
};

export const facebookLink = ({ text, url }: SharedLinkProps) => {
	return (
		'https://www.facebook.com/sharer/sharer.php' +
		transformObjectToParams({ u: url, text })
	);
};

export const telegramLink = ({ text, url }: SharedLinkProps) => {
	return (
		'https://t.me/share/url' +
		transformObjectToParams({
			url,
			text,
		})
	);
};

export const twitterLink = ({ text, url = '' }: SharedLinkProps) => {
	return (
		'https://twitter.com/intent/tweet' +
		transformObjectToParams({
			url,
			text
		})
	);
};