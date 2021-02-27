import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';

const Example = lazy(() => import('./Patterns/Example'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/example" component={Example} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
