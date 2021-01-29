import { CardType } from 'store/card';

export const getLocalStorageItem = (item: string) => {
	const obj: CardType | undefined = JSON.parse(localStorage.getItem(item)!);
	
	return obj ? new Map(Object.entries(obj)) : null;
}

export const setLocalStorageItem = (item: string, map: Map<number, CardType>) => {
	localStorage.setItem(item, JSON.stringify(Object.fromEntries(map)));
}