import DetailCard from './DetailCard';

function DetailList({ lions }) {
  return (
    <section className="section-block">
      <h2 className="section-title">상세 소개</h2>
      {lions.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>표시할 아기 사자가 없습니다. (필터/검색 조건을 확인해 주세요)</p>
        </div>
      ) : (
        <div>
          {lions.map((lion) => (
            <DetailCard key={lion.id} lion={lion} />
          ))}
        </div>
      )}
    </section>
  );
}

export default DetailList;