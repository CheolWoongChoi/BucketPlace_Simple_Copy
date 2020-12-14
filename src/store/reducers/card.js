
import { GET_CARDS, DELETE_CARD, ON_SCRAP_CARD, OFF_SCRAP_CARD } from 'actionTypes';
import { getLocalStorageItem, setLocalStorageItem } from 'utils';

const initialState = {
	cards: new Map(),
	scrapCards: getLocalStorageItem('scrap_cards') || new Map(),
	pageNum: 1,
	isDone: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	const { cards, pageNum, scrapCards } = state;
	
	switch(type) {
		case GET_CARDS: {
			if (payload.length) {
				payload.map(card => {
					const isScrap = scrapCards.get(card.id) ? true : false;		
					cards.set(card.id, { ...card, is_scrap: isScrap });
				});

				return {
					...state,
					cards,
					pageNum: pageNum + 1
				};
			} else {
				return {
					...state,
					isDone: true
				};
			}
		}
		case DELETE_CARD: {
			cards.delete(payload);

			return {
				...state,
				cards,
			}
		}
		case ON_SCRAP_CARD: {
			const card = cards.get(payload);
			card.is_scrap = true;

			scrapCards.set(payload, card);
			setLocalStorageItem('scrap_cards', scrapCards);

			return {
				...state,
				cards,
				scrapCards
			};
		}
		case OFF_SCRAP_CARD: {
			cards.get(payload)['is_scrap'] = false;
			
			scrapCards.delete(payload);
			setLocalStorageItem('scrap_cards', scrapCards);
				
			return {
				...state,
				cards,
				scrapCards
			};
		}
		default:
			return state;
	}
}