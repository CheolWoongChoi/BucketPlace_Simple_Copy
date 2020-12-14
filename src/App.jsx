import _ from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import ScrapCheck from 'components/ScrapCheck';
import Card from 'components/Card';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getCards } from 'actions';
import { getLocalStorageItem } from 'utils';
import './App.scss';

const App = () => {
	const dispatch = useDispatch();
	const [ isScrap, setIsScrap ] = useState(false);
	const { cards } = useSelector(state => state.card);
	const { pageNum, isDone } = useSelector(state => state.card, shallowEqual);

	const handleWindowScroll = useCallback(
		_.debounce(pageNum => {
			let pageHeight = document.body.scrollHeight;		
			let scrollPosY = document.documentElement.scrollTop;
			let screenHeight = window.innerHeight;

			if (scrollPosY + screenHeight >= pageHeight - 500) {
				dispatch(getCards(pageNum));
			}
		}, 250) 
	, []);

	const renderScrapCards = useCallback(() => {
		const scarpCardsObject = getLocalStorageItem('scrap_cards') || {};
		const scrapCardsOrder = getLocalStorageItem('scrap_cards_order') || [];
		const scrapCardsArray = scrapCardsOrder.map(id => <Card key={id} cardInfo={scarpCardsObject[id]} />);
		
		return scrapCardsArray;
	}, []);

	const renderUserCards = useCallback(() => {
		const cardsArray = [];

		_.forOwnRight(cards, (cardInfo, key) => {
			cardsArray.push(<Card key={key} cardInfo={cardInfo} />)
		});

		return cardsArray;
	}, [cards]);

	useEffect(() => {
		const prevIsScrap = getLocalStorageItem('is_scrap');

		dispatch(getCards(pageNum));
		setIsScrap(prevIsScrap);
	}, []);

	useEffect(() => {
		if (isDone) {
			window.onscroll = null;
		} else {
			window.onscroll = () => handleWindowScroll(pageNum);
		}

		return () => {
			window.onscroll = null;
		};
	}, [pageNum, isDone]);

	return (
		<div className='container'>
			<div className='top'>
				<ScrapCheck isScrap={isScrap} setIsScrap={setIsScrap} />
			</div>
			<div className='cards-wrap'>
				{isScrap 
					? renderScrapCards()
					: renderUserCards()
				}
			</div>
		</div>
	);
}

export default App;