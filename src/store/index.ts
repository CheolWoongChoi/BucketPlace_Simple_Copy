import { combineReducers } from 'redux';
import card from './card';

const rootReducer = combineReducers({
	card
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;