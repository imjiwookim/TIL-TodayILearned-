import { useState } from 'react';
import type { FetchStatus } from '../types/lion';

interface UseFetchReturn {
  status: FetchStatus;
  statusText: string;
  isLoading: boolean;
  run: (action: () => Promise<void>) => Promise<void>;
  retry: () => void;
}

export function useFetch(): UseFetchReturn {
  const [status, setStatus] = useState<FetchStatus>('ready');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [lastAction, setLastAction] = useState<(() => Promise<void>) | null>(null);

  const isLoading = status === 'loading';

  async function run(action: () => Promise<void>): Promise<void> {
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
      setErrorMsg(e instanceof Error ? e.message : '네트워크 오류');
    }
  }

  function retry(): void {
    if (lastAction) run(lastAction);
  }

  const statusText: Record<FetchStatus, string> = {
    ready: '준비 완료',
    loading: '불러오는 중...',
    success: '완료!',
    error: `불러오기 실패: ${errorMsg}`,
  };

  return { status, statusText: statusText[status], isLoading, run, retry };
}