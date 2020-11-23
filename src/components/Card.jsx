import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { onScrapCard, offScrapCard } from '../store/actions';
import './Card.scss';

const Card = ({ cardInfo }) => {
	const dispatch = useDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { id, image_url, nickname, profile_image_url, is_scrap } = cardInfo;
	
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

	return (
		<div className='card-wrap'>
			<div className='profile-wrap'>
				<img src={profile_image_url} alt='닉네임' />
				<span className='nickname'>{nickname}</span>
			</div>
			<div className='contents-wrap'>
				<img className='img-interior' src={image_url} alt='집 이미지' />
				{is_scrap 
					? <img 
							className='img-scrap' 
							src={'https://cdn.zeplin.io/5c8f3e869af34605699edb97/assets/638542E4-48B1-4539-AA12-D3D930465487.svg'} 
							alt='스크랩 ON' 
							onClick={handleOffScrapCard}
						/>
					: <img 
							className='img-scrap' 
							src={'https://cdn.zeplin.io/5c8f3e869af34605699edb97/assets/2C8BC1E8-8587-441B-A930-DBAFABC1D642.svg'} 
							alt='스크랩 OFF' 
							onClick={handleOnScrapCard}
						/> 
					}
			</div>
		</div>
	);
}

export default Card;