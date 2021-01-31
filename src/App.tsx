import * as _ from 'lodash';
import * as React from 'react'; 
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import ScrapCheck from 'components/ScrapCheck';
import Card from 'components/Card';
import { RootState } from 'store';
import { getCardsThunk } from 'store/card';
import { getLocalStorageItem } from 'utils';
import classNames from 'classnames/bind';
import styles from './App.scss';

const cx = classNames.bind(styles);

function App () {
	const dispatch = useDispatch();
	const [ isScrap, setIsScrap ] = useState(false);
	const { cards, scrapCards } = useSelector((state: RootState) => state.card);
	const { pageNum, isDone } = useSelector((state: RootState) => state.card);

	const handleWindowScroll = _.throttle(pageNum => {
		let pageHeight = document.body.scrollHeight;		
		let scrollPosY = document.documentElement.scrollTop;
		let screenHeight = window.innerHeight;

		if (scrollPosY + screenHeight >= pageHeight * 0.7) {
			dispatch(getCardsThunk(pageNum));
		}
	}, 250);
	
	const renderScrapCards = () => {
		const scrapCardsArray = [];

		for (let [key, card] of scrapCards.entries()) {
			scrapCardsArray.push(<Card key={key} card={card} isScrapCard />);
		}
		
		return scrapCardsArray;
	}

	const renderUserCards = () => {
		const cardsArray = [];

		for (let [key, card] of cards.entries()) {
			cardsArray.push(<Card key={key} card={card} />);
		}

		return cardsArray;
	};

	useEffect(() => {
		const prevIsScrap = Boolean(getLocalStorageItem('is_scrap'));

		dispatch(getCardsThunk(pageNum));
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
		<div className={cx('container')}>
			<div className={cx('top')}>
				<ScrapCheck isScrap={isScrap} setIsScrap={setIsScrap} />
			</div>
			<div className={cx('cards-wrap')}>
				{isScrap 
					? renderScrapCards()
					: renderUserCards()
				}
			</div>
		</div>
	);
}

export default App;