function ViewOptions() {
    return (
      <div className="view-options">
        <div className="view-options-inner">
          <div className="filter-group">
            <label className="opt-label">파트</label>
            <div className="part-filters">
              <button className="filter-btn active">전체</button>
              <button className="filter-btn">Frontend</button>
              <button className="filter-btn">Backend</button>
              <button className="filter-btn">Design</button>
            </div>
          </div>
          <div className="filter-group">
            <label className="opt-label">정렬</label>
            <select className="opt-select">
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
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ViewOptions;