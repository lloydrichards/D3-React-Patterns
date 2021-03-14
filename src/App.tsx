import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';
import Navbar from './Navbar';

const JustD3 = lazy(() => import('./Patterns/JustD3/index'));
const WithComponents = lazy(() => import('./Patterns/WithComponents/index'));
const WithSelectD3 = lazy(() => import('./Patterns/WithSelectD3/index'));
const WithContext = lazy(() => import('./Patterns/WithContext/index'));
const RenderProps = lazy(() => import('./Patterns/RenderProps/index'));
const HigherOrderComponent = lazy(
  () => import('./Patterns/HigherOrderComponent/index'),
);
//    <Router basename="/D3-React-Patterns">

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/just+d3" component={JustD3} />
          <Route path="/with+components" component={WithComponents} />
          <Route path="/with+select+d3" component={WithSelectD3} />
          <Route path="/with+context" component={WithContext} />
          <Route path="/render+props" component={RenderProps} />
          <Route
            path="/higher+order+component"
            component={HigherOrderComponent}
          />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
