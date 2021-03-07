import React from 'react';
import { ChartComponent } from './ChartComponent';
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
        <h2>Curran</h2>
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
const width = 600;
const height = 400;

export const ChartComponent = () => {
  const worldAtlas = useWorldAtlas();
  const cities: Array<{ lat: number; lng: number }> = useCities();

  if (!worldAtlas || !cities) {
    return <pre>Loading...</pre>;
  }

  const sizeValue = (d: any) => d.population;
  const maxRadius = 10;

  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue || 0)])
    .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <Marks
        width={width}
        height={height}
        worldAtlas={worldAtlas}
        cities={cities}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
};`}</code>
        </pre>
        <p>
          There needed to be a little bit of Typescript injection to make the
          source code work, as well as add a <code>.fitToSize()</code> to get
          the map to fit in the page better.
        </p>
        <pre>
          <code>{`
interface Props {
  width: number;
  height: number;
  worldAtlas: { land: any; interiors: any };
  cities: Array<{
    lat: number;
    lng: number;
  }>;
  sizeScale: ScalePower<number, number, never>;
  sizeValue: (d: any) => any;
}

export const Marks: React.FC<Props> = ({
  worldAtlas: { land, interiors },
  cities,
  sizeScale,
  sizeValue,
  width,
  height,
}) => {
  const projection = geoNaturalEarth1().fitSize([width, height], {
    type: 'Sphere',
  });
  const path = geoPath(projection);
  const graticule = geoGraticule();
  return (
    <g className="marks">
      <path className="sphere" d={path({ type: 'Sphere' }) || ''} />
      <path className="graticules" d={path(graticule()) || ''} />
      {land.features.map((feature: any) => (
        <path className="land" d={path(feature) || ''} />
      ))}
      <path className="interiors" d={path(interiors) || ''} />
      {cities.map((d) => {
        const [x, y] = projection([d.lng, d.lat]) as [number, number];
        return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
      })}
    </g>
  );`}</code>
        </pre>
      </div>
    </div>
  );
}

export default Curran;
