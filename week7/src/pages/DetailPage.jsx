import { useParams, useNavigate } from 'react-router-dom';
import DetailCard from '../components/DetailCard';

function DetailPage({ members }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const lion = members.find((m) => m.id === Number(id));

  if (!lion) {
    return (
      <main>
        <div className="empty-state">
          <span className="empty-icon">😢</span>
          <p>해당 아기사자를 찾을 수 없습니다.</p>
          <button className="btn btn-add" onClick={() => navigate('/')}>
            목록으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <header className="top-bar">
        <div className="top-bar-left">
          <span className="logo">🦁 LION TRACK</span>
        </div>
        <div className="top-bar-right">
          <button className="btn btn-cancel" onClick={() => navigate(-1)}>
            ← 뒤로 가기
          </button>
          <button className="btn btn-add" onClick={() => navigate('/')}>
            목록으로
          </button>
        </div>
      </header>
      <main>
        <div className="section-block">
          <DetailCard lion={lion} />
        </div>
      </main>
    </>
  );
}

export default DetailPage;