import React, { useState, useEffect, useMemo } from 'react';
import Layout from './layout';
import dynamic from 'next/dynamic';
import { basePath } from '@/next.config';
import { getHistoricalStormList } from '@/components/historical_storm/historical_storm_utils';

/* 
TODO: Add calls for recent storms (if there is no query string/filter supplied)
Pass down filtered storms and station data to map components for proper rendering
*/

export default function HistoricalStormsPage() {
  const [station_points, setStationPoints] = useState({});
  const [stormList, setStormList] = useState([]);

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

  // Fetch storm data using filters or the last year (if no filters specified)
  // TODO: Add historical storm filters to this block and logic to decide when to use which list
  useEffect(() => {
    async function fetchStormData() {
      try {
        const fetchedStormList = await getHistoricalStormList();
        setStormList(fetchedStormList);
      } catch (error) {
        console.error('Error fetching storm list:', error);
      }
    }

    fetchStormData();  // Call the async function
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <Layout
      page_description={"Allows the user to search for historical storms and explore the recorded weather data from coastal stations and platforms during that time period."}
      page_subtitle={"Historical Storms"}
    >
      <div className="map_container">
        <div className='inner_container'>

          <MapWithNoSSR
            station_data={station_points}
            source_type={"historical"}
            setStationPoints={setStationPoints}
          />
        </div>
      </div>

    </Layout>
  )
}