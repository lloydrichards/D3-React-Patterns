import {useState, useEffect} from "../../../../snowpack/pkg/react.js";
import {json} from "../../../../snowpack/pkg/d3.js";
import {feature, mesh} from "../../../../snowpack/pkg/topojson.js";
const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
export const useWorldAtlas = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    json(jsonUrl).then((topology) => {
      const {countries, land} = topology.objects;
      setData({
        land: feature(topology, land),
        countries: {
          ...feature(topology, countries),
          id: feature(topology, countries)
        },
        interiors: mesh(topology, countries, (a, b) => a !== b)
      });
    });
  }, []);
  return data;
};
