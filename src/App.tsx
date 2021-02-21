import * as _ from 'lodash';
import * as React from 'react'; 
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import ScrapCheck from 'components/ScrapCheck';
import Card from 'components/Card';
import { RootState } from 'store';
import { getCards } from 'store/card';
import { getLocalStorageItem } from 'utils';
import classNames from 'classnames/bind';
import styles from './App.scss';

const cx = classNames.bind(styles);

function App () {
	const dispatch = useDispatch();
	const [ isScrap, setIsScrap ] = useState(false);
	const { 
		cards, 
		scrapCards, 
		pageNum, 
		isDone,
		error 
	} = useSelector((state: RootState) => state.card);

	const handleWindowScroll = _.throttle(pageNum => {
		let pageHeight = document.body.scrollHeight;		
		let scrollPosY = document.documentElement.scrollTop;
		let screenHeight = window.innerHeight;

		if (scrollPosY + screenHeight >= pageHeight * 0.7) {
			dispatch(getCards(pageNum));
		}
	}, 250);
	
	const renderScrapCards = () => {
		const scrapCardsArray = [];

		for (let [key, card] of scrapCards.entries()) {
			scrapCardsArray.push(<Card key={key} card={card} dispatch={dispatch} />);
		}
		
		return scrapCardsArray;
	}

	const renderUserCards = () => {
		const cardsArray = [];

		for (let [key, card] of cards.entries()) {
			cardsArray.push(<Card key={key} card={card} isScrap={card.is_scrap} dispatch={dispatch} />);
		}

		return cardsArray;
	};

	useEffect(() => {
		const prevIsScrap = Boolean(getLocalStorageItem('is_scrap'));

		dispatch(getCards(pageNum));
		setIsScrap(prevIsScrap);
	}, [dispatch]);

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
		<div className={cx('container')}>
			<div className={cx('top')}>
				<ScrapCheck isScrap={isScrap} setIsScrap={setIsScrap} />
			</div>
			<div className={cx('cards-wrap')}>
				{error && <div>에러가 발생했습니다. 새로고침을 눌러주세요.</div>}
				{!error && isScrap ? renderScrapCards() : renderUserCards()}
			</div>
		</div>
	);
}

export default App;