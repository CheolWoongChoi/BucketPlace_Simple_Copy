import axios from 'axios';
import { CardType } from 'store/card';

export const getCards = (page: number) => 
	axios.get<CardType[]>(`https://bucketplace-coding-test.s3.amazonaws.com/cards/page_${page}.json`);
