import { line, curveMonotoneX } from 'd3';
import 'React';

interface LineProps {
  data: any;
  xScale: any;
  yScale: any;
  yAccessor: any;
  xAccessor: any;
}
export default function Lines({
  data,
  xScale,
  yScale,
  yAccessor,
  xAccessor,
}: LineProps) {
  const xAccessorScaled = (d: any) => xScale(xAccessor(d));
  const yAccessorScaled = (d: any) => yScale(yAccessor(d));

  console.log('line component');
  const lineGenerator = line<{
    date: Date;
    population: number;
    country: string;
    code: string;
  }>()
    .x(xAccessorScaled)
    .y(yAccessorScaled);
  // .curve(curveMonotoneX);
  return <path className="Line" d={lineGenerator(data) || '{}'} />;
}
