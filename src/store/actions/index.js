import axios from 'axios';
import { GET_CARDS, ON_SCRAP_CARD, OFF_SCRAP_CARD } from 'actionTypes';

export const getCards = pageNum => async dispatch => {
	const response = await axios.get(`https://bucketplace-coding-test.s3.amazonaws.com/cards/page_${pageNum}.json`);

	dispatch({
		type: GET_CARDS,
		payload: response.data
	});
};

export const onScrapCard= id => ({
	type: ON_SCRAP_CARD,
	payload: id
});

export const offScrapCard = id => ({
	type: OFF_SCRAP_CARD,
	payload: id
});