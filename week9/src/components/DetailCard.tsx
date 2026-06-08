import type { Lion } from '../types/lion';

interface DetailCardProps {
  lion: Lion;
}

function DetailCard({ lion }: DetailCardProps) {
  const { name, part, intro, skills, email, phone, website, lastword } = lion;

  return (
    <div className="detail-card">
      <div className="dc-header">
        <span className="dc-name">{name}</span>
        <span className="dc-part">{part}</span>
        <span className="dc-club">LION TRACK</span>
      </div>
      <div className="dc-body">
        <div className="dc-section full-width">
          <span className="dc-label">자기소개</span>
          <p className="dc-content">{intro || '—'}</p>
        </div>
        <div className="dc-section">
          <span className="dc-label">관심 기술</span>
          <div className="dc-content">
            <ul>
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="dc-section">
          <span className="dc-label">연락처</span>
          <div className="dc-content">
            <ul>
              {email && <li>이메일: {email}</li>}
              {phone && <li>전화: {phone}</li>}
              {website && <li>웹사이트: {website}</li>}
            </ul>
          </div>
        </div>
        <div className="dc-section full-width">
          <span className="dc-label">한 마디</span>
          <p className="dc-lastword">"{lastword || '—'}"</p>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;