import { CardType } from './type';

export const GET_CARDS = 'GET_CARDS' as const;
export const DELETE_CARD = 'DELETE_CARD' as const;
export const ON_SCRAP_CARD = 'ON_SCRAP_CARD' as const;
export const OFF_SCRAP_CARD = 'OFF_SCRAP_CARD' as const; 

export const getCards = (cards: CardType[]) => ({
	type: GET_CARDS,
	payload: cards
})

export const deleteCard = (id: number) => ({
	type: DELETE_CARD,
	payload: id
});

export const onScrapCard= (id: number) => ({
	type: ON_SCRAP_CARD,
	payload: id
});

export const offScrapCard = (id: number) => ({
	type: OFF_SCRAP_CARD,
	payload: id
});