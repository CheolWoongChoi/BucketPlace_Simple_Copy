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

	it('렌더링이 제대로 이뤄진다.', () => {	
		const utils = render(<Card card={card} isScrap={isScrap} />);
		
		utils.getByText(card.nickname);
		utils.getByAltText('집 이미지');
	});
});