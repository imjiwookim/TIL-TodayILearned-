import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { filterAndSort } from '../utils/convertUser';
import type { Lion, FetchStatus, SortType } from '../types/lion';

import Header from '../components/Header';
import FetchBar from '../components/FetchBar';
import ViewOptions from '../components/ViewOptions';
import AddForm from '../components/AddForm';
import CardGrid from '../components/CardGrid';

interface ListPageProps {
  members: Lion[];
  isLoading: boolean;
  user: User | null;
  onAdd: (formData: { name: string; part: 'Frontend' | 'Backend' | 'Design'; shortIntro: string; skills: string[]; intro: string; email: string; phone: string; website: string; lastword: string }) => Promise<void>;
  onDeleteLast: () => Promise<void>;
  onFetchAdd: (n: number) => void;
  onFetchRefresh: () => void;
  fetchStatus: FetchStatus;
  fetchStatusText: string;
  isFetching: boolean;
  onRetry: () => void;
  onSignOut: () => Promise<void>;
}

function ListPage({
  members, isLoading, user, onAdd, onDeleteLast,
  onFetchAdd, onFetchRefresh, fetchStatus, fetchStatusText, isFetching, onRetry, onSignOut,
}: ListPageProps) {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const part = searchParams.get('part') ?? '전체';
  const sort = (searchParams.get('sort') ?? 'latest') as SortType;
  const search = searchParams.get('search') ?? '';

  function updateParams(newPart: string, newSort: SortType, newSearch: string): void {
    const params: Record<string, string> = {};
    if (newPart !== '전체') params.part = newPart;
    if (newSort !== 'latest') params.sort = newSort;
    if (newSearch !== '') params.search = newSearch;
    setSearchParams(params);
  }

  const filteredLions = filterAndSort(members, { part, sort, search });

  function handleToggleForm(): void {
    if (!user) { navigate('/login'); return; }
    setIsFormOpen((prev) => !prev);
  }

  async function handleSubmitForm(formData: Parameters<typeof onAdd>[0]): Promise<void> {
    await onAdd(formData);
    setIsFormOpen(false);
  }

  return (
    <>
      <Header
        memberCount={members.length}
        user={user}
        onToggleForm={handleToggleForm}
        isFormOpen={isFormOpen}
        onDeleteLast={onDeleteLast}
        onSignOut={onSignOut}
      />
      {!user && (
        <div style={{ background: '#e8f0ff', padding: '12px 24px', fontSize: '0.9rem' }}>
          명단을 수정하려면 <a href="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>로그인</a>이 필요합니다.
        </div>
      )}
      <FetchBar
        status={fetchStatus}
        statusText={fetchStatusText}
        isLoading={isFetching}
        onAdd1={() => onFetchAdd(1)}
        onAdd5={() => onFetchAdd(5)}
        onRefresh={onFetchRefresh}
        onRetry={onRetry}
        isAuthenticated={!!user}
      />
      <ViewOptions
        part={part}
        sort={sort}
        search={search}
        onPartChange={(v) => updateParams(v, sort, search)}
        onSortChange={(v) => updateParams(part, v as SortType, search)}
        onSearchChange={(v) => updateParams(part, sort, v)}
      />
      <AddForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        nextId={0}
      />
      <main>
        {isLoading ? (
          <div className="empty-state">
            <p>불러오는 중...</p>
          </div>
        ) : (
          <CardGrid lions={filteredLions} />
        )}
      </main>
    </>
  );
}

export default ListPage;