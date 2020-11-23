import React, { useCallback } from 'react';
import './ScrapCheck.scss';

const ScrapCheck = ({ isScrap, setIsScrap }) => {
	const handleScrap = useCallback(() => {
		localStorage.setItem('is_scrap', !isScrap);	
		setIsScrap(!isScrap);
	}, [isScrap]);

	return (
		<div className='scrap-check-wrap' onClick={handleScrap}>
			{isScrap 
				? <img src='https://cdn.zeplin.io/5c8f3e869af34605699edb97/assets/4DD7EEDC-0672-410C-968E-266D976BE9AD.svg' alt='스크랩체크 ON' />
				: <img src='https://cdn.zeplin.io/5c8f3e869af34605699edb97/assets/BE763DE9-6A86-4C22-B039-412B4141DD02.svg' alt='스크랩체크 OFF' />}
			<span className='text'> 스크랩한 것만 보기</span>
		</div>
	);
}

export default ScrapCheck;