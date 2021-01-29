import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { getCards } from './actions';
import { CardType } from './type';

export function getCardsThunk(pageNum: number): ThunkAction<void, RootState, null, ReturnType<typeof getCards>> {
	return async (dispatch: any) => {
		try {
			const res = await axios.get<CardType[]>(`https://bucketplace-coding-test.s3.amazonaws.com/cards/page_${pageNum}.json`);
		
			dispatch(
				getCards(res.data)	
			);
		} catch (e) {
			alert('정보를 가져오는데 에러가 발생했습니다.');
		}
	}
}