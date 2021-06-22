import React from 'react';
import HexAtlas from './HexAtlas';
import './index.css';
import { countryLookUp } from './Util/lookUpM49';
import { useWorldAtlas } from './Util/useWorldAtlas';

const JustD3 = () => {
  const world = useWorldAtlas();

  const data = [
    { category: 'Germany', quantity: 10 },
    { category: 'Brazil', quantity: 100 },
    { category: 'China', quantity: 500 },
  ];

  const parsedData = data
    .map((d) => {
      const code = countryLookUp.find((i) => i.country == d.category);
      return { ...d, code: `${code?.m49_code}` };
    })
    .filter((f) => f.code !== 'undefined');

  return (
    <div
      style={{
        margin: '2rem',
      }}
    >
      <div style={{ height: 500 }}>
        <HexAtlas world={world} data={parsedData} />
      </div>
      <div>
        <h2>Hex Atlas</h2>
        <p>
          This is a pretty cool example of using not only D3 to control the svg
          in the virtual DOM, but also to create a canvas elements and then pass
          that ref so that the context2d can be used too. By setting the canvas
          to position absolute and then using the useResizeObserver to match its
          dimensions to the SVG, I was able to use it in the background without
          having to show it.
        </p>
        <p>
          The code works in that the HexAtlas takes the world topo data from the
          useWorldAtlas hook as well as an array of countries and values. The
          countries are matched with their M49 code which can be used with the
          atlas to select specific countries by their id.
        </p>
        <p>
          The magic happens in the <code>hex_points()</code> where the context
          from the canvasRef is used to draw the map and the use the
          <code>context.isPointInPath()</code> to match any{' '}
          <code>hexbin.center()</code> and filter out the others. By calling
          this funtions with an array of M49 codes, we can alternate between the
          full map or just parts of it. This allows D3 to render differnt
          versions of the hexagons and manipulate the attr such as colour for
          data visualizations.
        </p>
      </div>
    </div>
  );
};

export default JustD3;
