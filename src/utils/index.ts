import { CardType } from 'store/card';

export const getLocalStorageItem = (item: string) => {
	const obj: { [key: number]: CardType } | undefined = JSON.parse(localStorage.getItem(item)!);
	
	if (obj) {
		const map = new Map();
		
		for (let prop in obj) {
			map.set(Number(prop), obj[prop]);
		}
		
		return map;
	} 

	return null;
}

export const setLocalStorageItem = (item: string, map: Map<number, CardType>) => {
	localStorage.setItem(item, JSON.stringify(Object.fromEntries(map)));
}