import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onSignUp: (email: string, password: string) => Promise<string | null>;
  onSignIn: (email: string, password: string) => Promise<string | null>;
}

function LoginPage({ onSignUp, onSignIn }: LoginPageProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(): Promise<void> {
    setErrorMsg('');
    if (!email || !password) { setErrorMsg('이메일과 비밀번호를 입력해주세요.'); return; }
    if (password.length < 6) { setErrorMsg('비밀번호는 6자 이상이어야 합니다.'); return; }

    const error = isSignUp
      ? await onSignUp(email, password)
      : await onSignIn(email, password);

    if (error) {
      setErrorMsg(error);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">🦁 LION TRACK</div>
        <h2 className="login-title">{isSignUp ? '회원가입' : '로그인'}</h2>
        <div className="form-group">
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="6자 이상"
          />
        </div>
        {errorMsg && <p className="login-error">{errorMsg}</p>}
        <button className="btn btn-add login-btn" onClick={handleSubmit}>
          {isSignUp ? '회원가입' : '로그인'}
        </button>
        <button className="btn btn-cancel login-toggle" onClick={() => setIsSignUp((prev) => !prev)}>
          {isSignUp ? '이미 계정이 있어요 → 로그인' : '계정이 없어요 → 회원가입'}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;