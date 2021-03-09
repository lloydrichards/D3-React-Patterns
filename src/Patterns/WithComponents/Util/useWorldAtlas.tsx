import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useWorldAtlas = () => {
  const [data, setData] = useState<{
    land: any;
    countries: any;
    interiors: any;
  } | null>(null);

  useEffect(() => {
    json(jsonUrl).then((topology: any) => {
      const { countries, land } = topology.objects;
      setData({
        land: feature(topology, land),
        countries: {
          ...feature(topology, countries),
          id: feature(topology, countries),
        },
        interiors: mesh(topology, countries, (a, b) => a !== b),
      });
    });
  }, []);

  return data;
};
