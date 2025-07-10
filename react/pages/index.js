import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { basePath } from '@/next.config';
import Layout from './layout';
import { empty_storm_obj, empty_station_obj } from '@/components/point_defaults';
import * as storm_utils from '@/lib/storm_utils'


export default function ActiveStormsPage() {
  const [station_points, setStationPoints] = useState(empty_station_obj);
  const [storm_data, setStormPoints] = useState(empty_storm_obj);


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

  // Fetch active storm data
  useEffect(() => {
    console.debug("Fetching Active Storm data...");
    fetch(`${basePath}/api/active_storms`)
      .then((res) => res.json())
      .then((active_storm_data) => {
        let storm_details = {};
        
        console.debug("Active Storm Data from /api/active_storms", active_storm_data);

        if (active_storm_data.ib_data?.features.length > 0 || active_storm_data.eccc_data?.features.length > 0) {

          active_storm_data.ib_data?.features.map(storm_point => {
            if (!(storm_point.properties.NAME in storm_details)) {
              storm_details[storm_point.properties.NAME] = {
                source: "ibtracs",
                year: storm_point.properties.SEASON,
                data: []
              }
            }

            storm_details[storm_point.properties.NAME].data.push(storm_point)
          })
        }
        console.debug("Storm Details from /api/active_storms", storm_details);

        const storm_points = storm_utils.build_ib_active_storm_features(storm_details);
        
        console.debug("Final storm points built from active storm data", storm_points);
        setStormPoints(storm_points);

        // setActiveStormLoading(false);
      })
  }, []);

  // Fetch active station data
  useEffect(() => {
    console.debug("Fetching Active Station data...");
    fetch(`${basePath}/api/query_stations`)
      .then((res) => res.json())
      .then((data) => {
        console.debug("Setting Active Station Data", data);
        setStationPoints(data);
      })
  }, []);




  return (
    <Layout
      page_description={"Displays storms that are currently in progress and being monitored."}
      page_subtitle={"Active Storms"}
    >

      <MapWithNoSSR
        station_data={station_points}
        storm_data={storm_data}
        source_type={"active"}
        setStationPoints={setStationPoints}
      />

    </Layout>
  );
}
