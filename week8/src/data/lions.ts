import type { Lion } from '../types/lion';

const lions: Lion[] = [
  {
    id: 1, name: '김아기사자', part: 'Frontend',
    shortIntro: '프론트엔드 개발에 관심이 많습니다',
    skills: ['React', 'JavaScript', 'HTML/CSS'],
    intro: '안녕하세요 김아기사자입니다. 프론트엔드에 관심이 생겨서 공부를 시작했습니다.',
    email: 'kim@example.com', phone: '010-1111-2222', website: 'github.com/kim',
    lastword: '열심히 하겠습니다!', isMe: true, seed: 'aa',
  },
  {
    id: 2, name: '박아기사자', part: 'Backend',
    shortIntro: '서버 개발을 공부하고 있습니다',
    skills: ['Spring', 'Java', 'MySQL'],
    intro: '안녕하세요 박아기사자입니다. 백엔드 개발에 관심이 많습니다.',
    email: 'park@example.com', phone: '010-2222-3333', website: 'github.com/park',
    lastword: '잘 부탁드립니다!', isMe: false, seed: 'bb',
  },
  {
    id: 3, name: '이아기사자', part: 'Design',
    shortIntro: 'UI 디자인을 좋아합니다',
    skills: ['Figma', 'Photoshop', 'Illustrator'],
    intro: '안녕하세요 이아기사자입니다. 디자인을 배우고 있습니다.',
    email: 'lee@example.com', phone: '010-3333-4444', website: 'github.com/lee',
    lastword: '예쁜 디자인 만들겠습니다!', isMe: false, seed: 'cc',
  },
  {
    id: 4, name: '최아기사자', part: 'Frontend',
    shortIntro: '타입스크립트를 공부중입니다',
    skills: ['TypeScript', 'React', 'Next.js'],
    intro: '안녕하세요 최아기사자입니다. 타입스크립트를 열심히 공부하고 있습니다.',
    email: 'choi@example.com', phone: '010-4444-5555', website: 'github.com/choi',
    lastword: '꾸준히 성장하겠습니다!', isMe: false, seed: 'dd',
  },
  {
    id: 5, name: '정아기사자', part: 'Backend',
    shortIntro: '백엔드 개발자를 꿈꿉니다',
    skills: ['Node.js', 'Express', 'MongoDB'],
    intro: '안녕하세요 정아기사자입니다. Node.js로 서버를 만드는 걸 배우고 있습니다.',
    email: 'jung@example.com', phone: '010-5555-6666', website: 'github.com/jung',
    lastword: '백엔드 마스터가 되겠습니다!', isMe: false, seed: 'ee',
  },
  {
    id: 6, name: '오아기사자', part: 'Design',
    shortIntro: '예쁜 디자인을 만들고 싶습니다',
    skills: ['Figma', 'Design System', 'Storybook'],
    intro: '안녕하세요 오아기사자입니다. 디자인 시스템에 관심이 생겼습니다.',
    email: 'oh@example.com', phone: '010-6666-7777', website: 'github.com/oh',
    lastword: '열심히 배우겠습니다!', isMe: false, seed: 'ff',
  },
];

export default lions;