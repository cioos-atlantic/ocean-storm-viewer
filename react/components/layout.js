import React, { useState, useMemo, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import Link from 'next/link'
import HeaderNav from './header_nav'
import FooterNav from './footer_nav'
import StormSearch from "@/components/storm_search";
import { useRouter } from 'next/router';

import { empty_storm_obj } from '../lib/storm_utils';
import dynamic from "next/dynamic";

import ErddapHandler from "../pages/api/query_stations";
import About from "@/pages/about_page";
import Grid from '@mui/material/Grid2';




export const siteTitle = 'Atlantic Hurricane Dashboard'


export const empty_station_obj = {
  pts: { features: [] }
};

// export const empty_station_obj = {pts:[]};

/**
 * The Layout function in JavaScript sets up a webpage layout with header, main content, and footer,
 * displaying different content based on query parameters.
 * @returns The `Layout` component is being returned. It includes the structure of the webpage with a
 * header, main content area (which may include a map component based on the conditions), and a footer.
 * The content and components rendered within the `Layout` component depend on the values of `home`,
 * `topNav`, `logo`, `active_storm_data`, `station_data`, and `querystring`
 */
export default function Layout({ children, home, topNav, logo, active_storm_data, station_data, querystring }) {

  const [storms, setStorms] = useState([]);
  const [selected_forecast, setSelectedForecast] = useState({});
  const [storm_timeline, setStormTimeline] = useState([]);
  const [storm_points, setStormPoints] = useState(empty_storm_obj);
  const [station_points, setStationPoints] = useState(station_data);
  const [historicalStormData, setHistoricalStormData] = useState(empty_storm_obj); // State for storing historical storm data

  const router = useRouter();

  const active_storms = querystring.query.storms == "active";
  const historical_storms = querystring.query.storms == "historical";
  const about_page = querystring.query.storms == "hurricanes";

  //const allDatasetDescriptions = useDatasetDescriptions();
  //console.log(allDatasetDescriptions);
  

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

  let storm_data_pass = {};
  let source_type = "";

  if (active_storms) {
    storm_data_pass = active_storm_data;
    source_type = "active";
  }

  if (historical_storms) {
    storm_data_pass = historicalStormData;
    source_type = "historical";
    console.debug("Historical Storm Data in Layout.js: ", historicalStormData);
  }
  
  console.debug("Storm_data_pass in Layout.js: ", storm_data_pass);

  return (
    <div className={styles.body}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content=""
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        <Grid container alignItems="center" spacing={1}  
        sx={{ justifyContent: 'space-between', flexWrap: 'nowrap',  maxHeight: { xs: '80px', sm: '100px', md: '120px', lg: '140px' } // Responsive max height for the header 
        }}
        >
          {/* Logo Section */}
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} >
            <a href={logo.href}>
              <Image
                src={logo.src}
                width={200}
                height={100}
                className="logo" // Preserving your existing class for the logo
                alt="logo"
                style={{
                  maxWidth: '100%', // Ensures responsiveness
                }}
              />
            </a>
          </Grid>

          {/* Content Section */}
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
>
            {home ? (
              <>
                {/* Home Page Header Content */}
              </>
            ) : (
              <>
                {/* Other Page Header Content */}
              </>
            )}
          </Grid>

          {/* Navigation Section */}
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3} xxl={2}
          sx={{
            maxWidth: '100%', // Ensures responsiveness
            overflow: 'visible', // 
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1, // Adds spacing between navigation items
            fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '20px', xxl: '22px' }, // Font size changes based on breakpoints
          }}>
            <HeaderNav navItems={topNav} />
          </Grid>
        </Grid>
      </header>
      {about_page ? (
        <About
            
            />):(<>
      <main className="body">
        <MapWithNoSSR
          storm_points={storm_points}
          storm_data={storm_data_pass}
          station_data={station_points}
          source_type={source_type}
          setStormPoints={setStormPoints}
          setStationPoints={setStationPoints}
        />
      </main>
      </>)}
      <footer>
        <FooterNav></FooterNav>
      </footer>
    </div>
  )
}
