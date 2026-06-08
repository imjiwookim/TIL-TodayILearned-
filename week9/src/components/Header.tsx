import type { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  memberCount: number;
  user: User | null;
  onToggleForm: () => void;
  isFormOpen: boolean;
  onDeleteLast: () => void;
  onSignOut: () => Promise<void>;
}

function Header({ memberCount, user, onToggleForm, isFormOpen, onDeleteLast, onSignOut }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <span className="logo">🦁 LION TRACK</span>
        <span className="member-count">
          총 <strong>{memberCount}</strong>명
        </span>
      </div>
      <div className="top-bar-right">
        {user ? (
          <>
            <span className="member-count">{user.email}</span>
            <button className="btn btn-add" onClick={onToggleForm}>
              {isFormOpen ? '✕ 닫기' : '+ 아기사자 추가'}
            </button>
            <button className="btn btn-delete" onClick={onDeleteLast}>
              − 마지막 삭제
            </button>
            <button className="btn btn-cancel" onClick={onSignOut}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-add" disabled>
              + 아기사자 추가
            </button>
            <button className="btn btn-delete" disabled>
              − 마지막 삭제
            </button>
            <button className="btn btn-cancel" onClick={() => navigate('/login')}>
              로그인
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;