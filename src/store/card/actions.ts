import { AxiosResponse } from 'axios';
import * as cardApis from 'api/card';
import { call, put, takeEvery } from 'redux-saga/effects';
import { CardType } from './types';

export const GET_CARDS = 'GET_CARDS' as const;
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS' as const;
export const GET_CARDS_FAILURE = 'GET_CARDS_FAILURE' as const;
export const DELETE_CARD = 'DELETE_CARD' as const;
export const ON_SCRAP_CARD = 'ON_SCRAP_CARD' as const;
export const OFF_SCRAP_CARD = 'OFF_SCRAP_CARD' as const; 

export const getCards = (page: number) => ({
	type: GET_CARDS,
	page
});

export const deleteCard = (id: number) => ({
	type: DELETE_CARD,
	id
});

export const onScrapCard= (id: number) => ({
	type: ON_SCRAP_CARD,
	id
});

export const offScrapCard = (id: number) => ({
	type: OFF_SCRAP_CARD,
	id
});

function* getCardsSaga(action: ReturnType<typeof getCards>) {
	try {
		const res: AxiosResponse<CardType[]> = yield call(cardApis.getCards, action.page);

		yield put({
			type: GET_CARDS_SUCCESS,
			cards: res.data
		});
	} catch (e) {
		yield put({
			type: GET_CARDS_FAILURE,
			errorDesc: e
		});
	}
};

export function* cardSaga() {
	yield takeEvery(GET_CARDS, getCardsSaga);
}