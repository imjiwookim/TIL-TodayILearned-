import type { Lion } from '../types/lion';
import ProfileCard from './ProfileCard';

interface CardGridProps {
  lions: Lion[];
}

function CardGrid({ lions }: CardGridProps) {
  return (
    <section className="section-block">
      <h2 className="section-title">멤버 소개</h2>
      {lions.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <p>표시할 아기 사자가 없습니다. (필터/검색 조건을 확인해 주세요)</p>
        </div>
      ) : (
        <div className="card-grid">
          {lions.map((lion) => (
            <ProfileCard key={lion.id} lion={lion} />
          ))}
        </div>
      )}
    </section>
  );
}

export default CardGrid;