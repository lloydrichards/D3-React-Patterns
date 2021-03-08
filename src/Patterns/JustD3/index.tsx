import React from 'react';
import Dashboard from './Dashboard';
import './index.css';

const JustD3 = () => {
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
        <Dashboard />
      </div>
      <div>
        <h2>Just D3 Pattern</h2>
        <p>
          With the <strong>Just D3 Pattern</strong> we break the specific D3
          charts up into their own component and then using{' '}
          <code>useEffect()</code> and <code>useRef()</code> allow D3 to control
          a specific SVG element and then construct the chart in the same way it
          would be done in JS. With Typescript there are some odd moments and
          the need to create more safe fall backs for the charts, but it works
          quite closely to examples you can find in ObservableHQ or bl.ocks.org
        </p>
        <p>
          The file structure for this pattern is pretty easy. Basically, there
          is one top level component <code>Dashboard.tsx</code> which handles
          the data fetching and state management. Then each chart is self
          contained in its own file with various helper functions usually in a{' '}
          <code>Util</code> folder. After building several graphs I end up with
          a colder filled with various charts that are each customized to the
          specific data and visualizations. Though its easy to fork these into
          other projects and adapt them to other forms, they are ultimately not
          very generic or flexible.
        </p>
        <code>
          <pre>
            {`JustD3
--Charts
----BarChart.tsx
----LineChart.tsx
----WorldMap.tsx
--Util
----useData.tsx
----useResizeObserver.tsx
----useWorldAtlas.tsx
--Dashboard.tsx
--index.tsx`}
          </pre>
        </code>
      </div>
    </div>
  );
};

export default JustD3;
