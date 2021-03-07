import { extent } from 'd3';
import React from 'react';
import D3Chart from './d3Chart';
import { useData } from './Util/useData';
import './index.css';

const Muratorium = () => {
  const data = useData(
    'https://raw.githubusercontent.com/datasets/global-temp/master/data/annual.csv',
    'GCAG',
  );

  if (!data) <div>Loading...</div>;

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
        <D3Chart height={500} values={data} labels={['Year', 'Mean']} />
      </div>
      <div>
        <h2>Muratorium</h2>
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
            {`-Muratorium
--Util
---useData.tsx
---useResizeObserver.tsx
--d3Chart.tsx
--index.tsx`}
          </pre>
        </code>
        <p>
          The <code>index.tsx</code> file is the parent to the visualization and
          can deal with things like layout, texts, data fetching, state etc.
          This is quite useful for interactivity as I can pass different props
          down and even change the dataset on the go from the top component.
        </p>
        <code>
          <pre>
            {`const Muratorium = () => {
   const data = useData(
     'https://raw.githubusercontent.com/datasets/global-temp/master/data/annual.csv',
     'GCAG',
   );

   if (!data) <div>Loading...</div>;

   return (
     <div>
       <h2>Title</h2>
       <D3Chart height={500} values={data} labels={['Year', 'Mean']} />
       <p>...sources<p>
     </div>
   );
  ;

  export default Muratorium;`}
          </pre>
        </code>
        <p>
          In the actual chart component I use <code>useEffect</code> to
          initialize D3 and take control of a ref that I've stored using{' '}
          <code>useRef</code> With this, and a utility function for handeling
          window resizing, I can use D3 directly to manipulate the svg element
          that I've given it. I can also add margins and padding directly to the
          dv container.
        </p>
        <p>
          I mostly find this pattern useful for when I want to take D3 code
          found in a similar example or build in an Observable Notebook and then
          import it into a React project. Though there are still things that
          need to be corrected, especially with Typescript, it works most of the
          time.
        </p>
        <code>
          <pre>
            {`interface Props {
  height: number;
  values: Array<{
    Source: string;
    Year: string;
    Mean: string;
  }>;
  labels: [string, string];
}

const D3Chart: React.FC<Props> = ({ values, labels, height }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef<HTMLObjectElement>(null);
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    if (!values || values.length === 0) return;
    const svg = select(svgRef.current);
    if (!dimensions) return;

    // Define Scales
    const xScale = scaleTime()
      .domain(extent(values, (d) => +d.Year) as [number, number])
      .range([0, dimensions.width])
      .nice();
    const yScale = scaleLinear()
      .domain(extent(values, (d) => +d.Mean) as [number, number])
      .range([dimensions.height, 0])
      .nice();

    // Define Axis
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    // Draw Axis
    svg
      .select<SVGGElement>('.x-axis')
      .style('transform', "translate(0px, \${dimensions.height}px)")
      .attr('color', 'cadetblue')
      .call(xAxis);
    svg.select<SVGGElement>('.y-axis').attr('color', 'cadetblue').call(yAxis);
    svg
      .selectAll('.center-line')
      .data([0])
      .join('line')
      .attr('class', 'center-line')
      .attr('x1', 0)
      .attr('x2', dimensions.width)
      .attr('y1', yScale(0))
      .attr('y2', yScale(0))
      .attr('stroke', 'cadetblue')
      .attr('stroke-width', 1);

    //Draw labels
    svg
      .selectAll('.x-labels')
      .data([0])
      .join('text')
      .attr('class', 'x-labels')
      .attr(
        'transform',
        "translate(\${dimensions.width / 2}, \${dimensions.height + 40})",
      )
      .attr('fill', 'cadetblue')
      .style('text-anchor', 'middle')
      .text(labels[0]);
    svg
      .selectAll('.y-labels')
      .data([0])
      .join('text')
      .attr('class', 'y-labels')
      .attr('fill', 'cadetblue')
      .attr('transform', "translate(-30, \${dimensions.height / 2})")
      .style('text-anchor', 'end')
      .text(labels[1]);

    // Define Shapes
    const meanLine = line<{
      Source: string;
      Year: string;
      Mean: string;
    }>()
      .x((d) => xScale(+d.Year))
      .y((d) => yScale(+d.Mean))
      .curve(curveBasis);

    // Draw Marks
    svg
      .selectAll('.line')
      .data([values])
      .join('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'tomato')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', meanLine);
  }, [dimensions, values]);

  return (
    <div
      style={{ height: height, padding: '20px 20px 20px 60px' }}
      ref={wrapperRef}
    >
      <svg style={{ overflow: 'visible' }} ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default D3Chart;`}
          </pre>
        </code>
      </div>
    </div>
  );
};

export default Muratorium;
