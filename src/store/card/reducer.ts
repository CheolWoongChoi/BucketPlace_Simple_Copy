
import { GET_CARDS, DELETE_CARD, ON_SCRAP_CARD, OFF_SCRAP_CARD } from './actions';
import { CardType, CardState, CardAction } from './type';
import { getLocalStorageItem, setLocalStorageItem } from 'utils';

const initialState: CardState = {
	cards: new Map<number | string, CardType>(),
	scrapCards: getLocalStorageItem('scrap_cards') || new Map<number | string, CardType>(),
	pageNum: 1,
	isDone: false,
};

export default function (state = initialState, action: CardAction) {
	const { cards, pageNum, scrapCards } = state;
	
	switch(action.type) {
		case GET_CARDS: {
			if (action.payload.length) {
				action.payload.map((card: CardType) => {
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
			cards.delete(action.payload);

			return {
				...state,
				cards,
			}
		}
		case ON_SCRAP_CARD: {
			const card = cards.get(action.payload)!;
			card.is_scrap = true;

			scrapCards.set(action.payload, card);
			setLocalStorageItem('scrap_cards', scrapCards);

			return {
				...state,
				cards,
				scrapCards
			};
		}
		case OFF_SCRAP_CARD: {
			cards.get(action.payload)!['is_scrap'] = false;
			
			scrapCards.delete(action.payload);
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