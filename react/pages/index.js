import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from './parts/page_header';
import PageFooter from './parts/page_footer';
import dynamic from 'next/dynamic';
import { basePath } from '@/next.config';

export default function ActiveStormsPage() {
  const [station_points, setStationPoints] = useState({});

  // useMemo() tells React to "memorize" the map component.
  // Without this, the map will get redrawn by many interactions 
  // and cause flashing - this lets us update map layers without
  // the map constant flashing with each change and click.
  const MapWithNoSSR = useMemo(
    () => (dynamic(() => import("../components/map"), {
      ssr: false
    })),
    [],
  );

  useEffect(() => {
    fetch(`${basePath}/api/query_stations`)
      .then((res) => res.json())
      .then((data) => {
        setStationPoints(data);
      })
  }, []);

  return (
    <>
      <PageHeader
        page_description={"Displays storms that are currently in progress and being monitored."}
        page_subtitle={"Active Storms"}
      />
      <main className="body">

        <MapWithNoSSR
          station_data={station_points}
          source_type={"active"}
          setStationPoints={setStationPoints}
        />

      </main>
      <PageFooter />
    </>
  );
}
