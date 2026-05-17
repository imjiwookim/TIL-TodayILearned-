function ProfileCard({ lion }) {
    const { name, part, shortIntro, skills, isMe, seed } = lion;
  
    return (
      <div className={`card${isMe ? ' my-card' : ''}`}>
        <div className="img-box">
          <img
            src={`https://picsum.photos/seed/${seed}/300/200`}
            alt={`${name} 프로필`}
            loading="lazy"
          />
          <span className="badge">{skills[0]}</span>
        </div>
        <div className="card-info">
          <p className="name">{name}</p>
          <span className="part-tag">{part}</span>
          <p className="short-intro">{shortIntro}</p>
        </div>
      </div>
    );
  }
  
  export default ProfileCard;