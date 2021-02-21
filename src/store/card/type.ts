import { 
	getCards, 
	deleteCard, 
	onScrapCard, 
	offScrapCard,
	GET_CARDS_SUCCESS,
	GET_CARDS_FAILURE
} from './actions';

export type CardType = {
	description: string;
	id: number;
	image_url: string;
	is_scrap?: boolean;
	nickname: string;
	profile_image_url: string;
}

export type CardState = {
	loading: boolean;
	error: boolean;
	errorDesc: string | null;
	cards: Map<number | string, CardType>;
	scrapCards: any;
	pageNum: number;
	isDone: boolean;
}

export type CardAction = 
	| ReturnType<typeof getCards>
	| { type: typeof GET_CARDS_SUCCESS, cards: CardType[] }
	| { type: typeof GET_CARDS_FAILURE, errorDesc: string }
	| ReturnType<typeof deleteCard>
	| ReturnType<typeof onScrapCard>
	| ReturnType<typeof offScrapCard>

	