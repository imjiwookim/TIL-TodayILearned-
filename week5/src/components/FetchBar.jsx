function FetchBar() {
    return (
      <div className="fetch-bar">
        <div className="fetch-bar-inner">
          <div className="fetch-buttons">
            <button className="btn btn-fetch">＋ 랜덤 1명 추가</button>
            <button className="btn btn-fetch">＋＋ 랜덤 5명 추가</button>
            <button className="btn btn-refresh">🔄 전체 새로고침</button>
          </div>
          <div className="fetch-status">
            <span className="status-dot ready"></span>
            <span>준비 완료</span>
            <button className="btn btn-retry" style={{ display: 'none' }}>
              ↺ 재시도
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default FetchBar;