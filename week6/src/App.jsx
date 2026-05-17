import { useState } from 'react';
import './styles/style.css';

import { useLions } from './hooks/useLions';
import { useFetch } from './hooks/useFetch';
import { useViewOptions } from './hooks/useViewOptions';
import { filterAndSort } from './utils/convertUser';

import Header from './components/Header';
import FetchBar from './components/FetchBar';
import ViewOptions from './components/ViewOptions';
import AddForm from './components/AddForm';
import CardGrid from './components/CardGrid';
import DetailList from './components/DetailList';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { members, nextId, addMember, deleteLastMember, fetchAndAdd, fetchAndRefresh } = useLions();
  const { status, statusText, isLoading, run, retry } = useFetch();
  const { part, setPart, sort, setSort, search, setSearch } = useViewOptions();

  const filteredLions = filterAndSort(members, { part, sort, search });

  function handleToggleForm() {
    setIsFormOpen((prev) => !prev);
  }

  function handleSubmitForm(formData) {
    addMember(formData);
    setIsFormOpen(false);
  }

  return (
    <>
      <Header
        memberCount={members.length}
        onToggleForm={handleToggleForm}
        isFormOpen={isFormOpen}
        onDeleteLast={deleteLastMember}
      />
      <FetchBar
        status={status}
        statusText={statusText}
        isLoading={isLoading}
        onAdd1={() => run(() => fetchAndAdd(1))}
        onAdd5={() => run(() => fetchAndAdd(5))}
        onRefresh={() => run(() => fetchAndRefresh())}
        onRetry={retry}
      />
      <ViewOptions
        part={part}
        sort={sort}
        search={search}
        onPartChange={setPart}
        onSortChange={setSort}
        onSearchChange={setSearch}
      />
      <AddForm
        isOpen={isFormOpen}
        onClose={handleToggleForm}
        onSubmit={handleSubmitForm}
        nextId={nextId}
      />
      <main>
        <CardGrid lions={filteredLions} />
        <hr className="divider" />
        <DetailList lions={filteredLions} />
      </main>
    </>
  );
}

export default App;