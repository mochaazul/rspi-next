// reference: https://github.com/vercel/swr/issues/2281
const clearSWRCache = async (cache: any, mutate: any) => {
	await Promise.all([...cache.keys()].map((key) => mutate(key)));
};

export default clearSWRCache;