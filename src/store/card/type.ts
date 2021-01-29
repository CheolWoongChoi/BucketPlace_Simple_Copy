import { getCards, deleteCard, onScrapCard, offScrapCard } from './actions';

export type CardType = {
	description: string;
	id: number;
	image_url: string;
	is_scrap?: boolean;
	nickname: string;
	profile_image_url: string;
}

export type CardState = {
	cards: Map<number | string, CardType>;
	scrapCards: any;
	pageNum: number;
	isDone: boolean;
}

export type CardAction = 
	| ReturnType<typeof getCards>
	| ReturnType<typeof deleteCard>
	| ReturnType<typeof onScrapCard>
	| ReturnType<typeof offScrapCard>

	