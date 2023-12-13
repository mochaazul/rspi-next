
const clearSWRCache = async(cache: any) => {
	const keys = cache.keys();
	
	for (const key of keys) {
		const keyString = key.toString();
		if (!['masterDoctor', 'doctorSchedule', 'doctorCalendar', 'doctorTimeSlot'].some(keyword => keyString.includes(keyword))) {
			cache.delete(key);
		}
	}
};

export default clearSWRCache;