// @ts-nocheck
document.addEventListener('DOMContentLoaded', function () {

  // ===== 상수 =====
  var PARTS = ['Frontend', 'Backend', 'Design'];
  var SKILLS_MAP = {
    Frontend: ['React', 'Vue', 'TypeScript', 'Next.js', 'HTML/CSS', 'JavaScript', 'Tailwind'],
    Backend:  ['Spring', 'Node.js', 'Django', 'FastAPI', 'MySQL', 'PostgreSQL', 'Redis'],
    Design:   ['Figma', 'Photoshop', 'Illustrator', 'Framer', 'Design System', 'Storybook'],
  };
  var LASTWORDS = [
    '열심히 하겠습니다!', '잘 부탁드립니다!', '꾸준히 성장하겠습니다!',
    '함께 달려봐요!', '배움을 즐기겠습니다!', '최선을 다하겠습니다!',
  ];
  var API_URL = 'https://randomuser.me/api/?results=NUMBER&nat=us,gb,ca,au,nz';

  // ===== 상태 =====
  var members = [];
  var nextId  = 1;
  var currentPart   = '전체';
  var currentSort   = 'latest';
  var currentSearch = '';
  var isLoading     = false;
  var lastAction    = null;

  // ===== 초기화: HTML 카드에서 데이터 읽기 =====
  function initFromHTML() {
    var saved = loadFromStorage();
    if (saved && saved.length > 0) {
      members = saved;
      nextId  = Math.max.apply(null, members.map(function (m) { return m.id; })) + 1;
    } else {
      // localStorage 없으면 HTML data 속성에서 읽기
      var cards = document.querySelectorAll('#cardGrid .card[data-id]');
      cards.forEach(function (card) {
        var skillsRaw = card.getAttribute('data-skills') || '';
        members.push({
          id:         parseInt(card.getAttribute('data-id'), 10),
          name:       card.getAttribute('data-name')        || '',
          part:       card.getAttribute('data-part')        || 'Frontend',
          shortIntro: card.getAttribute('data-short-intro') || '',
          skills:     skillsRaw ? skillsRaw.split(',') : [],
          intro:      card.getAttribute('data-intro')       || '',
          email:      card.getAttribute('data-email')       || '',
          phone:      card.getAttribute('data-phone')       || '',
          website:    card.getAttribute('data-website')     || '',
          lastword:   card.getAttribute('data-lastword')    || '',
          isMe:       card.getAttribute('data-is-me') === 'true',
          seed:       card.getAttribute('data-seed')        || String(Math.random()),
        });
      });
      nextId = members.length > 0
        ? Math.max.apply(null, members.map(function (m) { return m.id; })) + 1
        : 1;
      saveToStorage();
    }
    render();
  }

  // ===== localStorage =====
  function loadFromStorage() {
    try {
      var saved = localStorage.getItem('liontrack_members');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem('liontrack_members', JSON.stringify(members));
    } catch (e) {
      console.warn('저장 실패:', e);
    }
  }

  // ===== API =====
  function fetchRandomUsers(count) {
    var url = API_URL.replace('NUMBER', String(count));
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }).then(function (data) {
      return data.results;
    });
  }

  function convertUserToMember(user) {
    var part   = PARTS[Math.floor(Math.random() * PARTS.length)];
    var pool   = SKILLS_MAP[part].slice().sort(function () { return 0.5 - Math.random(); });
    var skills = pool.slice(0, 3);
    var seed   = Math.random().toString(36).slice(2, 8);
    var first  = (user.name && user.name.first) || '사자';
    var last   = (user.name && user.name.last)  || '아기';
    var city   = (user.location && user.location.city) || '';
    var login  = (user.login && user.login.username)   || 'lion';
    return {
      id:         nextId++,
      name:       last + first,
      part:       part,
      shortIntro: city ? (city + ' 출신 ' + part + ' 개발자') : (part + ' 공부 중입니다'),
      skills:     skills,
      intro:      '안녕하세요, ' + (last + first) + '입니다. ' + part + ' 분야에서 열심히 배우고 있습니다.',
      email:      user.email || '',
      phone:      user.phone || '',
      website:    'github.com/' + login,
      lastword:   LASTWORDS[Math.floor(Math.random() * LASTWORDS.length)],
      isMe:       false,
      seed:       seed,
    };
  }

  // ===== 비동기 상태 UI =====
  function setFetchButtons(disabled) {
    ['btn-add1', 'btn-add5', 'btn-refresh'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.disabled = disabled;
    });
  }

  function setStatus(state, msg) {
    var dot   = document.getElementById('statusDot');
    var text  = document.getElementById('statusText');
    var retry = document.getElementById('retryBtn');
    dot.className = 'status-dot ' + state;
    text.textContent = msg;
    retry.style.display = state === 'error' ? 'inline-flex' : 'none';
  }

  function setLoadingState() {
    isLoading = true;
    setFetchButtons(true);
    setStatus('loading', '불러오는 중...');
  }

  function setReadyState() {
    isLoading = false;
    setFetchButtons(false);
    setStatus('ready', '준비 완료');
  }

  function setSuccessState() {
    setFetchButtons(false);
    setStatus('success', '완료!');
    setTimeout(function () {
      isLoading = false;
      setStatus('ready', '준비 완료');
    }, 1500);
  }

  function setErrorState(msg) {
    isLoading = false;
    setFetchButtons(false);
    setStatus('error', '불러오기 실패: ' + (msg || '네트워크 오류'));
  }

  // ===== 외부 데이터 불러오기 =====
  window.fetchAndAdd = function (count) {
    if (isLoading) return;
    lastAction = function () { window.fetchAndAdd(count); };
    setLoadingState();
    fetchRandomUsers(count).then(function (users) {
      var newOnes = users.map(convertUserToMember);
      members = members.concat(newOnes);
      nextId = Math.max.apply(null, members.map(function (m) { return m.id; })) + 1;
      saveToStorage();
      render();
      setSuccessState();
    }).catch(function (e) {
      setErrorState(e.message);
    });
  };

  window.fetchAndRefresh = function () {
    if (isLoading) return;
    lastAction = window.fetchAndRefresh;
    setLoadingState();

    // 현재 인원 수 기억 (isMe 제외한 수)
    var myMember     = members.find(function (m) { return m.isMe; });
    var currentCount = members.filter(function (m) { return !m.isMe; }).length;

    fetchRandomUsers(currentCount).then(function (users) {
      // nextId를 큰 값으로 리셋해서 기존 id와 충돌 방지
      nextId = 10000;
      members = myMember ? [Object.assign({}, myMember)] : [];
      users.forEach(function (u) { members.push(convertUserToMember(u)); });
      nextId = Math.max.apply(null, members.map(function (m) { return m.id; })) + 1;
      saveToStorage();
      render();
      setSuccessState();
    }).catch(function (e) {
      setErrorState(e.message);
    });
  };

  window.retryLastAction = function () {
    if (lastAction) lastAction();
  };

  // ===== 폼 랜덤 값 채우기 =====
  window.fillFormRandom = function () {
    var btn = document.getElementById('randomFillBtn');
    btn.disabled    = true;
    btn.textContent = '⏳ 불러오는 중...';

    fetchRandomUsers(1).then(function (users) {
      // 폼 채우기는 실제 추가가 아니므로 nextId 소비 방지
      var savedNextId = nextId;
      var m = convertUserToMember(users[0]);
      nextId = savedNextId;

      document.getElementById('f-name').value       = m.name;
      document.getElementById('f-part').value       = m.part;
      document.getElementById('f-shortIntro').value = m.shortIntro;
      document.getElementById('f-skills').value     = m.skills.join(', ');
      document.getElementById('f-intro').value      = m.intro;
      document.getElementById('f-email').value      = m.email;
      document.getElementById('f-phone').value      = m.phone;
      document.getElementById('f-website').value    = m.website;
      document.getElementById('f-lastword').value   = m.lastword;
    }).catch(function () {
      alert('랜덤 값 불러오기에 실패했습니다. 다시 시도해주세요.');
    }).finally(function () {
      btn.disabled    = false;
      btn.textContent = '🎲 랜덤 값 채우기';
    });
  };

  // ===== 보기 옵션 =====
  window.setPartFilter = function (btn) {
    document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    currentPart = btn.getAttribute('data-part');
    applyViewOptions();
  };

  window.applyViewOptions = function () {
    currentSort   = document.getElementById('sortSelect').value;
    currentSearch = document.getElementById('searchInput').value.trim().toLowerCase();
    render();
  };

  function getFilteredMembers() {
    var list = members.slice();
    if (currentPart !== '전체') {
      list = list.filter(function (m) { return m.part === currentPart; });
    }
    if (currentSearch) {
      list = list.filter(function (m) {
        return m.name.toLowerCase().indexOf(currentSearch) !== -1;
      });
    }
    if (currentSort === 'name') {
      list.sort(function (a, b) { return a.name.localeCompare(b.name, 'ko'); });
    } else {
      list.sort(function (a, b) { return b.id - a.id; });
    }
    return list;
  }

  // ===== 렌더 =====
  function render() {
    var filtered = getFilteredMembers();
    renderCards(filtered);
    renderDetails(filtered);
    document.getElementById('memberCount').textContent = String(members.length);
  }

  function renderCards(list) {
    var grid       = document.getElementById('cardGrid');
    var emptyState = document.getElementById('cardEmpty');
    if (list.length === 0) {
      grid.innerHTML = '';
      emptyState.style.display = 'flex';
      return;
    }
    emptyState.style.display = 'none';
    grid.innerHTML = list.map(function (m) {
      return '<div class="card ' + (m.isMe ? 'my-card' : '') + '">'
        + '<div class="img-box">'
        +   '<img src="https://picsum.photos/seed/' + m.seed + '/300/200" alt="' + m.name + ' 프로필" loading="lazy" />'
        +   '<span class="badge">' + (m.skills[0] || '') + '</span>'
        + '</div>'
        + '<div class="card-info">'
        +   '<p class="name">' + m.name + '</p>'
        +   '<span class="part-tag">' + m.part + '</span>'
        +   '<p class="short-intro">' + m.shortIntro + '</p>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  function renderDetails(list) {
    var detailList = document.getElementById('detailList');
    var emptyState = document.getElementById('detailEmpty');
    if (list.length === 0) {
      detailList.innerHTML = '';
      emptyState.style.display = 'flex';
      return;
    }
    emptyState.style.display = 'none';
    detailList.innerHTML = list.map(function (m) {
      var skillItems = m.skills.map(function (s) { return '<li>' + s + '</li>'; }).join('');
      var contactItems =
          (m.email   ? '<li>이메일: '    + m.email   + '</li>' : '')
        + (m.phone   ? '<li>전화: '      + m.phone   + '</li>' : '')
        + (m.website ? '<li>웹사이트: '  + m.website + '</li>' : '');
      return '<div class="detail-card">'
        + '<div class="dc-header">'
        +   '<span class="dc-name">'  + m.name + '</span>'
        +   '<span class="dc-part">'  + m.part + '</span>'
        +   '<span class="dc-club">LION TRACK</span>'
        + '</div>'
        + '<div class="dc-body">'
        +   '<div class="dc-section full-width">'
        +     '<span class="dc-label">자기소개</span>'
        +     '<p class="dc-content">' + (m.intro || '—') + '</p>'
        +   '</div>'
        +   '<div class="dc-section">'
        +     '<span class="dc-label">관심 기술</span>'
        +     '<div class="dc-content"><ul>' + skillItems + '</ul></div>'
        +   '</div>'
        +   '<div class="dc-section">'
        +     '<span class="dc-label">연락처</span>'
        +     '<div class="dc-content"><ul>' + contactItems + '</ul></div>'
        +   '</div>'
        +   '<div class="dc-section full-width">'
        +     '<span class="dc-label">한 마디</span>'
        +     '<p class="dc-lastword">"' + (m.lastword || '—') + '"</p>'
        +   '</div>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  // ===== 폼 토글 =====
  window.toggleForm = function () {
    var sec    = document.getElementById('formSection');
    var btn    = document.getElementById('toggleFormBtn');
    var isOpen = sec.classList.toggle('open');
    btn.textContent = isOpen ? '✕ 닫기' : '+ 아기사자 추가';
    if (!isOpen) clearForm();
  };

  function clearForm() {
    ['f-name','f-shortIntro','f-skills','f-intro','f-email','f-phone','f-website','f-lastword']
      .forEach(function (id) { document.getElementById(id).value = ''; });
    document.getElementById('f-part').value = 'Frontend';
  }

  // ===== 추가 =====
  window.addMember = function () {
    var name       = document.getElementById('f-name').value.trim();
    var part       = document.getElementById('f-part').value;
    var shortIntro = document.getElementById('f-shortIntro').value.trim();
    var skillsRaw  = document.getElementById('f-skills').value.trim();

    if (!name || !shortIntro || !skillsRaw) {
      alert('이름, 한 줄 소개, 관심 기술은 필수 입력 항목입니다.');
      return;
    }

    var skills = skillsRaw.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var seed   = Math.random().toString(36).slice(2, 8);

    members.push({
      id:         nextId++,
      name:       name,
      part:       part,
      shortIntro: shortIntro,
      skills:     skills,
      intro:      document.getElementById('f-intro').value.trim(),
      email:      document.getElementById('f-email').value.trim(),
      phone:      document.getElementById('f-phone').value.trim(),
      website:    document.getElementById('f-website').value.trim(),
      lastword:   document.getElementById('f-lastword').value.trim(),
      isMe:       false,
      seed:       seed,
    });

    saveToStorage();
    window.toggleForm();
    render();
  };

  // ===== 삭제 =====
  window.deleteLastMember = function () {
    if (members.length === 0) { alert('삭제할 멤버가 없습니다.'); return; }
    var last = members[members.length - 1];
    if (confirm('"' + last.name + '"을(를) 삭제하시겠습니까?')) {
      members.pop();
      saveToStorage();
      render();
    }
  };

  // ===== 초기 실행 =====
  initFromHTML();

}); // DOMContentLoaded