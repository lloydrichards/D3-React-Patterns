import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './Style/App.css';

interface AppProps {}

function Home({}: AppProps) {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h3> Time to build some D3 chart patterns!</h3>
      </header>
      <div
        className="App-body"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(500px, 80vw)',
        }}
      >
        <p>
          The challenge here is to represent different ways of implementing D3
          into React. This is not to see which is 'best' but rather to see
          different techniques and evaluate their strengths and weaknesses. In
          order to make the comparison, each Pattern should use the same data
          source and present it in three separate chart, that can be interacted
          with to update all the charts at once.
        </p>
        <p>
          While viewing the pages on the web is nice, the real show is in the{' '}
          <a href="https://github.com/lloydrichards/D3-React-Patterns">
            Github D3-React-Patterns
          </a>{' '}
          repo where you can see the code and compare the different
          implementations
        </p>
        <p>
          To get started, place a new folder in the <code>src/Patterns</code>{' '}
          directory and create a <code>index.tsx</code> file for your
          development.
        </p>
        <p>
          Next add a route in the <code>src/App.tsx</code> and lazy load your
          pattern's index.tsx. From here you will have a code split bundle that
          shouldn't load any extra components.
        </p>
        <p>
          Then at a Link tag to the route in this file,{' '}
          <code>src/home.tsx</code>
        </p>
        <p>
          <i>Good Luck!</i>
        </p>
      </div>
      <div
        className="route-link"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(500px, 80vw)',
          color: 'snow',
        }}
      >
        <h3>Patterns</h3>
        <Link to="/just+d3">JustD3</Link>
        <Link to="/with+select+d3">WithSelectD3</Link>
        <Link to="/with+components">WithComponents</Link>
        <Link to="/with+context">WithContext (coming soon)</Link>
        <Link to="/render+props">RenderProps (coming soon)</Link>
        <Link to="/higher+order+components">HOC (coming soon)</Link>
      </div>
      <p>
        <a
          className="App-link"
          href="https://d3js.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn D3
        </a>
      </p>
      <p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </p>
    </div>
  );
}

export default Home;
