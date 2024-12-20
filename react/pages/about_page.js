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
              <a href="#section1">1. Extreme Storms and Hurricanes</a>
              <ul>
                <li><a href="#section1.1">What are extreme storms and hurricanes?</a></li>
                <li><a href="#section1.2">How do they form?</a></li>
                <li><a href="#section1.3">How are they defined?</a></li>
                <li><a href="#section1.4">Land vs ocean characteristics</a></li>
                <li><a href="#section1.5">How do they move?</a></li>
                <li><a href="#section1.6">What are the effects?</a></li>
                <li><a href="#section1.7">Severe storms and climate change</a></li>
              </ul>
            </ul>
            <ul>
              <a href="#section2">2. Some Past Atlantic Canada Storms</a>
              <ul>
              <li><a href="#section2.1">Hurricane Juan 2003</a></li>
              <li><a href="#section2.2">Hurricane Dorian 2019</a></li>
              <li><a href="#section2.3">Hurricane Fiona 2022</a></li>
              </ul>
              </ul>
            <ul>
              <a href="#section3">3. How to Find more Information</a>
              </ul>

          <h3 id="section1">1. Extreme Storms and Hurricanes</h3>
          <ul>
          <h3 className={aboutStyles.subheading} id="section1.1">What are extreme storms and hurricanes?</h3>
          <p className={aboutStyles.lightText}>
          Extreme storms are low pressure tropical cyclones with wind speeds of at least 62km/h. A hurricane is a type of extreme storm that has wind speeds of at least 120km/h. (<a href="https://oceanservice.noaa.gov/facts/hurricane.html" >NOAA</a>)
          </p>
          <h3 className={aboutStyles.subheading} id="section1.2">How do they form?</h3>
          <p className={aboutStyles.lightText}>
          Hurricanes begin when thunderstorms circle around an area of low air pressure over the ocean. Warm water (above 26C) provides heat and energy for the air pressure to transfer the hot, humid air upwards in a spiral shape. As that warm air rises it condenses into storm clouds, which get stronger and faster as the low-pressure cyclone travels (<a href="https://kids.nationalgeographic.com/science/article/hurricane">National Geographic</a>). 
          </p>
          <h3 className={aboutStyles.subheading} id="section1.3">How are they defined?</h3>
          <div className={aboutStyles.lightText}>
            <div>
            Hurricanes are classified using the Saffir-Simpson Hurricane Wind Scale, a 1-5 category rating based on the hurricane’s maximum wind speed. The higher the category, the greater the hurricane’s potential damage. The scale does not consider other hazards of hurricanes, such as storm surge and rainfall (<a href="https://www.nhc.noaa.gov/aboutsshws.php" >NOAA</a>). 
            <ul>
            <li>Category 1: 119-153km/h</li>
            <li>Category 2: 154-177km/h</li>
            <li>Category 3: 178-208km/h</li>
            <li>Category 4: 209-251km/h</li>
            <li>Category 5: 252km/h or higher </li>
         </ul>

            </div>
          
          </div>
         
         <br></br>
            
          
          <h3 className={aboutStyles.subheading} id="section1.4">Land vs ocean characteristics</h3>
          <p className={aboutStyles.lightText}>
          As a hurricane hits land, it loses the water that fuels it, and it begins to weaken. But dangerous winds and heavy rain can still cause damage. 
          </p>
          <h3 className={aboutStyles.subheading} id="section1.5">How do they move?</h3>
          <p className={aboutStyles.lightText}>
          Meteorologists can predict the path of a hurricane by analyzing temperature changes, cloud formations, and air circulation patterns. Data is gathered from both the sky and the sea using specialized instruments. The information from these tools can be used to create forecasting models to learn where a storm is forming, where it might travel, and how severe it will be. (<a href="https://kids.nationalgeographic.com/science/article/hurricane">National Geographic</a>). 
          </p>
          <h3 className={aboutStyles.subheading} id="section1.6" >What are the effects?</h3>
          <p className={aboutStyles.lightText}>
          Hurricanes are one of nature’s most powerful storms. They produce strong winds, storm surge flooding, and heavy rainfall that can lead to inland flooding, tornadoes, coastal erosion, and rip currents (<a href="https://www.noaa.gov/education/resource-collections/weather-atmosphere/hurricanes#:~:text=They%20produce%20strong%20winds%2C%20storm,%2C%20tornadoes%2C%20and%20rip%20currents." >NOAA</a>).  Hurricanes can change the shape and form of our coasts, thereby affecting the water quality by spreading contaminants (<a href="https://www.queensu.ca/gazette/stories/climate-change-means-atlantic-canada-will-see-more-frequent-storms" >Queens University</a>). 
          </p>
          <h3 className={aboutStyles.subheading} id="section1.7">Severe storms and climate change</h3>
          <p className={aboutStyles.lightText}>
          Climate change is expected to increase the frequency and severity of hurricanes. As ocean temperatures rise, future hurricanes will be more powerful. 
          </p>
          <p>
          Links to Resource Web Pages that go into more detail, or to use instead of the general text above:
          </p>
          </ul>
          

          <h2  id="section2">2. Some Past Atlantic Canada Storms</h2>
          <ul>
          <p>
          Learn more about each storm and go to that specific past time frame and see data from that storm that exists within our application. 
          </p>
          {pastAtlStorms.map((storm, index) => (
            <div key={index}>
              <h3 className={aboutStyles.subheading} id={`section2.${index}`}>
                {storm.title}
              </h3>
              <p className={aboutStyles.lightText}>{parse(storm.details)}</p>
              <figure className={aboutStyles.imageContainer}>
                <Image
                  src={storm.img}
                  alt={storm.imgAlt}
                  className={aboutStyles.aboutPageImg}
                  width={350}
                  height={315}
                />
                <figcaption className={aboutStyles.imageCaption}>{parse(storm.imgCaption)}</figcaption>
              </figure>
            </div>
          ))}
          </ul>




          <h2 id="section3">3. How to Find more Information</h2>
          <ul>
            <li>
              <a href= "https://en.wikipedia.org/wiki/List_of_hurricanes_in_Canada ">
                Hurricanes in Canada 
              </a>
            </li>
            <li>
              <a href= "https://www.nspower.ca/about-us/articles/details/articles/2022/11/29/you-asked-we-answer-extreme-weather-and-our-power-grid ">
                Nova Scotia Power Blog 
              </a>
            </li>
          </ul>


          
          


        </section>
      </main>
    </div>
  )
}