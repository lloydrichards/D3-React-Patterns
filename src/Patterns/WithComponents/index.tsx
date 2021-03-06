import React from 'react';
import { ChartComponent } from './Dashboard';
import './index.css';

function WithComponents() {
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
          Rather than letting D3 have control of the DOM, in this pattern just
          uses React Components to returning JSX. In this way, rather than
          feeding data into the SVG, data can be stored and manipulated in the
          components and each part can be either smart of dumb to their context.
        </p>
        <pre>
          <code>{`With Componets
--Axis
----XLinearAxis.tsx
----XTimeAxis.tsx
----YBandAxis
----YLinearAxis
--Charts
----BarChart.tsx
----LineChart.tsx
----WorldMap.tsx
--Marks
----Bar.tsx
----BaseMap.tsx
----Line.tsx
----SelectCountry.tsx
--Util
----useCSVData.tsx
----useResizeObserver.tsx
----useWorldAtlas.tsx
--Dashboard.tsx
--index.tsx
--index.css`}</code>
        </pre>
      </div>
    </div>
  );
}

export default WithComponents;
