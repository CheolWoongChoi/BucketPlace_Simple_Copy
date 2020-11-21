
import { GET_CARDS } from '../actionTypes';

const initialState = {
	cards: [],
	pageNum: 1,
	isScrap: false,
	isDone: false,
};

export default function (state = initialState, action) {
	switch(action.type) {
		case GET_CARDS: {
			if (action.payload.length) {
				const newCards = [...state.cards, ...action.payload];
				
				return {
					...state,
					cards: newCards,
					pageNum: state.pageNum + 1
				}
			} else {
				return {
					...state,
					isDone: true
				}
			}
		}
		default:
			return state;
	}
}