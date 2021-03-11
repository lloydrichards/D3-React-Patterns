import React from 'react';
import { ChartComponent } from './Dashboard';
import './index.css';

function WithSelectD3() {
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
        <h2>With Select D3 Pattern</h2>
        <p>
          When it comes to certain chart elements such as axises and brushes,
          its just a lot easier to let D3 have control and render the{' '}
          <code>{`<g>`}</code> element. This is done by having a wrapped React
          Component that outputs an <code>{`<svg>`}</code> that D3 can control
          and manipulate this part of the DOM.
        </p>
        <p>
          The file structure is more atomic as you can group together all the
          top level charts which are made up of smaller and smaller components.
          These could also be organized per chart with the chart at the top
          level and then nested Axis and Marks folders. But if you wanted to
          make different types of the same category of charts, then its better
          to have them broken out atomically.
        </p>
        <pre>
          <code>{`With Select D3
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

export default WithSelectD3;
