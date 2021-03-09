import { DSVRowArray, timeParse } from 'd3';
import React, { useState } from 'react';
import BarChart from './Charts/BarChart';
import LineChart from './Charts/LineChart';
import WorldMap from './Charts/WorldMap';
import { useCSVData } from './Util/useData';
import { useWorldAtlas } from './Util/useWorldAtlas';

const parseYear = timeParse('%Y');

const Dashboard = () => {
  const [selected, setSelected] = useState<string | null>(null);
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
  const data = useCSVData(
    'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv',
    transform,
  );

  const worldAtlas = useWorldAtlas();

  if (!data || !worldAtlas) <pre>Loading...</pre>;

  console.log(selected);
  return (
    <div>
      <WorldMap
        worldAtlas={worldAtlas}
        selected={selected}
        onSelect={setSelected}
      />
      <LineChart selected={selected} data={data} />
      <BarChart selected={selected} data={data}   onSelect={setSelected}
 />
    </div>
  );
};

export default Dashboard;
