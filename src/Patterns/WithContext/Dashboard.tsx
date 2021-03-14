import { DSVRowArray, extent, scaleLinear, scaleTime, timeParse } from 'd3';
import React, { useContext, useRef, useState } from 'react';
import BarChart from './Charts/BarChart';
import LineChart from './Charts/LineChart';
import WorldMap from './Charts/WorldMap';
import { useCSVData } from './Util/useCSVData';
import useResizeObserver from './Util/useResizeObserver';
import { useWorldAtlas } from './Util/useWorldAtlas';

const parseYear = timeParse('%Y');

type ContextProps = {
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  data: {
    date: Date;
    population: number;
    country: string;
    code: string;
  }[][];
  width: number | undefined;
};

export const AuthContext = React.createContext<ContextProps>(
  {} as ContextProps,
);

export const useDashboard = () => useContext(AuthContext);

export const ChartComponent = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLObjectElement>(null);
  const dimensions = useResizeObserver(wrapperRef);

  const width = dimensions?.width || 300;
  const transform = (raw: DSVRowArray<string>) => {
    const years = raw?.columns?.slice(2);

    return raw.map((d) => {
      return years.map((year) => ({
        date: parseYear(year),
        population: d[year] ? +(d[year] || 0) * 1000 : null,
        country: d.Country,
        code:
          (d['Country code'] || 0) < 100
            ? `0${d['Country code']}`
            : d['Country code'],
      }));
    });
  };
  const data: {
    date: Date;
    population: number;
    country: string;
    code: string;
  }[][] = useCSVData(
    'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv',
    transform,
  );

  const worldAtlas = useWorldAtlas();

  if (data === null || !worldAtlas) {
    return <div>Loading...</div>;
  }

  const allData = data.reduce(
    (accumulator, countryTimeseries) => accumulator.concat(countryTimeseries),
    [],
  );

  // Define Scales
  const TimeScale = scaleTime()
    .domain(extent(allData, (d) => d.date) as [Date, Date])
    .range([0, innerWidth])
    .nice();
  const PopulationScale = scaleLinear()
    .domain(extent(allData, (d) => +d.population) as [number, number])
    .range([innerHeight, 0])
    .nice();

  return (
    <AuthContext.Provider value={{ selected, data, width, setSelected }}>
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
