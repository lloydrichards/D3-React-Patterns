import React from 'react';
import { ChartComponent } from './Dashboard';
import './index.css';

function Curran() {
  return (
    <div
      style={{
        margin: '2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: '1rem',
      }}
    >
      <div>
        <ChartComponent />
      </div>
      <div>
        <h2>With Components Pattern</h2>
        <p>
          Full credit for this code goes to Curran Kelleher and his tutorials on
          D3 and React.
        </p>
        <p>
          <a href="https://vizhub.com/curran/118d7f70085246a58dc7a374fd957c20?edit=files&file=styles.css">
            Source Code
          </a>
        </p>
        <p>
          Rather than letting D3 have control of the DOM, in his example Curran
          recreates the effect of D3's rendering but using the React Component
          model of returning JSX. In this way, rather than feeding data into the
          SVG, data can be stored and manipulated in the components and each
          part can be either smart of dumb to their context.
        </p>
        <pre>
          <code>{`
          --
          `}</code>
        </pre>
      </div>
    </div>
  );
}

export default Curran;
