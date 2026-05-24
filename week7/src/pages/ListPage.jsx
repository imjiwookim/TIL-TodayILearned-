import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterAndSort } from '../utils/convertUser';

import Header from '../components/Header';
import FetchBar from '../components/FetchBar';
import ViewOptions from '../components/ViewOptions';
import AddForm from '../components/AddForm';
import CardGrid from '../components/CardGrid';

function ListPage({
  members, nextId, onAdd, onDeleteLast,
  onFetchAdd, onFetchRefresh, fetchStatus, fetchStatusText, isLoading, onRetry,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const part = searchParams.get('part') || '전체';
  const sort = searchParams.get('sort') || 'latest';
  const search = searchParams.get('search') || '';

  function updateParams(newPart, newSort, newSearch) {
    const params = {};
    if (newPart !== '전체') params.part = newPart;
    if (newSort !== 'latest') params.sort = newSort;
    if (newSearch !== '') params.search = newSearch;
    setSearchParams(params);
  }

  const filteredLions = filterAndSort(members, { part, sort, search });

  function handleToggleForm() {
    setIsFormOpen((prev) => !prev);
  }

  function handleSubmitForm(formData) {
    onAdd(formData);
    setIsFormOpen(false);
  }

  return (
    <>
      <Header
        memberCount={members.length}
        onToggleForm={handleToggleForm}
        isFormOpen={isFormOpen}
        onDeleteLast={onDeleteLast}
      />
      <FetchBar
        status={fetchStatus}
        statusText={fetchStatusText}
        isLoading={isLoading}
        onAdd1={() => onFetchAdd(1)}
        onAdd5={() => onFetchAdd(5)}
        onRefresh={onFetchRefresh}
        onRetry={onRetry}
      />
      <ViewOptions
        part={part}
        sort={sort}
        search={search}
        onPartChange={(v) => updateParams(v, sort, search)}
        onSortChange={(v) => updateParams(part, v, search)}
        onSearchChange={(v) => updateParams(part, sort, v)}
      />
      <AddForm
        isOpen={isFormOpen}
        onClose={handleToggleForm}
        onSubmit={handleSubmitForm}
        nextId={nextId}
      />
      <main>
        <CardGrid lions={filteredLions} />
      </main>
    </>
  );
}

export default ListPage;