// = Libs =
import { Fragment } from 'react';

// = Components =
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals/Meals';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
