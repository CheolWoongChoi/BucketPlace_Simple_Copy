import { combineReducers } from 'redux';
import card, { cardSaga } from './card';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
	card
});

export function* rootSaga() {
	yield all([cardSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;