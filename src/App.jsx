import _ from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import ScrapCheck from 'components/ScrapCheck';
import Card from 'components/Card';
import { getCards } from 'actions';
import { getLocalStorageItem } from 'utils';
import './App.scss';

const App = () => {
	const dispatch = useDispatch();
	const [ isScrap, setIsScrap ] = useState(false);
	const { cards, scrapCards } = useSelector(state => state.card);
	const { pageNum, isDone } = useSelector(state => state.card, shallowEqual);

	const handleWindowScroll = useCallback(
		_.throttle(pageNum => {
			let pageHeight = document.body.scrollHeight;		
			let scrollPosY = document.documentElement.scrollTop;
			let screenHeight = window.innerHeight;

			if (scrollPosY + screenHeight >= pageHeight * 0.7) {
				dispatch(getCards(pageNum));
			}
		}, 250) 
	, []);

	const renderScrapCards = useCallback(() => {
		const scrapCardsArray = [];

		for (let [key, card] of scrapCards.entries()) {
			scrapCardsArray.push(<Card key={key} card={card} isScrapCard />);
		}
		
		return scrapCardsArray;
	}, [scrapCards]);

	const renderUserCards = useCallback(() => {
		const cardsArray = [];

		for (let [key, card] of cards.entries()) {
			cardsArray.push(<Card key={key} card={card} />);
		}

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