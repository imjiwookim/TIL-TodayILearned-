import { useState, useEffect } from 'react';
import { convertUserToMember } from '../utils/convertUser';

const INITIAL_FORM = {
  name: '', part: 'Frontend', shortIntro: '', skills: '',
  intro: '', email: '', phone: '', website: '', lastword: '',
};

function AddForm({ isOpen, onClose, onSubmit, nextId }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isRandomLoading, setIsRandomLoading] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleClose() {
    setForm(INITIAL_FORM);
    onClose();
  }

  function handleSubmit() {
    const { name, shortIntro, skills } = form;
    if (!name || !shortIntro || !skills) {
      alert('이름, 한 줄 소개, 관심 기술은 필수 입력 항목입니다.');
      return;
    }
    onSubmit({
      ...form,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setForm(INITIAL_FORM);
  }

  async function handleRandomFill() {
    setIsRandomLoading(true);
    try {
      const res = await fetch('https://randomuser.me/api/?results=1&nat=us,gb,ca,au,nz');
      const data = await res.json();
      const m = convertUserToMember(data.results[0], nextId);
      setForm({
        name: m.name, part: m.part, shortIntro: m.shortIntro,
        skills: m.skills.join(', '), intro: m.intro,
        email: m.email, phone: m.phone, website: m.website, lastword: m.lastword,
      });
    } catch {
      alert('랜덤 값 불러오기에 실패했습니다.');
    } finally {
      setIsRandomLoading(false);
    }
  }

  return (
    <section className={`form-section${isOpen ? ' open' : ''}`}>
      <div className="form-wrapper">
        <div className="form-title-row">
          <h2 className="form-title">새 아기사자 추가</h2>
          <button className="btn btn-random-fill" onClick={handleRandomFill} disabled={isRandomLoading}>
            {isRandomLoading ? '⏳ 불러오는 중...' : '🎲 랜덤 값 채우기'}
          </button>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>이름 *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="홍길동" />
          </div>
          <div className="form-group">
            <label>파트 *</label>
            <select name="part" value={form.part} onChange={handleChange}>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <div className="form-group">
            <label>한 줄 소개 *</label>
            <input name="shortIntro" value={form.shortIntro} onChange={handleChange} placeholder="요약 카드에 표시될 한 줄 소개" />
          </div>
          <div className="form-group">
            <label>관심 기술 (쉼표로 구분) *</label>
            <input name="skills" value={form.skills} onChange={handleChange} placeholder="React, TypeScript, Next.js" />
          </div>
          <div className="form-group full-width">
            <label>자기소개</label>
            <textarea name="intro" value={form.intro} onChange={handleChange} rows={3} placeholder="상세 카드에 표시될 자기소개를 입력하세요" />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@email.com" />
          </div>
          <div className="form-group">
            <label>전화번호</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="010-0000-0000" />
          </div>
          <div className="form-group">
            <label>웹사이트 / GitHub</label>
            <input name="website" value={form.website} onChange={handleChange} placeholder="github.com/username" />
          </div>
          <div className="form-group">
            <label>한 마디</label>
            <input name="lastword" value={form.lastword} onChange={handleChange} placeholder="각오 한 마디!" />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn btn-add" onClick={handleSubmit}>추가하기</button>
          <button className="btn btn-cancel" onClick={handleClose}>취소</button>
        </div>
      </div>
    </section>
  );
}

export default AddForm;