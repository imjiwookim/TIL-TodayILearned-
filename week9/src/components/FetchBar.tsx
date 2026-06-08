import type { FetchStatus } from '../types/lion';

interface FetchBarProps {
  status: FetchStatus;
  statusText: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  onAdd1: () => void;
  onAdd5: () => void;
  onRefresh: () => void;
  onRetry: () => void;
}

function FetchBar({ status, statusText, isLoading, isAuthenticated, onAdd1, onAdd5, onRefresh, onRetry }: FetchBarProps) {
  return (
    <div className="fetch-bar">
      <div className="fetch-bar-inner">
        <div className="fetch-buttons">
          <button className="btn btn-fetch" onClick={onAdd1} disabled={isLoading || !isAuthenticated}>
            ＋ 랜덤 1명 추가
          </button>
          <button className="btn btn-fetch" onClick={onAdd5} disabled={isLoading || !isAuthenticated}>
            ＋＋ 랜덤 5명 추가
          </button>
          <button className="btn btn-refresh" onClick={onRefresh} disabled={isLoading || !isAuthenticated}>
            🔄 전체 새로고침
          </button>
        </div>
        <div className="fetch-status">
          <span className={`status-dot ${status}`}></span>
          <span>{statusText}</span>
          {status === 'error' && (
            <button className="btn btn-retry" onClick={onRetry}>
              ↺ 재시도
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FetchBar;