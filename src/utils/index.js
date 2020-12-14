
export const getLocalStorageItem = item => {
	const obj = JSON.parse(localStorage.getItem(item));
	
	return obj ? new Map(Object.entries(obj)) : null;
}

export const setLocalStorageItem = (item, map) => {
	localStorage.setItem(item, JSON.stringify(Object.fromEntries(map)));
}