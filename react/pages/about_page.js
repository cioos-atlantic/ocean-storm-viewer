import React from 'react';
import Head from 'next/head';
import { siteTitle } from '@/components/layout';
import aboutStyles from '../styles/About.module.css';
import Image from "next/image";
import { pastAtlStorms } from '@/data/pastStormsDetails';
import parse from 'html-react-parser';
import { faq } from '@/data/faq';

export function About(){
  return(
    <div className={aboutStyles.container}>
            <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn more about the Atlantic Hurricane Dashboard, its purpose, and the team behind it."
        />
        <meta name="og:title" content={siteTitle} />
        <title>About - {siteTitle}</title>
      </Head>
      <main className={aboutStyles.mainContent}>
        <section className={aboutStyles.aboutSection}>
          <h1>Table of Content</h1>
            <ul>
              <a href="#section1" aria-label="Go to Extreme Storms and Hurricanes section">1. Extreme Storms and Hurricanes</a>
              <ul>
                {faq.map((question, index) => (
                  <li key={index}>
                    <a href={`#section1.${index}`}>{question.title}</a>
                  </li>
                ))}
              </ul>
            </ul>

            <ul>
              <a href="#section2" aria-label="Go to Some Past Atlantic Canada Storms section">2. Some Past Atlantic Canada Storms</a>
              <ul>
                {pastAtlStorms.map((storm, index) => (
                    <li key={index}>
                      <a href={`#section2.${index}`}>{storm.title}</a>
                    </li>
                  ))}
              </ul>
            </ul>

            <ul>
              <a href="#section3" aria-label="Go to How to Find more Information section">3. How to Find more Information</a>
            </ul>


          <h2 id="section1">1. Extreme Storms and Hurricanes</h2>
          <ul>
            {faq.map((question, index) => (
              <div key={index}>
                <h3 className={aboutStyles.subheading} id={`section1.${index}`}>
                  {question.title}
                </h3>
                <div className={aboutStyles.lightText}>{parse(question.details)}</div>
                <br></br>
              </div>
            ))}
          </ul>
        

        <h2  id="section2">2. Some Past Atlantic Canada Storms</h2>
        <ul>
          <p>
          Learn more about each storm and go to that specific past time frame and see data from that storm that exists within our application. 
          </p>
          {pastAtlStorms.map((storm, index) => (
            <div key={index}>
              <h3 className={aboutStyles.subheading} id={`section2.${index}`}
              onClick={() =>{console.log(`${storm.title} clicked`)}}>
                {storm.title}
              </h3>
              <div className={aboutStyles.lightText}>{parse(storm.details)}</div>
              <br></br>
              <figure className={aboutStyles.imageContainer}>
                <Image
                  src={storm.img}
                  alt={storm.imgAlt}
                  className={aboutStyles.aboutPageImg}
                  width={350}
                  height={315}
                  layout="intrinsic"
                />
                <figcaption className={aboutStyles.imageCaption}>{parse(storm.imgCaption)}</figcaption>
              </figure>
            </div>
          ))}
        </ul>

        <h2 id="section3">3. How to Find more Information</h2>
        <ul>
          <li>
            <a href= "https://en.wikipedia.org/wiki/List_of_hurricanes_in_Canada " target="_blank" rel="noopener noreferrer" aria-label="Learn about hurricanes in Canada on Wikipedia">
              Hurricanes in Canada 
            </a>
          </li>
          <li>
            <a href= "https://www.nspower.ca/about-us/articles/details/articles/2022/11/29/you-asked-we-answer-extreme-weather-and-our-power-grid" target="_blank" rel="noopener noreferrer" aria-label="Learn more about extreme weather and power grids on Nova Scotia Power Blog">
              Nova Scotia Power Blog 
            </a>
          </li>
        </ul>

        </section>
      </main>
    </div>
  )
}


async function getStormDetails(storm){
  console.log('Button clicked for', storm.name);
  const storm_name = storm.name;
  const storm_year = storm.year;

  const query = new URLSearchParams({
    name: storm_name,
    season: storm_year,      // Using season for storm year
  }).toString();
    try {
      const resource = await fetch(`/api/historical_storms?${query}`);
      const storm_data = await resource.json();
  
      const station_resource = await fetch(`/api/query_stations_historical?${query}`);
      const historical_station_data = await station_resource.json();
  
      //console.log(Leaflet);
  
      const historical_storm_data = parseStormData(storm_data, storm.name, map, Leaflet);
      //console.log(historical_storm_data);
  
      console.debug("Historical Storm Data: ", historical_storm_data);
      console.debug("Historical Station Data: ", historical_station_data);
  
      setStormPoints(historical_storm_data);  // Set the storm data
      setStationPoints(historical_station_data);  // Set the station data
      
    
     
    } catch (error) {
      console.error('Error fetching storm:', error);
    }
}