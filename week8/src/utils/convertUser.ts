import type { Lion, Part, RandomUserResult, ViewOptions } from '../types/lion';

const PARTS: Part[] = ['Frontend', 'Backend', 'Design'];
const SKILLS_MAP: Record<Part, string[]> = {
  Frontend: ['React', 'Vue', 'TypeScript', 'Next.js', 'HTML/CSS', 'JavaScript', 'Tailwind'],
  Backend: ['Spring', 'Node.js', 'Django', 'FastAPI', 'MySQL', 'PostgreSQL', 'Redis'],
  Design: ['Figma', 'Photoshop', 'Illustrator', 'Framer', 'Design System', 'Storybook'],
};
const LASTWORDS: string[] = [
  '열심히 하겠습니다!', '잘 부탁드립니다!', '꾸준히 성장하겠습니다!',
  '함께 달려봐요!', '배움을 즐기겠습니다!', '최선을 다하겠습니다!',
];

export function convertUserToMember(user: RandomUserResult, nextId: number): Lion {
  const part: Part = PARTS[Math.floor(Math.random() * PARTS.length)];
  const pool = SKILLS_MAP[part].slice().sort(() => 0.5 - Math.random());
  const skills = pool.slice(0, 3);
  const seed = Math.random().toString(36).slice(2, 8);
  const first = user.name?.first || '사자';
  const last = user.name?.last || '아기';
  const city = user.location?.city || '';
  const login = user.login?.username || 'lion';

  return {
    id: nextId,
    name: last + first,
    part,
    shortIntro: city ? `${city} 출신 ${part} 개발자` : `${part} 공부 중입니다`,
    skills,
    intro: `안녕하세요, ${last + first}입니다. ${part} 분야에서 열심히 배우고 있습니다.`,
    email: user.email || '',
    phone: user.phone || '',
    website: `github.com/${login}`,
    lastword: LASTWORDS[Math.floor(Math.random() * LASTWORDS.length)],
    isMe: false,
    seed,
  };
}

export function filterAndSort(members: Lion[], { part, search, sort }: ViewOptions): Lion[] {
  let list = [...members];
  if (part !== '전체') list = list.filter((m) => m.part === part);
  if (search) list = list.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  } else {
    list.sort((a, b) => b.id - a.id);
  }
  return list;
}