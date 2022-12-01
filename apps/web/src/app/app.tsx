// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes, Link } from 'react-router-dom';
import Game from './game';

export function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Link to="/game">Click here for game page .</Link>
            </div>
          }
        />
        <Route path="/game" element={<Game />} />
      </Routes>
      {/* END: routes */}
    </>
  );
}

export default App;
