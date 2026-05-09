function AddForm() {
    return (
      <section className="form-section">
        <div className="form-wrapper">
          <div className="form-title-row">
            <h2 className="form-title">새 아기사자 추가</h2>
            <button className="btn btn-random-fill">🎲 랜덤 값 채우기</button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>이름 *</label>
              <input type="text" placeholder="홍길동" />
            </div>
            <div className="form-group">
              <label>파트 *</label>
              <select>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
              </select>
            </div>
            <div className="form-group">
              <label>한 줄 소개 *</label>
              <input type="text" placeholder="요약 카드에 표시될 한 줄 소개" />
            </div>
            <div className="form-group">
              <label>관심 기술 (쉼표로 구분) *</label>
              <input type="text" placeholder="React, TypeScript, Next.js" />
            </div>
            <div className="form-group full-width">
              <label>자기소개</label>
              <textarea rows={3} placeholder="상세 카드에 표시될 자기소개를 입력하세요" />
            </div>
            <div className="form-group">
              <label>이메일</label>
              <input type="email" placeholder="example@email.com" />
            </div>
            <div className="form-group">
              <label>전화번호</label>
              <input type="tel" placeholder="010-0000-0000" />
            </div>
            <div className="form-group">
              <label>웹사이트 / GitHub</label>
              <input type="text" placeholder="github.com/username" />
            </div>
            <div className="form-group">
              <label>한 마디</label>
              <input type="text" placeholder="각오 한 마디!" />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-add">추가하기</button>
            <button className="btn btn-cancel">취소</button>
          </div>
        </div>
      </section>
    );
  }
  
  export default AddForm;