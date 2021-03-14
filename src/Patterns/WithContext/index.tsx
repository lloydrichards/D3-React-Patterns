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
        <h2>With Context Pattern</h2>
        <p>
          While working on the With Component Pattern it was evident that some
          props, like the setSelected would need to be passed down into nested
          components. This made for redundant and deeply nested code that was
          hard to organize and change. In an effort to centralize everything,
          here I use the <code>useContext</code> hook in order to create a
          central place for things like data, scales and interactivity which can
          then be called on by a custom <code>useDashboard</code> hook. This
          eliminates a lot of prop passing as any nested component, anywhere,
          can have access to the whole dashboards props and functions.
        </p>
        <p>
          This was particularly useful things like scales where I could setup
          the domain of the scale in the <code>Dashboard.jsx</code> and then
          call this later on and pass in the <code>.range()</code> with the
          inner dimensions.{' '}
        </p>
        <pre>
          <code>{`export const ChartComponent = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLObjectElement>(null);
  const dimensions = useResizeObserver(wrapperRef);

  const width = dimensions?.width || 450;
  // Parse Data
  const data = useCSVData()

  // Define Scales
  const TimeScale = scaleTime()
    .domain(extent(allData, (d) => d.date) as [Date, Date])
    .range([0, innerWidth])
    .nice();
  const PopulationScale = scaleLinear()
    .domain(extent(allData, (d) => +d.population) as [number, number])
    .range([innerHeight, 0])
    .nice();
  const CountryCategories = scaleBand()
    .domain(
      data
        .map((d) => d[d.length - 1])
        .slice(0, 25)
        .map((i) => i.country),
    )
    .range([0, innerHeight])
    .paddingInner(0.2);

  return (
    <AuthContext.Provider
      value={{
        selected,
        data,
        width,
        setSelected,
        scales: { TimeScale, PopulationScale, CountryCategories },
      }}
    >
      <div ref={wrapperRef}>
        <WorldMap worldAtlas={worldAtlas} />
        {data && (
          <>
            <LineChart />
            <BarChart />
          </>
        )}
      </div>
    </AuthContext.Provider>
  );
};
`}</code>
        </pre>
      </div>
    </div>
  );
}

export default WithSelectD3;
