import React from 'react';
import ScrapCheck from './components/ScrapCheck';
import Card from './components/Card';
import './App.scss';

const App = () => {
	return (
		<div className='container'>
			<div className='top'>
				<ScrapCheck />
			</div>
			<div className='cards-wrap'>
				{Array(11).fill(0).map((v, i) => <Card key={i} />)}
			</div>
		</div>
	);
}

export default App;