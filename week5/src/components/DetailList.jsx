import DetailCard from './DetailCard';

function DetailList({ lions }) {
  return (
    <section className="section-block">
      <h2 className="section-title">상세 소개</h2>
      <div>
        {lions.map((lion) => (
          <DetailCard key={lion.id} lion={lion} />
        ))}
      </div>
    </section>
  );
}

export default DetailList;