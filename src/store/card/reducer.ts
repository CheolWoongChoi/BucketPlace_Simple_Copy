
import { 
	GET_CARDS, 
	GET_CARDS_SUCCESS,
	GET_CARDS_FAILURE,
	DELETE_CARD, 
	ON_SCRAP_CARD, 
	OFF_SCRAP_CARD 
} from './actions';
import { CardType, CardState, CardAction } from './type';
import { getLocalStorageItem, setLocalStorageItem } from 'utils';

const initialState: CardState = {
	loading: false,
	error: false,
	errorDesc: null,
	cards: new Map<number | string, CardType>(),
	scrapCards: getLocalStorageItem('scrap_cards') || new Map<number | string, CardType>(),
	pageNum: 1,
	isDone: false,
};

export default function (state = initialState, action: CardAction) {
	const { cards, pageNum, scrapCards } = state;
	
	switch(action.type) {
		case GET_CARDS: {
			return {
				...state,
				loading: true,
			}
		}
		case GET_CARDS_SUCCESS: {
			if (action.cards.length) {
				action.cards.map((card: CardType) => {
					const isScrap = scrapCards.get(card.id) ? true : false;		
					cards.set(card.id, { ...card, is_scrap: isScrap });
				});

				return {
					...state,
					cards,
					loading: false,
					pageNum: pageNum + 1
				};
			} else {
				return {
					...state,
					loading: false,
					isDone: true
				};
			}
		}
		case GET_CARDS_FAILURE: {
			return {
				...state,
				error: true,
				errorDesc: action.errorDesc
			}
		}
		case DELETE_CARD: {
			cards.delete(action.id);

			return {
				...state,
				cards,
			}
		}
		case ON_SCRAP_CARD: {
			const card = cards.get(action.id)!;
			card.is_scrap = true;

			scrapCards.set(action.id, card);
			setLocalStorageItem('scrap_cards', scrapCards);

			return {
				...state,
				cards,
				scrapCards
			};
		}
		case OFF_SCRAP_CARD: {
			cards.get(action.id)!['is_scrap'] = false;
			
			scrapCards.delete(action.id);
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