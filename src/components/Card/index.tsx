import * as React from 'react';
import { useCallback, memo, Dispatch } from 'react';
import { useSnackbar } from 'notistack';
import { deleteCard, onScrapCard, offScrapCard, CardType } from 'store/card';
import classNames from 'classnames/bind';
import styles from './Card.scss';

const cx = classNames.bind(styles);

type CardProps = {
	card: CardType;
	isScrap?: boolean;
	dispatch: Dispatch<any>;
}

function Card({ card, isScrap, dispatch }: CardProps) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { id, image_url, nickname, profile_image_url, is_scrap } = card;
	
	const handleOnScrapCard = useCallback(() => {
		dispatch(onScrapCard(id));
		
		closeSnackbar();
		enqueueSnackbar('스크랩을 완료했습니다.', { variant: 'info', autoHideDuration: 1000 });	
	}, [id]);
	
	const handleOffScrapCard = useCallback(() => {
		dispatch(offScrapCard(id));

		closeSnackbar();
		enqueueSnackbar('스크랩을 취소했습니다.', {variant: 'error', autoHideDuration: 1000 });
	}, [id]);

	const handleDeleteCard = useCallback(() => {
		dispatch(deleteCard(id));
	}, [id]);

	return (
		<div className={cx('card-wrap')}>
			<div className={cx('profile-wrap')}>
				<img src={profile_image_url} alt='닉네임' />
				<span className={cx('nickname')}>{nickname}</span>
			</div>
			<div className={cx('contents-wrap')}>
				{/* {isScrap 
					? '' 
					: <button className={cx('delete-btn')} onClick={handleDeleteCard}>x</button>
				} */}
				<img className={cx('img-interior')} src={image_url} alt='집 이미지' />
				{is_scrap 
					? <img 
							className={cx('img-scrap')} 
							src={'https://cdn.zeplin.io/5c8f3e869af34605699edb97/assets/638542E4-48B1-4539-AA12-D3D930465487.svg'} 
							alt='스크랩 ON' 
							onClick={handleOffScrapCard}
						/>
					: <img 
							className={cx('img-scrap')} 
							src={'https://cdn.zeplin.io/5c8f3e869af34605699edb97/assets/2C8BC1E8-8587-441B-A930-DBAFABC1D642.svg'} 
							alt='스크랩 OFF' 
							onClick={handleOnScrapCard}
						/> 
					}
			</div>
		</div>
	);
}

export default memo(Card);