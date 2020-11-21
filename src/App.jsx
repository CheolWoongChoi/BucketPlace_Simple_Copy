import React, { useEffect } from 'react';
import ScrapCheck from './components/ScrapCheck';
import Card from './components/Card';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { getCards } from './store/actions';
import './App.scss';

const App = () => {
	const dispatch = useDispatch();
	const { cards, pageNum, isDone } = useSelector(state => state.card);

	const handleWindowScroll = debounce(() => {
		let pageHeight = document.body.scrollHeight;		
		let scrollPosY = document.documentElement.scrollTop;
		let screenHeight = window.innerHeight;

		if (scrollPosY + screenHeight >= pageHeight - 100) {
			if (isDone) {
				window.removeEventListener('scroll', handleWindowScroll);
			} else {
				dispatch(getCards(pageNum));
			}
		}
	}, 200);

	useEffect(() => {
		dispatch(getCards(pageNum));
	}, []);

	useEffect(() => {
		console.log(pageNum);

		window.addEventListener('scroll', handleWindowScroll);

		return () => {
			window.removeEventListener('scroll', handleWindowScroll);
		};
	}, [pageNum]);

	return (
		<div className='container'>
			<div className='top'>
				<ScrapCheck />
			</div>
			<div className='cards-wrap'>
				{/* 전체 보기 */}
				{/* 스크랩 */}
				{cards.map((cardInfo, idx) => 
					<Card key={idx} cardInfo={cardInfo} />
				)}
			</div>
		</div>
	);
}

export default App;