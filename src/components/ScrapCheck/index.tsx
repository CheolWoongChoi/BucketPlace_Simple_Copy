import * as React from 'react';
import { useCallback, memo, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames/bind';
import styles from './ScrapCheck.scss';

const cx = classNames.bind(styles);

type ScrapCheckProps = {
	isScrap: boolean;
	setIsScrap: Dispatch<SetStateAction<boolean>>;
}

function ScrapCheck ({ isScrap, setIsScrap }: ScrapCheckProps) {
	const handleScrap =() => {
		localStorage.setItem('is_scrap', String(!isScrap));	
		setIsScrap(!isScrap);
	};

	return (
		<div className={cx('scrap-check-wrap')} onClick={handleScrap}>
			{isScrap 
				? <img src='https://cdn.zeplin.io/5c8f3e869af34605699edb97/assets/4DD7EEDC-0672-410C-968E-266D976BE9AD.svg' alt='스크랩체크 ON' />
				: <img src='https://cdn.zeplin.io/5c8f3e869af34605699edb97/assets/BE763DE9-6A86-4C22-B039-412B4141DD02.svg' alt='스크랩체크 OFF' />}
			<span className={cx('text')}> 스크랩한 것만 보기</span>
		</div>
	);
}

export default memo(ScrapCheck);