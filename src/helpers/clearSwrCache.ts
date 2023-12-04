
const clearSWRCache = async(cache:any) => {
	const keys = cache.keys();
	for (const key of keys) {
		cache.delete(key);
	}
};

export default clearSWRCache;