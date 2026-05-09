import './styles/style.css';
import lions from './data/lions';

import Header from './components/Header';
import FetchBar from './components/FetchBar';
import ViewOptions from './components/ViewOptions';
import AddForm from './components/AddForm';
import CardGrid from './components/CardGrid';
import DetailList from './components/DetailList';

function App() {
  return (
    <>
      <Header memberCount={lions.length} />
      <FetchBar />
      <ViewOptions />
      <AddForm />
      <main>
        <CardGrid lions={lions} />
        <hr className="divider" />
        <DetailList lions={lions} />
      </main>
    </>
  );
}

export default App;