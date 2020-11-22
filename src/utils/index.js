
export const getLocalStorageItem = item => {
	return JSON.parse(localStorage.getItem(item));
}

export const setLocalStorageItem = (item, value) => {
	localStorage.setItem(item, JSON.stringify(value));
}