
import { GET_CARDS, ON_SCRAP_CARD, OFF_SCRAP_CARD } from '../actionTypes';

const initialState = {
	cards: {},
	pageNum: 1,
	isDone: false,
};

export default function (state = initialState, action) {
	let scrapCards = JSON.parse(localStorage.getItem('scrap_cards'));
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
			
			if (scrapCards) {
				scrapCards[payload] = cards[payload];
			} else {
				scrapCards = { [payload]: cards[payload] };
			}
			
			localStorage.setItem('scrap_cards', JSON.stringify(scrapCards));

			return {
				...state,
				cards: cards
			};
		}
		case OFF_SCRAP_CARD: {
			cards[payload].is_scrap = false;

			delete scrapCards[payload];
			localStorage.setItem('scrap_cards', JSON.stringify(scrapCards));

			return {
				...state,
				cards: cards
			};
		}
		default:
			return state;
	}
}