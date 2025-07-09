import React, { useState, useEffect, useMemo } from 'react';
import Layout from './layout';
import dynamic from 'next/dynamic';
import { basePath } from '@/next.config';

export default function HistoricalStormsPage() {
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

    // useEffect(() => {
    //     fetch(`${basePath}/api/query_stations`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setStationPoints(data);
    //         })
    // }, []);

    return (
        <Layout
            page_description={"Allows the user to search for historical storms and explore the recorded weather data from coastal stations and platforms during that time period."}
            page_subtitle={"Historical Storms"}
        >
            <MapWithNoSSR
                station_data={station_points}
                source_type={"historical"}
                setStationPoints={setStationPoints}
            />
        </Layout>
    )
}