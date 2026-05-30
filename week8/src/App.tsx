import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/style.css';

import { useLions } from './hooks/useLions';
import { useFetch } from './hooks/useFetch';

import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

function App() {
  const { members, nextId, addMember, deleteLastMember, fetchAndAdd, fetchAndRefresh } = useLions();
  const { status, statusText, isLoading, run, retry } = useFetch();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ListPage
              members={members}
              nextId={nextId}
              onAdd={addMember}
              onDeleteLast={deleteLastMember}
              onFetchAdd={(n) => run(() => fetchAndAdd(n))}
              onFetchRefresh={() => run(() => fetchAndRefresh())}
              fetchStatus={status}
              fetchStatusText={statusText}
              isLoading={isLoading}
              onRetry={retry}
            />
          }
        />
        <Route
          path="/lions/:id"
          element={<DetailPage members={members} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;