function ViewOptions({ part, sort, search, onPartChange, onSortChange, onSearchChange }) {
  const parts = ['전체', 'Frontend', 'Backend', 'Design'];

  return (
    <div className="view-options">
      <div className="view-options-inner">
        <div className="filter-group">
          <label className="opt-label">파트</label>
          <div className="part-filters">
            {parts.map((p) => (
              <button
                key={p}
                className={`filter-btn${part === p ? ' active' : ''}`}
                onClick={() => onPartChange(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <label className="opt-label">정렬</label>
          <select
            className="opt-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="latest">최신 추가순</option>
            <option value="name">이름순</option>
          </select>
        </div>
        <div className="filter-group search-group">
          <label className="opt-label">검색</label>
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="opt-search"
              placeholder="이름으로 검색..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOptions;