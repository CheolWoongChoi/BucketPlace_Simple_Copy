
import { GET_CARDS, ON_SCRAP_CARD, OFF_SCRAP_CARD } from '../actionTypes';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils';

const initialState = {
	cards: {},
	pageNum: 1,
	isDone: false,
};

export default function (state = initialState, action) {
	const scrapCards = getLocalStorageItem('scrap_cards') || {};
	const scrapCardsOrder = getLocalStorageItem('scrap_cards_order') || [];
	const { type, payload } = action;
	const { cards, pageNum } = state;
	
	switch(type) {
		case GET_CARDS: {
			if (payload.length) {
				payload.map(newCard => {
					const isScrap = scrapCards && scrapCards[newCard.id] ? true : false;		
					cards[newCard.id] = { ...newCard, is_scrap: isScrap }
				});

				return {
					...state,
					cards: cards,
					pageNum: pageNum + 1
				};
			} else {
				return {
					...state,
					isDone: true
				};
			}
		}
		case ON_SCRAP_CARD: {
			cards[payload].is_scrap = true;
			
			scrapCards[payload] = cards[payload];
			scrapCardsOrder.push(payload);
			
			setLocalStorageItem('scrap_cards', scrapCards);
			setLocalStorageItem('scrap_cards_order', scrapCardsOrder);

			return {
				...state,
				cards: cards
			};
		}
		case OFF_SCRAP_CARD: {
			cards[payload].is_scrap = false;
			
			delete scrapCards[payload];
			scrapCardsOrder.splice(scrapCardsOrder.indexOf(payload), 1);

			setLocalStorageItem('scrap_cards', scrapCards);
			setLocalStorageItem('scrap_cards_order', scrapCardsOrder);
			
			return {
				...state,
				cards: cards
			};
		}
		default:
			return state;
	}
}