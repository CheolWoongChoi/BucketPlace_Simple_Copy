
import { GET_CARDS } from '../actionTypes';

const initialState = {
	cards: {},
	pageNum: 1,
	isScrap: false,
	isDone: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	
	switch(type) {
		case GET_CARDS: {
			const { cards, pageNum } = state;

			if (payload.length) {
				payload.map(newCard => {
					// 로컬 스토리지에 있는 지 체크
					cards[newCard.id] = { ...newCard, is_scrap: false }
				});

				return {
					...state,
					cards: cards,
					pageNum: pageNum + 1
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