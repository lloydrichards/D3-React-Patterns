import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';

const Curran = lazy(() => import('./Patterns/Curran/index'));
const Murantorium = lazy(() => import('./Patterns/Muratorium/index'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/curran" component={Curran} />
          <Route path="/muratorium" component={Murantorium} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
