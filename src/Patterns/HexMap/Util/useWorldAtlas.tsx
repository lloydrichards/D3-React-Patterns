import { json } from "d3";
import type { Feature, FeatureCollection, Geometry, MultiPolygon, Polygon } from "geojson";
import { useEffect, useState } from "react";
import { feature } from "topojson";

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useWorldAtlas = () => {
  const [data, setData] =
    useState<{
      land: Feature<Geometry | null>;
      countries: Array<Feature<Polygon | MultiPolygon | null>>;
    } | null>(null);

  useEffect(() => {
    json(jsonUrl).then((topology: any) => {
      const { countries, land } = topology.objects;
      setData({
        land: (feature(topology, land) as unknown as FeatureCollection)
          .features[0],
        countries: (
          feature(topology, countries) as unknown as FeatureCollection<Polygon | MultiPolygon>
        ).features,
      });
    });
  }, []);

  return data;
};
