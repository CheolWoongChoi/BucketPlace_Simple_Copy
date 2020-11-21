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

		if (scrollPosY + screenHeight >= pageHeight - 300) {
			if (isDone) {
				window.removeEventListener('scroll', handleWindowScroll);
			} else {
				dispatch(getCards(pageNum));
			}
		}
	}, 250);

	const renderCards = () => {
		const cardsArray = [];

		_.forOwnRight(cards, (cardInfo, key) => {
			cardsArray.push(<Card key={key} cardInfo={cardInfo} />)
		});

		console.log(cardsArray);

		return cardsArray;
	};

	useEffect(() => {
		dispatch(getCards(pageNum));
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
					? ''
					: renderCards()
				}
			</div>
		</div>
	);
}

export default App;