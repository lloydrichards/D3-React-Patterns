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
          This way of implementing D3 into React was something I picked up from
          watching Muratorium's Video series on the subject. At the time it was
          using D3 v5 so there were some things i had to change in order to get
          it to work. There were especially issues when it came to Typescript
          and i'm still not sure how safe anything is
        </p>
        <p>
          The file structure for this pattern is pretty easy. Basically the
          chart is self contained in its own file with various helper functions
          usually in a <code>Util</code> folder. After building several graphs I
          end up with a colder filled with various charts that are each
          customized to the specific data and visualizations. Though its easy to
          fork these into other projects and adapt them to other forms, they are
          ultimately not very generic or flexible.
        </p>
        <code>
          <pre>
            {`-JustD3
--Util
---useData.tsx
---useResizeObserver.tsx
--d3Chart.tsx
--index.tsx`}
          </pre>
        </code>
      </div>
    </div>
  );
};

export default JustD3;
