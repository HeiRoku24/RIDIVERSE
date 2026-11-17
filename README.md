# 리디 게임 데모 웹페이지 (교육용 · 64차 11/16 시안)

민지 목업(메인 main-1~4 · 상세 detail-1~4)을 1600px 화면 기준으로 옮긴 B 게임 메뉴 경로 데모.
실제 리디 서비스가 아니며 로그인·결제가 되지 않는다(모든 페이지 위 검은 띠에 표기).

## 페이지
- `index.html` 게임 메인 (히어로 = 목업 이미지 그대로 + 투명 링크 · 내가 읽은 작품의 게임 · 패스 띠 · 리디 게임 3장)
- `detail.html?g=chat|shoot|escape` 상세 (방탈출 = 목업 그대로 · 챗·슈팅은 목업이 없어 같은 틀 + 예시 설명)
- `ep1.html?g=…` 1화 끝 (목업 없음 → 64차 패스 시안 ①) · `origin.html?g=…` 원작 웹소설 작품 페이지(67차, 작가 필명·화수·별점·가격은 데모용 예시)
- 결제 시트 = 모든 페이지 공통 창 (64차 패스 시안 ②)

## 목업과 다른 곳 (결정에 맞춤)
- 상세 스테이지: 목업 "1~3 stage 무료 · 4 결제" → **1 stage 무료 · 2~4 결제** · 안내 상자 "시즌 패스" → "게임패스" (1화 무료 → 2화부터 패스)
- 리뷰 제목 옆 "(평점·구매자 수·리뷰는 목업의 예시 값)" · 맨 위 교육용 띠 · 로그인/다른 메뉴는 눌러도 이동 안 함

## GA4 이벤트 (demo54/버튼_이벤트_대응표_초안.md B)
game_tab_view(메인 진입 · utm) · game_detail_view★(상세 열림, placement=game_home/direct) · play_start(지금 플레이하기 · 처음부터 · 1 stage) ·
episode_complete(1화 끝 도착) · begin_checkout★(결제 시트 열림, placement=game_home/game_detail/ep1_end) ·
purchase(“결제 완료로 기록(데모)” · item_type=game_pass · value 9900/14900 · pay_channel=web · transaction_id=demo-…) · origin_click(원작보기 · 원작 이어 읽기)
모든 이벤트에 is_demo=true. 측정 ID G-EN43XQPR2H.
`?debug=1`을 붙이면 왼쪽 아래에 보낸 이벤트 기록이 보인다(발표 시연·확인용).

## 배포 (GitHub Pages · HeiRoku24)
1. 이 폴더 내용을 저장소에 올리고 Settings → Pages → 브랜치 지정
2. 주소 예: `https://heiroku24.github.io/<저장소>/index.html?utm_source=popup&utm_medium=offline_qr&utm_campaign=game_launch&utm_content=exit`
3. GA4 → 실시간에서 이벤트·UTM 확인 → 캡처에 "테스트 트래픽" 표시
4. 맞춤 측정기준 등록(관리 → 맞춤 정의, 이벤트 범위): game_id · item_type · placement · plan · pay_channel · episode_no · origin_id · is_demo

## 67차(11/17) 바뀐 것
- 원작 페이지(`origin.html`)를 리디 웹소설 작품 페이지처럼 채움: 표지·작가(가상 필명)·연재 정보·이 작품의 게임·첫 구독 4,900P 안내·작품 소개·회차 5줄·키워드. 데이터는 `demo.js`의 `RD.ORIGIN`
- 용어 통일: stage → 화(회차). 잠긴 회차 표시 "결제" → 자물쇠 "게임패스". 상세 "처음부터" → "1화 무료 플레이"
- 상세에 "이렇게 플레이해요"(플레이 화면 · 한 판 시간 · 조작법, `RD.PLAY`) 추가 · 데모용 내부 메모 삭제
- 혜택 문구 통일: "첫 구독 원작 구매 4,900P" · 패스 띠 버튼 "게임패스 구독하기 · 월 9,900원"
- 메인 "내가 읽은 작품의 게임"에 원작 읽은 근거 한 줄 · 메인 h1(화면에는 숨김)
- 반응형: 1240px 고정을 풀고 1239px 이하·760px 이하 레이아웃 추가(폭 320~1440 가로 넘침 0)
- 이미지: `assets/img`를 webp로 바꾸고(약 6.3MB → 2.4MB) 아래쪽 그림은 지연 로딩. 원본 jpg·png는 그대로 둠
- GA4: 원작 → 게임 클릭은 `play_start(placement=origin)`, 원작에서 패스 안내는 `begin_checkout(placement=origin)`
