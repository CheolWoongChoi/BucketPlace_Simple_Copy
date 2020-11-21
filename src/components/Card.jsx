import React from 'react';
import './Card.scss';
import { card } from '../constants/constants';

const Card = () => {
	const { id, image_url, nickname, profile_image_url } = card;
	const isScrap = true;

	return (
		<div className='card-wrap'>
			<div className='profile-wrap'>
				<img src={profile_image_url} alt='닉네임' />
				<span className='nickname'>{nickname}</span>
			</div>
			<div className='contents-wrap'>
				<img className='img-interior' src={image_url} alt='집 이미지' />
				{isScrap 
					? <img className='img-scrap' src={'https://cdn.zeplin.io/5c8f3e869af34605699edb97/assets/2C8BC1E8-8587-441B-A930-DBAFABC1D642.svg'} alt='스크랩 ON' />
					: <img className='img-scrap' src={'https://cdn.zeplin.io/5c8f3e869af34605699edb97/assets/638542E4-48B1-4539-AA12-D3D930465487.svg'} alt='스크랩 OFF' />}
			</div>
		</div>
	);
}

export default Card;