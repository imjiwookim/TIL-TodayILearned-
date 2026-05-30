interface HeaderProps {
  memberCount: number;
  onToggleForm: () => void;
  isFormOpen: boolean;
  onDeleteLast: () => void;
}

function Header({ memberCount, onToggleForm, isFormOpen, onDeleteLast }: HeaderProps) {
  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <span className="logo">🦁 LION TRACK</span>
        <span className="member-count">
          총 <strong>{memberCount}</strong>명
        </span>
      </div>
      <div className="top-bar-right">
        <button className="btn btn-add" onClick={onToggleForm}>
          {isFormOpen ? '✕ 닫기' : '+ 아기사자 추가'}
        </button>
        <button className="btn btn-delete" onClick={onDeleteLast}>
          − 마지막 삭제
        </button>
      </div>
    </header>
  );
}

export default Header;