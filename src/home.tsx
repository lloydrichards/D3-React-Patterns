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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(500px, 80vw)',
          }}
        >
          <h3> Time to build some D3 charts!</h3>
          <p>
            To get started, place a new folder in the <code>src/Patterns</code>{' '}
            directory and create a <code>index.tsx</code> file for your
            development.
          </p>
          <p>
            Next add a route in the <code>src/App.tsx</code> and lazy load your
            pattern's index.tsx. From here you will have a code split bundle
            that shouldn't load any extra components.
          </p>
          <p>
            Then at a Link tag to the route in this file,{' '}
            <code>src/home.tsx</code>
          </p>
          <p>
            <i>Good Luck!</i>
          </p>
          <p>
            Page has been open for <code>{count}</code> seconds.
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
          <Link to="/muratorium">
            Muratorium Pattern
          </Link>
          <Link to="/Curran">
            Curran Pattern
          </Link>
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
      </header>
    </div>
  );
}

export default Home;
