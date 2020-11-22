import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import ScrapCheck from './components/ScrapCheck';
import Card from './components/Card';
import { useSelector, useDispatch } from 'react-redux';
import { getCards } from './store/actions';
import './App.scss';

const App = () => {
	const dispatch = useDispatch();
	const [ isScrap, setIsScrap ] = useState(false);
	const { cards, pageNum, isDone } = useSelector(state => state.card);

	const handleWindowScroll = _.debounce(() => {
		let pageHeight = document.body.scrollHeight;		
		let scrollPosY = document.documentElement.scrollTop;
		let screenHeight = window.innerHeight;

		if (scrollPosY + screenHeight >= pageHeight - 400) {
			if (isDone) {
				window.removeEventListener('scroll', handleWindowScroll);
			} else {
				dispatch(getCards(pageNum));
			}
		}
	}, 250);

	const renderScrapCards = () => {
		const scrapCardsArray = [];
		const scarpCardsObject = JSON.parse(localStorage.getItem('scrap_cards'));

		_.forOwn(scarpCardsObject, (cardInfo, key) => {
			scrapCardsArray.push(<Card key={key} cardInfo={cardInfo} />)
		});

		return scrapCardsArray;
	};

	const renderUserCards = () => {
		const cardsArray = [];

		_.forOwnRight(cards, (cardInfo, key) => {
			cardsArray.push(<Card key={key} cardInfo={cardInfo} />)
		});

		return cardsArray;
	};

	useEffect(() => {
		const prevIsScrap = JSON.parse(localStorage.getItem('is_scrap'));

		dispatch(getCards(pageNum));
		setIsScrap(prevIsScrap);
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleWindowScroll);

		return () => {
			window.removeEventListener('scroll', handleWindowScroll);
		};
	}, [pageNum]);

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