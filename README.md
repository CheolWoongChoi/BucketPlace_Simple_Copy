# 버킷플레이스 2020 웹 프론트엔드 과제

사진 피드를 만드는 과제입니다. 

### 1. 프로젝트 명령어
```
npm install : 프로젝트를 설치합니다.
npm start (또는 npm run dev) : 로컬 서버를 실행합니다.
npm run build : 배포 파일을 생성합니다.
``` 

### 2. 개발 스택
 - React
 - Redux
 - Redux-thunk
 - notistack : (Material-UI 기반 Snackbar, https://github.com/iamhosseindhv/notistack)
 - lodash
 - axios 

### 3. 컴포넌트 설명
 - Card : 카드의 UI와 기능을 구현한 컴포넌트입니다.
 - ScrapCheck : 상단의 스크랩 보기 UI와 기능을 구현한 컴포넌트입니다.

### 4. 프론트 데이터 설명
 - cards
	- Redux 데이터입니다. 
	- 서버에서 전달받은 배열 형태의 카드정보를 변형해 객체 형태로 가지고 있습니다.
	- cards: { id_1: { id_1의 카드 정보}, id_2: { id_2의 카드 정보 }, ... }

 - scrap_cards
	- localStorage의 데이터입니다.
	- cards 데이터와 마찬가지로 객체 형태입니다.
	- scrap_cards : { id_1: { id_1의 카드 정보 }, id_2: { id_2의 카드 정보 } }
 
 - scrap_cards_order
	- localStorage의 데이터입니다.
	- 스크랩된 카드들의 순서를 기억하기 위해 카드의 id 값을 저장합니다.
	- scrap_cards_order : [ id_1, id_2, id_3, ... ]

 - is_scrap
	- localStorage의 데이터입니다.
	- 스크랩보기 ON/OFF 상태를 저장하고, 페이지가 새로고침이 되어도 유지시켜줍니다.	