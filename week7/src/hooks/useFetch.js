import { useState } from 'react';

export function useFetch() {
  const [status, setStatus] = useState('ready');
  const [errorMsg, setErrorMsg] = useState('');
  const [lastAction, setLastAction] = useState(null);

  const isLoading = status === 'loading';

  async function run(action) {
    if (isLoading) return;
    setLastAction(() => action);
    setStatus('loading');
    setErrorMsg('');

    try {
      await action();
      setStatus('success');
      setTimeout(() => setStatus('ready'), 1500);
    } catch (e) {
      setStatus('error');
      setErrorMsg(e.message || '네트워크 오류');
    }
  }

  function retry() {
    if (lastAction) run(lastAction);
  }

  const statusText = {
    ready: '준비 완료',
    loading: '불러오는 중...',
    success: '완료!',
    error: `불러오기 실패: ${errorMsg}`,
  }[status];

  return { status, statusText, isLoading, run, retry };
}