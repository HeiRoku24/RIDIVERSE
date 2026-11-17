/* 리디 게임즈 데모(교육용) — 공통: 머리·꼬리·결제 시트·GA4 이벤트
   이벤트 이름·매개변수 = demo54/버튼_이벤트_대응표_초안.md (B 게임 메뉴 경로). 모든 이벤트에 is_demo=true.
   ★ 표시는 데모 보조 이벤트(GA4 데모에만): game_detail_view · begin_checkout */
(function () {
  var GA_ID = 'G-EN43XQPR2H';
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  /* 66차: ?debug=1(한 번 들어오면 그 탭 동안 유지)일 때만 debug_mode → GA4 DebugView에 '테스트'로 따로 보임. 평소엔 넣지 않음(false도 넣지 않아야 함) */
  var DBG0 = new URLSearchParams(location.search).get('debug') === '1';
  try { DBG0 = DBG0 || sessionStorage.getItem('ridi_demo_debug') === '1'; } catch (e) {}
  if (DBG0) gtag('set', { debug_mode: true });
  gtag('config', GA_ID, DBG0 ? { is_demo: true, debug_mode: true } : { is_demo: true });
  var s = document.createElement('script'); s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID; document.head.appendChild(s);

  var Q = new URLSearchParams(location.search);
  var DEBUG = Q.get('debug') === '1' || sessionStorage.getItem('ridi_demo_debug') === '1';
  if (Q.get('debug') === '1') { try { sessionStorage.setItem('ridi_demo_debug', '1'); } catch (e) {} }

  // 들어온 UTM은 세션 동안 기억해 game_tab_view 등에 같이 붙임(GA4는 주소의 UTM을 자동으로도 읽음)
  var UTM = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (k) {
    var v = Q.get(k); if (v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
    try { var w = sessionStorage.getItem(k); if (w) UTM[k] = w; } catch (e) {}
  });

  window.RD = {
    GAMES: {
      chat: { id: 'chat', origin: 'o1', type: 'AI채팅', title: '저와 공범이 되어 주시겠습니까?', title2: ['저와 공범이 되어', '주시겠습니까?'],
        tags: ['AI채팅', '로맨스판타지'], cover: 'cover_chat_v.webp', play: 'play_chat.webp', thumb: 'thumb_chat.webp',
        desc: ['남주 카시안 벨모어에게 한 마디를 건네면 답장이 옵니다.', '선택지 3개 중에 고르거나 직접 입력하세요. 대화마다 호감도가 쌓입니다.'],
        stages: ['1화 · 밤에 온 편지', '2화 · 공범의 조건', '3화 · 가면무도회', '4화 · 마지막 서명'], who: '카시안 벨모어', line: ['"조건은 하나뿐입니다.', '그건… 다음 밤에 말씀드리지요."'],
        real: 'https://belmore-accomplice.vercel.app/?k=dZKGRpWboXDyG0gJ', kw: ['#AI채팅', '#로맨스판타지', '#웹소설', '#RIDI_ONLY'] },
      shoot: { id: 'shoot', origin: 'o2', type: '슈팅', title: '지각 사유 : 게이트 폭주', title2: ['지각 사유 :', '게이트 폭주'],
        tags: ['슈팅', '헌터물', '액션'], cover: 'cover_shoot_v.webp', play: 'play_shoot.webp', thumb: 'thumb_shoot.webp',
        desc: ['60초 동안 몰려오는 몬스터를 처치하고 대사 컷을 확인하세요.', '콤보를 이어 가고 능력을 강화해 그날의 랭킹에 도전합니다.'],
        stages: ['1화 · 지각한 아침', '2화 · 터져 버린 게이트', '3화 · 등급 재측정', '4화 · 폭주의 끝'], who: '공이삼', line: ['"지각 사유요? 게이트가 터졌거든요.', '다음엔… 더 큰 놈이 옵니다."'],
        real: 'https://late-gate.vercel.app/9927c00b2d3a1d9962c92871/', kw: ['#슈팅', '#헌터물', '#액션', '#웹소설', '#RIDI_ONLY'] },
      escape: { id: 'escape', origin: 'o3', type: '방탈출', title: '저를 가두셨죠? 덕분에 전설의 환수를 얻었습니다', title2: ['저를 가두셨죠?', '덕분에 전설의 환수를 얻었습니다'],
        tags: ['방탈출', '판타지', '학원물'], cover: 'cover_escape_v.webp', play: 'play_escape.webp', thumb: 'thumb_escape.webp',
        desc: ['재능은 있지만 신분이 평민인 마법사 로아. 아카데미 장학생이 되어 입학하는데...', '시기와 질투를 받아 괴롭힘을 당하던 어느날 환수 계약의식날에 창고에 갇히다.', '하지만 그곳에서 인생을 바꿀만한 사건이 일어난다.'],
        stages: ['1화 · 용을 만나다', '2화 · 갑자기 생긴 남자친구', '3화 · 정식으로 시작하다', '4화 · 드디어 맞붙게 된 두 사람'],
        who: '녹스', line: ['"계약은 끝났다, 주인.', '그런데… 이 창고 밖에서도 날 부를 거냐?"'],
        real: 'https://nox-storeroom.vercel.app/9920aa3ddbae31e1beb46c48/' }
    },
    /* 상세 '이렇게 플레이해요'(1화 체험판 기준) · 원작 페이지(origin.html)용 가상 정보.
       작가 필명·화수·별점·가격·연재 요일은 모두 데모용 예시 값(근거 없음) */
    PLAY: {
      chat: { time: '약 1분 30초', how: ['카시안의 말에 선택지 3개 중 하나를 고르거나 직접 입력해요.', '카시안이 보인 감정에 따라 호감도가 쌓여요.'] },
      shoot: { time: '약 1분', how: ['몰려오는 괴물을 손가락으로 눌러 쏴요. 꾹 누르면 연사돼요.', '빗나가지 않고 콤보를 이으면 공격이 세지고, 그날의 랭킹에 기록돼요.'] },
      escape: { time: '약 2분', how: ['화면을 눌러 소리가 나는 곳과 숨은 단서를 찾아요.', '녹스의 능력(불꽃·날개·코)을 골라 길을 열어요.'] }
    },
    ORIGIN: {
      chat: { author: '벨벳잉크', genre: '로맨스판타지', total: 186, status: '완결', days: '', rating: '4.8', raters: '12,408', webtoon: true,
        intro: ['왕실 문장원의 실사관인 나에게 자정의 편지가 도착했다. 보낸 사람은 벨모어 백작가의 장남, 카시안 벨모어.',
                '사흘 뒤면 사생아로 판정될 그는 어머니의 혼인 기록을 되찾기 위해 나에게 공범이 되어 달라고 한다.',
                '들키면 함께 무너지는 거래. 그런데 이 남자의 미소에는 숨긴 것이 너무 많다.'],
        eps: ['자정의 편지', '봉랍의 조건', '지하 문서고', '엘리안느의 서명', '이복동생의 횃불'],
        kw: ['#로맨스판타지', '#계약관계', '#귀족', '#비밀', '#능글남', '#웹툰화', '#RIDI_ONLY'] },
      shoot: { author: '지각대장', genre: '현대판타지', total: 241, status: '연재중', days: '매주 월·목', rating: '4.7', raters: '9,815', webtoon: true,
        intro: ['오늘도 지각 확정인 고등학생 공이삼. 학교 앞 횡단보도 위로 하늘이 찢어지고 게이트가 열렸다.',
                '도망쳐야 하는데 손끝이 뜨겁다. 등급 측정도 받은 적 없는 평범한 학생의 손에서 빛이 터져 나온다.',
                '그리고 지각 사유서에 쓸 말이 하나 생겼다. "게이트가 터져서요."'],
        eps: ['8시 52분', '횡단보도 위의 게이트', '지각 사유서', '등급 재측정', '운동장의 균열'],
        kw: ['#현대판타지', '#헌터물', '#각성', '#학원', '#성장물', '#웹툰화', '#RIDI_ONLY'] },
      escape: { author: '은방울', genre: '로맨스판타지', total: 154, status: '연재중', days: '매주 화·금', rating: '4.9', raters: '15,232', webtoon: true,
        intro: ['재능은 있지만 신분은 평민인 마법사 로아. 아카데미 장학생으로 입학했지만 돌아온 건 시기와 괴롭힘뿐이었다.',
                '환수 계약 의식 날, 누군가 로아를 창고에 가둔다. 의식에 못 가면 퇴학이다.',
                '그런데 그 창고 구석에서, 아무도 모르던 전설의 환수가 눈을 뜬다.'],
        eps: ['평민 장학생', '잠긴 창고', '작은 용의 계약', '녹스', '잠긴 도서관'],
        kw: ['#로맨스판타지', '#학원물', '#마법학교', '#환수계약', '#인외남주', '#사이다/복수', '#웹툰화', '#RIDI_ONLY'] }
    },
    ev: function (name, p) {
      p = Object.assign({ is_demo: true }, p || {});
      gtag('event', name, DBG0 ? Object.assign({ debug_mode: true }, p) : p);
      if (DEBUG) logEv(name, p);
    },
    utm: UTM,
    toast: toast
  };

  function logEv(name, p) {
    var el = document.getElementById('evlog');
    if (!el) { el = document.createElement('div'); el.id = 'evlog'; el.className = 'on'; el.innerHTML = '<b>GA4 이벤트 기록 (debug)</b>'; document.body.appendChild(el); }
    var line = document.createElement('div');
    var q = Object.keys(p).filter(function (k) { return k !== 'is_demo'; }).map(function (k) { return k + '=' + p[k]; }).join(' · ');
    line.innerHTML = '▸ <b>' + name + '</b> ' + q; el.appendChild(line); el.scrollTop = 1e6;
    try { var arr = JSON.parse(sessionStorage.getItem('ridi_demo_log') || '[]'); arr.push([name, q]); sessionStorage.setItem('ridi_demo_log', JSON.stringify(arr.slice(-30))); } catch (e) {}
  }
  function toast(t) {
    var el = document.querySelector('.toast'); if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('on'); }, 1800);
  }

  // ---- 머리 · 꼬리 (목업 그대로 · 리디 실제 링크 없음)
  var HEAD = '<div class="demo-bar"><b>교육용 데모</b> · AI그로스마케팅 캡스톤 · 실제 리디 서비스가 아니며 로그인·결제가 되지 않습니다</div>' +
    '<header class="hd"><div class="wrap"><div class="r1"><a class="logo" href="index.html" aria-label="RIDI GAMES 게임 메인"><img src="assets/brand/ridigames_logo_h_blue.svg" alt="RIDI GAMES"></a><div class="sr"><div class="search"><svg viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></div><span class="lg"><a href="reserve.html">팝업 사전예약</a> · <a href="mypage.html">마이페이지</a><span class="lgn"> · <a href="#" data-inert>로그인 / 회원가입</a></span></span></div></div>' +
    '<div class="r2"><nav class="nav"><a href="#" data-inert>만화</a><a href="#" data-inert>웹툰</a><a href="#" data-inert>웹소설</a><a href="#" data-inert>도서</a><a href="#" data-inert>리디샵</a><a href="#" data-inert>셀렉트</a><a class="on" href="index.html">게임</a></nav>' +
    '<div class="rt"><span>☰ 전체 카테고리</span><span>ⓒ 캐시충전</span></div></div></div></header>';
  var FOOT = '<footer class="ft"><div class="wrap"><a class="ft-logo" href="index.html"><img src="assets/brand/ridigames_logo_h_blue.svg" alt="RIDI GAMES"></a><div class="cols"><div><p>🎧 고객센터</p><p>📢 공지사항</p></div><div><b>서비스</b><p>제휴카드</p><p>뷰어 다운로드</p><p>CP사이트</p><p>리디바탕</p></div><div><b>기타 문의</b><p>원고 투고</p><p>사업 제휴 문의</p></div><div><b>회사</b><p>회사 소개</p><p>인재채용</p></div>' +
    '<div class="sns"><i>f</i><i>◎</i><i>𝕏</i><i>▶</i><i>♪</i></div></div><div class="biz"><p>리디(주) 사업자 정보 ⌄</p><div class="lk"><span>이용약관</span><span><b style="color:#555">개인정보 처리방침</b></span><span>청소년보호정책</span><span>사업자정보확인</span></div><p style="margin-top:12px">© RIDI Corp. · 이 페이지는 캡스톤 교육용 데모입니다 · 팀 RIDIVERSE — 읽던 작품의 세계 속으로</p></div></div></footer>';

  // ---- 결제 시트 (패스 시안 ② 그대로)
  var SHEET = '<div class="sheet-bg" id="sheetBg"><div class="sheet" id="sheet"><button class="x" data-close>×</button>' +
    '<div class="main"><div class="sh-top"><img src="assets/brand/ridigames_logo_h_blue.svg" alt="RIDI GAMES"><span class="tag">예시 화면 · 교육용 · 가격 가정</span></div><h2>게임패스 구독</h2><p class="h2s">리디 계정 그대로 · 리디 게임즈 모든 게임</p>' +
    '<button class="pl on" data-plan="basic" data-v="9900"><span class="r"></span><p class="t">기본 패스</p><p class="p">월 9,900원</p><ul><li>모든 게임 · 매월 새 2화</li><li>주간 도전 · 수집 카드 · 연속 구독 보상</li></ul></button>' +
    '<button class="pl" data-plan="premium" data-v="14900"><span class="r"></span><p class="t">프리미엄 패스</p><p class="p">월 14,900원</p><ul><li>기본 + 외전 루트 · 한정 꾸미기 · AI 대화 기억</li></ul></button>' +
    '<div class="gift"><b>4,900P</b><span>첫 구독 1회 지급 · 게임화 원작 구매에 사용<br>다음 결제일까지 사용 가능</span></div>' +
    '<div class="pay"><p class="lb">결제 수단</p><div class="pm">💳 카드 정기결제 (리디 웹)<i>선택됨</i></div><p class="nt">리디캐시·포인트로는 패스를 결제할 수 없어요</p></div>' +
    '<div class="og">📖 원작 웹소설은 패스에 포함되지 않아요 · 원작은 지금처럼 따로 소장</div>' +
    '<p class="law">매달 같은 날 등록한 카드로 자동 결제됩니다. 마이페이지에서 언제든 해지할 수 있어요.</p>' +
    '<button class="go" data-buy>월 9,900원 구독하기</button></div>' +
    '<div class="cf cf1"><h3>교육용 데모예요</h3><p>실제 결제는 되지 않습니다.<br>발표 시연을 위해 "구독 완료"로만 기록할까요?</p><button class="go" data-ok>결제 완료로 기록 (데모)</button><button class="go gray" data-back>돌아가기</button></div>' +
    '<div class="cf cf2"><img src="assets/brand/ridigames_mark_blue.svg" alt="" style="width:44px;height:44px;margin-bottom:6px"><h3>게임패스 구독 완료 (데모)</h3><p>리디 게임즈의 모든 게임이 열렸어요.<br>첫 구독 4,900P는 게임화 원작에 쓸 수 있어요(데모라 실제 지급 없음).</p><button class="go" data-close>계속 플레이</button><a class="go gray" style="display:flex;align-items:center;justify-content:center" data-origin>원작 이어 읽기</a></div>' +
    '</div></div>';

  var cur = { game: null, placement: null, plan: 'basic', value: 9900 };
  window.RD.openPass = function (game, placement) {
    cur.game = game || 'all'; cur.placement = placement;
    var sh = document.getElementById('sheet'); sh.className = 'sheet';
    document.getElementById('sheetBg').classList.add('on');
    RD.ev('begin_checkout', { game_id: cur.game, item_type: 'game_pass', value: cur.value, currency: 'KRW', placement: placement });
  };
  window.RD.goOrigin = function (game, from) {
    var g = RD.GAMES[game] || RD.GAMES.escape;
    RD.ev('origin_click', { game_id: g.id, origin_id: g.origin, placement: from });
    setTimeout(function () { location.href = 'origin.html?g=' + g.id; }, 150);
  };

  // 탭 아이콘(모든 페이지)
  var fi = document.createElement('link'); fi.rel = 'icon'; fi.type = 'image/svg+xml'; fi.href = 'assets/brand/favicon.svg'; document.head.appendChild(fi);
  document.addEventListener('DOMContentLoaded', function () {
    var h = document.getElementById('hd'); if (h) h.outerHTML = HEAD;
    var f = document.getElementById('ft'); if (f) f.outerHTML = FOOT;
    /* 67차: 리디 쪽 화면(원작 웹소설 등, <body data-brand="ridi" data-nav="웹소설">)은 머리·꼬리를 RIDI로, 탭은 해당 메뉴로 */
    if (document.body.getAttribute('data-brand') === 'ridi') {
      var WM = '<span class="ridi-wm">RIDI</span>';
      document.querySelectorAll('.hd .logo, .ft .ft-logo').forEach(function (a) {
        a.innerHTML = WM; a.setAttribute('aria-label', 'RIDI 홈'); a.setAttribute('href', '#'); a.setAttribute('data-inert', '');
      });
      var nv = document.body.getAttribute('data-nav');
      document.querySelectorAll('.hd .nav a').forEach(function (a) { a.classList.toggle('on', a.textContent === nv); });
    }
    if (!document.body.hasAttribute('data-nosheet')) document.body.insertAdjacentHTML('beforeend', SHEET);
    // 사전예약·마이페이지 시안: 버튼의 data-evt="이름(k=v)"를 그대로 GA4 이벤트로 보냄 (reserve_complete → reserve, 대응표 A)
    var page = document.body.getAttribute('data-page');
    if (page) document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-evt]'); if (!t || t.disabled) return;
      var m = t.getAttribute('data-evt').match(/^([a-z_]+)(?:\((.*)\))?$/); if (!m) return;
      var name = m[1] === 'reserve_complete' ? 'reserve' : m[1], p = { page: page };
      (m[2] || '').split(',').forEach(function (kv) { kv = kv.trim(); if (!kv) return; var i = kv.indexOf('='); if (i > 0) p[kv.slice(0, i)] = kv.slice(i + 1); else p.detail = kv; });
      RD.ev(name, p);
    }, true);
    if (DEBUG) { try { JSON.parse(sessionStorage.getItem('ridi_demo_log') || '[]').forEach(function (r) { var el = document.getElementById('evlog'); if (!el) { el = document.createElement('div'); el.id = 'evlog'; el.className = 'on'; el.innerHTML = '<b>GA4 이벤트 기록 (debug)</b>'; document.body.appendChild(el); } var d = document.createElement('div'); d.style.opacity = '.55'; d.innerHTML = '▸ <b>' + r[0] + '</b> ' + r[1]; el.appendChild(d); }); } catch (e) {} }
    document.body.addEventListener('click', function (e) {
      var t = e.target.closest('[data-inert]'); if (t) { e.preventDefault(); toast('데모에서는 게임 메뉴만 열려 있어요'); return; }
      var sh = document.getElementById('sheet');
      if (e.target.closest('[data-close]') || e.target.id === 'sheetBg') { document.getElementById('sheetBg').classList.remove('on'); return; }
      var pl = e.target.closest('.pl');
      if (pl) { sh.querySelectorAll('.pl').forEach(function (x) { x.classList.remove('on'); }); pl.classList.add('on'); cur.plan = pl.dataset.plan; cur.value = +pl.dataset.v; sh.querySelector('[data-buy]').textContent = '월 ' + cur.value.toLocaleString() + '원 구독하기'; return; }
      if (e.target.closest('[data-buy]')) { sh.className = 'sheet st-confirm'; return; }
      if (e.target.closest('[data-back]')) { sh.className = 'sheet'; return; }
      if (e.target.closest('[data-ok]')) {
        RD.ev('purchase', { game_id: cur.game, item_type: 'game_pass', plan: cur.plan, value: cur.value, currency: 'KRW', placement: cur.placement, pay_channel: 'web', transaction_id: 'demo-' + Date.now().toString(36) });
        sh.className = 'sheet st-done'; return;
      }
      /* 67차 버그 수정: 결제 완료 창 안의 '원작 이어 읽기'에만 반응(예전엔 상세 페이지의 원작 버튼까지 잡아 늘 방탈출로 보냄) */
      if (e.target.closest('#sheet [data-origin]')) { e.preventDefault(); RD.goOrigin(RD.GAMES[cur.game] ? cur.game : 'escape', 'pass_done'); }
    });
  });
})();
