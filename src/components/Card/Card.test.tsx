import * as React from 'react';
import { render, fireEvent } from 'utils/testUtils';
import Card from 'components/Card';

describe('<Card />', () => {
	// data
	const card = {
		id: 594037,
		image_url: 'https://image.ohou.se/image/central_crop/bucketplace-v2-development/uploads-cards-snapshots1547907139_Oc9.jpeg/640/640',
		nickname: '사용자 83',
		profile_image_url: 'https://image.ohou.se/image/central_crop/bucketplace-v2-development/uploads-default_images-avatar.png/80/80',
		description: '안녕하세요, 버킷플레이스 홈워크 입니다. 안녕하세요, 버킷플레이스 홈워크 입니다. 안녕하세요, 버킷플레이스 홈워크 입니다. 안녕하세요, 버킷플레이스 홈워크 입니다. 안녕하세요, 버킷플레이스 홈워크 입니다.'
	}
	const isScrap = false;

	// setup
	const setup = () => {
		return render(
			<Card 
				card={card}
				isScrap={isScrap}
			/>
		);
	}

	it('렌더링이 제대로 이뤄진다.', () => {	
		const { getByText, getByAltText } = setup();
		
		getByText(card.nickname);
		getByAltText('집 이미지');
		getByAltText('스크랩 OFF');
	});
	
	// it('스크랩 처리를 On한다.', () => {
	// 	const { getByAltText } = setup();
	// 	const scrapOffBtn = getByAltText('스크랩 OFF');
		
	// 	fireEvent.click(scrapOffBtn);

	// 	// 스크랩 이미지가 바뀐다.
	// 	getByAltText('스크랩 ON');
		
	// 	// store의 카드 데이터에서 scrap값이 바뀐다.
	// });

	// it('스크랩 처리를 Off한다.', () => {
	// 	// 스크랩 이미지가 바뀐다.
	// 	// store의 카드 데이터에서 scrap값이 바뀐다.
	// });



});