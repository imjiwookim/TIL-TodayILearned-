// ===== 초기 데이터 =====
const IMAGE_SEEDS = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj'];

let members = [
  {
    id: 1,
    name: '김아기사자',
    part: 'Frontend',
    shortIntro: '프론트엔드 개발에 관심이 많습니다',
    skills: ['React', 'JavaScript', 'HTML/CSS'],
    intro: '안녕하세요 김아기사자입니다. 프론트엔드에 관심이 생겨서 공부를 시작했습니다.',
    email: 'kim@example.com',
    phone: '010-1111-2222',
    website: 'github.com/kim',
    lastword: '열심히 하겠습니다!',
    isMe: true,
    seed: 'aa'
  },
  {
    id: 2,
    name: '박아기사자',
    part: 'Backend',
    shortIntro: '서버 개발을 공부하고 있습니다',
    skills: ['Spring', 'Java', 'MySQL'],
    intro: '안녕하세요 박아기사자입니다. 백엔드 개발에 관심이 많습니다.',
    email: 'park@example.com',
    phone: '010-2222-3333',
    website: 'github.com/park',
    lastword: '잘 부탁드립니다!',
    isMe: false,
    seed: 'bb'
  },
  {
    id: 3,
    name: '이아기사자',
    part: 'Design',
    shortIntro: 'UI 디자인을 좋아합니다',
    skills: ['Figma', 'Photoshop', 'Illustrator'],
    intro: '안녕하세요 이아기사자입니다. 디자인을 배우고 있습니다.',
    email: 'lee@example.com',
    phone: '010-3333-4444',
    website: 'github.com/lee',
    lastword: '예쁜 디자인 만들겠습니다!',
    isMe: false,
    seed: 'cc'
  },
  {
    id: 4,
    name: '최아기사자',
    part: 'Frontend',
    shortIntro: '타입스크립트를 공부중입니다',
    skills: ['TypeScript', 'React', 'Next.js'],
    intro: '안녕하세요 최아기사자입니다. 타입스크립트를 열심히 공부하고 있습니다.',
    email: 'choi@example.com',
    phone: '010-4444-5555',
    website: 'github.com/choi',
    lastword: '꾸준히 성장하겠습니다!',
    isMe: false,
    seed: 'dd'
  },
  {
    id: 5,
    name: '정아기사자',
    part: 'Backend',
    shortIntro: '백엔드 개발자를 꿈꿉니다',
    skills: ['Node.js', 'Express', 'MongoDB'],
    intro: '안녕하세요 정아기사자입니다. Node.js로 서버를 만드는 걸 배우고 있습니다.',
    email: 'jung@example.com',
    phone: '010-5555-6666',
    website: 'github.com/jung',
    lastword: '백엔드 마스터가 되겠습니다!',
    isMe: false,
    seed: 'ee'
  },
  {
    id: 6,
    name: '오아기사자',
    part: 'Design',
    shortIntro: '예쁜 디자인을 만들고 싶습니다',
    skills: ['Figma', 'Design System', 'Storybook'],
    intro: '안녕하세요 오아기사자입니다. 디자인 시스템에 관심이 생겼습니다.',
    email: 'oh@example.com',
    phone: '010-6666-7777',
    website: 'github.com/oh',
    lastword: '열심히 배우겠습니다!',
    isMe: false,
    seed: 'ff'
  }
];

let nextId = 7;

// ===== 렌더 =====
function render() {
  renderCards();
  renderDetails();
  document.getElementById('memberCount').textContent = members.length;
}

function renderCards() {
  const grid = document.getElementById('cardGrid');
  grid.innerHTML = members.map(m => `
    <div class="card ${m.isMe ? 'my-card' : ''}">
      <div class="img-box">
        <img src="https://picsum.photos/seed/${m.seed}/300/200" alt="${m.name} 프로필" />
        <span class="badge">${m.skills[0] || ''}</span>
      </div>
      <div class="card-info">
        <p class="name">${m.name}</p>
        <span class="part-tag">${m.part}</span>
        <p class="short-intro">${m.shortIntro}</p>
      </div>
    </div>
  `).join('');
}

function renderDetails() {
  const list = document.getElementById('detailList');
  list.innerHTML = members.map(m => `
    <div class="detail-card">
      <div class="dc-header">
        <span class="dc-name">${m.name}</span>
        <span class="dc-part">${m.part}</span>
        <span class="dc-club">LION TRACK</span>
      </div>
      <div class="dc-body">
        <div class="dc-section full-width">
          <span class="dc-label">자기소개</span>
          <p class="dc-content">${m.intro || '—'}</p>
        </div>
        <div class="dc-section">
          <span class="dc-label">관심 기술</span>
          <div class="dc-content">
            <ul>
              ${m.skills.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="dc-section">
          <span class="dc-label">연락처</span>
          <div class="dc-content">
            <ul>
              ${m.email    ? `<li>이메일: ${m.email}</li>` : ''}
              ${m.phone    ? `<li>전화: ${m.phone}</li>` : ''}
              ${m.website  ? `<li>웹사이트: ${m.website}</li>` : ''}
            </ul>
          </div>
        </div>
        <div class="dc-section full-width">
          <span class="dc-label">한 마디</span>
          <p class="dc-lastword">"${m.lastword || '—'}"</p>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== 폼 토글 =====
function toggleForm() {
  const sec = document.getElementById('formSection');
  const btn = document.getElementById('toggleFormBtn');
  const isOpen = sec.classList.toggle('open');
  btn.textContent = isOpen ? '✕ 닫기' : '+ 아기사자 추가';
  if (!isOpen) clearForm();
}

function clearForm() {
  ['f-name','f-shortIntro','f-skills','f-intro','f-email','f-phone','f-website','f-lastword'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f-part').value = 'Frontend';
}

// ===== 추가 =====
function addMember() {
  const name = document.getElementById('f-name').value.trim();
  const part = document.getElementById('f-part').value;
  const shortIntro = document.getElementById('f-shortIntro').value.trim();
  const skillsRaw = document.getElementById('f-skills').value.trim();

  if (!name || !shortIntro || !skillsRaw) {
    alert('이름, 한 줄 소개, 관심 기술은 필수 입력 항목입니다.');
    return;
  }

  const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);
  const seed = IMAGE_SEEDS[nextId % IMAGE_SEEDS.length] + nextId;

  members.push({
    id: nextId++,
    name,
    part,
    shortIntro,
    skills,
    intro: document.getElementById('f-intro').value.trim(),
    email: document.getElementById('f-email').value.trim(),
    phone: document.getElementById('f-phone').value.trim(),
    website: document.getElementById('f-website').value.trim(),
    lastword: document.getElementById('f-lastword').value.trim(),
    isMe: false,
    seed
  });

  toggleForm();
  render();
}

// ===== 삭제 =====
function deleteLastMember() {
  if (members.length === 0) {
    alert('삭제할 멤버가 없습니다.');
    return;
  }
  const last = members[members.length - 1];
  if (confirm(`"${last.name}"을(를) 삭제하시겠습니까?`)) {
    members.pop();
    render();
  }
}

// ===== 초기 실행 =====
render();
