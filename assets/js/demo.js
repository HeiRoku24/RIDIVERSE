/* 리디 게임 데모(교육용) — 공통: 머리·꼬리·결제 시트·GA4 이벤트
   이벤트 이름·매개변수 = demo54/버튼_이벤트_대응표_초안.md (B 게임 메뉴 경로). 모든 이벤트에 is_demo=true.
   ★ 표시는 데모 보조 이벤트(GA4 데모에만): game_detail_view · begin_checkout */
(function () {
  var GA_ID = 'G-EN43XQPR2H';
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID, { is_demo: true });
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
        tags: ['AI채팅', '로맨스판타지'], cover: 'cover_chat_v.jpg', play: 'play_chat.jpg', thumb: 'thumb_chat.jpg',
        desc: ['남주 카시안 벨모어에게 한 마디를 건네면 답장이 옵니다.', '선택지 3개 중에 고르거나 직접 입력하세요. 대화마다 호감도가 쌓입니다.'],
        stages: ['1 stage', '2 stage', '3 stage', '4 stage'], who: '카시안 벨모어', line: ['"조건은 하나뿐입니다.', '그건… 다음 밤에 말씀드리지요."'],
        real: 'https://belmore-accomplice.vercel.app', kw: ['#AI채팅', '#로맨스판타지', '#웹소설', '#RIDI_ONLY'], note: '설명·회차 이름은 목업에 없어 데모용 예시' },
      shoot: { id: 'shoot', origin: 'o2', type: '슈팅', title: '지각 사유 : 게이트 폭주', title2: ['지각 사유 :', '게이트 폭주'],
        tags: ['슈팅', '헌터물', '액션'], cover: 'cover_shoot_v.jpg', play: 'play_shoot.jpg', thumb: 'thumb_shoot.jpg',
        desc: ['60초 동안 몰려오는 몬스터를 처치하고 대사 컷을 확인하세요.', '콤보를 이어 가고 능력을 강화해 그날의 랭킹에 도전합니다.'],
        stages: ['1 stage', '2 stage', '3 stage', '4 stage'], who: '주인공', line: ['"지각 사유요? 게이트가 터졌거든요.', '다음엔… 더 큰 놈이 옵니다."'],
        real: 'https://late-gate.vercel.app', kw: ['#슈팅', '#헌터물', '#액션', '#웹소설', '#RIDI_ONLY'], note: '설명·회차 이름은 목업에 없어 데모용 예시' },
      escape: { id: 'escape', origin: 'o3', type: '방탈출', title: '저를 가두셨죠? 덕분에 전설의 환수를 얻었습니다', title2: ['저를 가두셨죠?', '덕분에 전설의 환수를 얻었습니다'],
        tags: ['방탈출', '판타지', '학원물'], cover: 'cover_escape_v.jpg', play: 'play_escape.jpg', thumb: 'thumb_escape.jpg',
        desc: ['재능은 있지만 신분이 평민인 마법사 로아. 아카데미 장학생이 되어 입학하는데...', '시기와 질투를 받아 괴롭힘을 당하던 어느날 환수 계약의식날에 창고에 갇히다.', '하지만 그곳에서 인생을 바꿀만한 사건이 일어난다.'],
        stages: ['1 stage - 용을 만나다', '2 stage - 갑자기 생긴 남자친구', '3 stage - 정식으로 시작하다', '4 stage - 드디어 맞붙게된 두사람'],
        who: '녹스', line: ['"계약은 끝났다, 주인.', '그런데… 이 창고 밖에서도 날 부를 거냐?"'],
        real: 'https://nox-storeroom.vercel.app', note: '' }
    },
    ev: function (name, p) {
      p = Object.assign({ is_demo: true }, p || {});
      gtag('event', name, p);
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
    '<header class="hd"><div class="wrap"><div class="r1"><a class="logo" href="index.html">RIDI GAME</a><div class="sr"><div class="search"><svg viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></div><a class="lg" href="#" data-inert>로그인 / 회원가입</a></div></div>' +
    '<div class="r2"><nav class="nav"><a href="#" data-inert>만화</a><a href="#" data-inert>웹툰</a><a href="#" data-inert>웹소설</a><a href="#" data-inert>도서</a><a href="#" data-inert>리디샵</a><a href="#" data-inert>셀렉트</a><a class="on" href="index.html">게임</a></nav>' +
    '<div class="rt"><span>☰ 전체 카테고리</span><span>ⓒ 캐시충전</span></div></div></div></header>';
  var FOOT = '<footer class="ft"><div class="wrap"><div class="cols"><div><p>🎧 고객센터</p><p>📢 공지사항</p></div><div><b>서비스</b><p>제휴카드</p><p>뷰어 다운로드</p><p>CP사이트</p><p>리디바탕</p></div><div><b>기타 문의</b><p>원고 투고</p><p>사업 제휴 문의</p></div><div><b>회사</b><p>회사 소개</p><p>인재채용</p></div>' +
    '<div class="sns"><i>f</i><i>◎</i><i>𝕏</i><i>▶</i><i>♪</i></div></div><div class="biz"><p>리디(주) 사업자 정보 ⌄</p><div class="lk"><span>이용약관</span><span><b style="color:#555">개인정보 처리방침</b></span><span>청소년보호정책</span><span>사업자정보확인</span></div><p style="margin-top:12px">© RIDI Corp. · 이 페이지는 캡스톤 교육용 데모입니다</p></div></div></footer>';

  // ---- 결제 시트 (패스 시안 ② 그대로)
  var SHEET = '<div class="sheet-bg" id="sheetBg"><div class="sheet" id="sheet"><button class="x" data-close>×</button>' +
    '<div class="main"><span class="tag">예시 화면 · 교육용 · 가격 가정</span><h2>게임패스 구독</h2><p class="h2s">리디 계정 그대로 · 세 게임 공통</p>' +
    '<button class="pl on" data-plan="basic" data-v="9900"><span class="r"></span><p class="t">기본 패스</p><p class="p">월 9,900원</p><ul><li>모든 게임 · 매월 새 2화</li><li>주간 도전 · 수집 카드 · 연속 구독 보상</li></ul></button>' +
    '<button class="pl" data-plan="premium" data-v="14900"><span class="r"></span><p class="t">프리미엄 패스</p><p class="p">월 14,900원</p><ul><li>기본 + 외전 루트 · 한정 꾸미기 · AI 대화 기억</li></ul></button>' +
    '<div class="gift"><b>4,900P</b><span>첫 구독 1회 지급 · 게임화 원작 구매에 사용<br>다음 결제일까지 사용 가능</span></div>' +
    '<div class="pay"><p class="lb">결제 수단</p><div class="pm">💳 카드 정기결제 (리디 웹)<i>선택됨</i></div><p class="nt">리디캐시·포인트로는 패스를 결제할 수 없어요</p></div>' +
    '<div class="og">📖 원작 웹소설은 패스에 포함되지 않아요 · 원작은 지금처럼 따로 소장</div>' +
    '<p class="law">매달 같은 날 등록한 카드로 자동 결제됩니다. 마이페이지에서 언제든 해지할 수 있어요.</p>' +
    '<button class="go" data-buy>월 9,900원 구독하기</button></div>' +
    '<div class="cf cf1"><h3>교육용 데모예요</h3><p>실제 결제는 되지 않습니다.<br>발표 시연을 위해 "구독 완료"로만 기록할까요?</p><button class="go" data-ok>결제 완료로 기록 (데모)</button><button class="go gray" data-back>돌아가기</button></div>' +
    '<div class="cf cf2"><h3>🎉 게임패스 구독 완료 (데모)</h3><p>세 게임의 모든 회차가 열렸어요.<br>첫 구독 4,900P는 게임화 원작에 쓸 수 있어요(데모라 실제 지급 없음).</p><button class="go" data-close>계속 플레이</button><a class="go gray" style="display:flex;align-items:center;justify-content:center" data-origin>원작 이어 읽기</a></div>' +
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

  document.addEventListener('DOMContentLoaded', function () {
    var h = document.getElementById('hd'); if (h) h.outerHTML = HEAD;
    var f = document.getElementById('ft'); if (f) f.outerHTML = FOOT;
    document.body.insertAdjacentHTML('beforeend', SHEET);
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
      if (e.target.closest('[data-origin]')) { e.preventDefault(); RD.goOrigin(cur.game === 'all' ? 'escape' : cur.game, 'pass_done'); }
    });
  });
})();
