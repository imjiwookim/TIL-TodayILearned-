import ProfileCard from './ProfileCard';

function CardGrid({ lions }) {
  return (
    <section className="section-block">
      <h2 className="section-title">멤버 소개</h2>
      <div className="card-grid">
        {lions.map((lion) => (
          <ProfileCard key={lion.id} lion={lion} />
        ))}
      </div>
    </section>
  );
}

export default CardGrid;