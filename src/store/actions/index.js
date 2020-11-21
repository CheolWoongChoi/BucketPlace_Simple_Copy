import axios from 'axios';
import { GET_CARDS } from '../actionTypes';

export const getCards = pageNum => async dispatch => {
	const response = await axios.get(`https://bucketplace-coding-test.s3.amazonaws.com/cards/page_${pageNum}.json`);

	dispatch({
		type: GET_CARDS,
		payload: response.data
	});
};