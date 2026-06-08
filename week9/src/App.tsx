import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/style.css';

import { useLions } from './hooks/useLions';
import { useFetch } from './hooks/useFetch';
import { useAuth } from './hooks/useAuth';

import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';

function App() {
  const { members, isLoading, addMember, deleteLastMember, fetchAndAdd, fetchAndRefresh } = useLions();
  const { status, statusText, isLoading: isFetching, run, retry } = useFetch();
  const { user, signUp, signIn, signOut } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ListPage
              members={members}
              isLoading={isLoading}
              user={user}
              onAdd={(data) => addMember(data)}
              onDeleteLast={deleteLastMember}
              onFetchAdd={(n) => run(() => fetchAndAdd(n))}
              onFetchRefresh={() => run(() => fetchAndRefresh())}
              fetchStatus={status}
              fetchStatusText={statusText}
              isFetching={isFetching}
              onRetry={retry}
              onSignOut={signOut}
            />
          }
        />
        <Route
          path="/lions/:id"
          element={<DetailPage members={members} />}
        />
        <Route
          path="/login"
          element={<LoginPage onSignUp={signUp} onSignIn={signIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;