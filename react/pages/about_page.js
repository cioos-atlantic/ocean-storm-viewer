import React from 'react';
import styles from '../components/layout.module.css';
import Head from 'next/head';
import { siteTitle } from '@/components/layout';
import utilStyles from '../styles/utils.module.css';
import Image from "next/image";


export function About(){
  return(
    <div className={utilStyles.container}>
            <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn more about the Atlantic Hurricane Dashboard, its purpose, and the team behind it."
        />
        <meta name="og:title" content={siteTitle} />
        <title>About - {siteTitle}</title>
      </Head>
      <main className={utilStyles.mainContent}>
        <section className={utilStyles.aboutSection}>
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
          <h3 className={utilStyles.subheading} id="section1.1">What are extreme storms and hurricanes?</h3>
          <p className={utilStyles.lightText}>
          Extreme storms are low pressure tropical cyclones with wind speeds of at least 62km/h. A hurricane is a type of extreme storm that has wind speeds of at least 120km/h. (<a href="https://oceanservice.noaa.gov/facts/hurricane.html" >NOAA</a>)
          </p>
          <h3 className={utilStyles.subheading} id="section1.2">How do they form?</h3>
          <p className={utilStyles.lightText}>
          Hurricanes begin when thunderstorms circle around an area of low air pressure over the ocean. Warm water (above 26C) provides heat and energy for the air pressure to transfer the hot, humid air upwards in a spiral shape. As that warm air rises it condenses into storm clouds, which get stronger and faster as the low-pressure cyclone travels (<a href="https://kids.nationalgeographic.com/science/article/hurricane">National Geographic</a>). 
          </p>
          <h3 className={utilStyles.subheading} id="section1.3">How are they defined?</h3>
          <p className={utilStyles.lightText}>
          Hurricanes are classified using the Saffir-Simpson Hurricane Wind Scale, a 1-5 category rating based on the hurricane’s maximum wind speed. The higher the category, the greater the hurricane’s potential damage. The scale does not consider other hazards of hurricanes, such as storm surge and rainfall (<a href="https://www.nhc.noaa.gov/aboutsshws.php" >NOAA</a>). 
          </p>
         <ul>
            <li>Category 1: 119-153km/h</li>
            <li>Category 2: 154-177km/h</li>
            <li>Category 3: 178-208km/h</li>
            <li>Category 4: 209-251km/h</li>
            <li>Category 5: 252km/h or higher </li>
         </ul>
         <br></br>
            
          
          <h3 className={utilStyles.subheading} id="section1.4">Land vs ocean characteristics</h3>
          <p className={utilStyles.lightText}>
          As a hurricane hits land, it loses the water that fuels it, and it begins to weaken. But dangerous winds and heavy rain can still cause damage. 
          </p>
          <h3 className={utilStyles.subheading} id="section1.5">How do they move?</h3>
          <p className={utilStyles.lightText}>
          Meteorologists can predict the path of a hurricane by analyzing temperature changes, cloud formations, and air circulation patterns. Data is gathered from both the sky and the sea using specialized instruments. The information from these tools can be used to create forecasting models to learn where a storm is forming, where it might travel, and how severe it will be. (<a href="https://kids.nationalgeographic.com/science/article/hurricane">National Geographic</a>). 
          </p>
          <h3 className={utilStyles.subheading} id="section1.6" >What are the effects?</h3>
          <p className={utilStyles.lightText}>
          Hurricanes are one of nature’s most powerful storms. They produce strong winds, storm surge flooding, and heavy rainfall that can lead to inland flooding, tornadoes, coastal erosion, and rip currents (<a href="https://www.noaa.gov/education/resource-collections/weather-atmosphere/hurricanes#:~:text=They%20produce%20strong%20winds%2C%20storm,%2C%20tornadoes%2C%20and%20rip%20currents." >NOAA</a>).  Hurricanes can change the shape and form of our coasts, thereby affecting the water quality by spreading contaminants (<a href="https://www.queensu.ca/gazette/stories/climate-change-means-atlantic-canada-will-see-more-frequent-storms" >Queens University</a>). 
          </p>
          <h3 className={utilStyles.subheading} id="section1.7">Severe storms and climate change</h3>
          <p className={utilStyles.lightText}>
          Climate change is expected to increase the frequency and severity of hurricanes. As ocean temperatures rise, future hurricanes will be more powerful. 
          </p>
          <p>
          Links to Resource Web Pages that go into more detail, or to use instead of the general text above:
          </p>
          </ul>
          

          <h3  id="section2">2. Some Past Atlantic Canada Storms</h3>
          <ul>
          <p>
          Learn more about each storm and go to that specific past time frame and see data from that storm that exists within our application. 
          </p>
          <h3 className={utilStyles.subheading} id="section2.1">Hurricane Juan 2003</h3>
          <p className={utilStyles.lightText}>
          On September 29, 2003, Juan made landfall in Nova Scotia as a Category 2 hurricane and brought 165 km/h wind speeds and 50mm of rainfall. (<a href="https://www.cbc.ca/news/canada/nova-scotia/hurricane-juan-dorian-fiona-comparisons-1.6593214" >CBC</a>) The storm traveled north through the province, arriving in Prince Edward Island as a marginal hurricane. In Nova Scotia, weather buoys recorded waves higher than 20m and storm surges of 2m (<a href="https://www.theweathernetwork.com/ca/news/article/this-day-in-weather-history-september-29-2003-juan-batters-the-maritimes" >Weather Network</a>). The hurricane cost an estimated $192 million in structural and vegetation damage across Nova Scotia and Prince Edward Island (<a href="https://www.cbc.ca/news/canada/nova-scotia/fiona-atlantic-canada-insured-damages-660-million-1.6621583#:~:text=The%20storm%20made%20landfall%20in,several%20deaths%2C%20the%20IBC%20said." >CBC</a>). Halifax Regional Municipality was hit particularly hard, receiving extensive damage to trees and power lines. Between 800,000 and 900,000 people lost their power during the storm. 
          </p>
          <figure className={utilStyles.imageContainer}>
            <Image
              src="/about_page/hurricane_juan_2003.svg"
              alt="Storm surge from Hurricane Juan (2003)"
              className={utilStyles.aboutPageImg}
              width={350}
              height={350}
            />
            <figcaption className={utilStyles.imageCaption}>
              <div>
              Storm surge from Hurricane Juan (2003) washed rail cars into Halifax Harbour.
              </div>
              <div>
              © Environment Canada, 2003 Photo: Roger Percy and Andre Laflamme
              </div>
              
            </figcaption>
          </figure>

          <h3 className={utilStyles.subheading} id="section2.2">Hurricane Dorian 2019</h3>
          <p className={utilStyles.lightText}>
          Dorian hit Atlantic Canada on September 7, 2019 as a Category 2 hurricane with wind speeds of 155km/h and 140mm of rain. (<a href="https://www.cbc.ca/news/canada/nova-scotia/hurricane-juan-dorian-fiona-comparisons-1.6593214" >CBC</a>) The storm’s path and transition over land caused the winds to spread out from the center of the storm, becoming much wider than Juan. With a track from southwest to northeast directly through the centre of the Maritimes, the rain and wind impacts were more far reaching than but less severe (<a href="https://www.cbc.ca/news/canada/nova-scotia/snoddon-tropical-weather-1.5277600" >CBC</a>). The hurricane caused damage throughout the Maritimes, including a crane collapse in Halifax and more than 500,000 people without power. Damage was estimated at $102 million.
          </p>
          <figure className={utilStyles.imageContainer}>
            <Image
              src="/about_page/hurricane_dorian_2019.svg"
              alt="Storm surge from Hurricane Juan (2003)"
              className={utilStyles.aboutPageImg}
              width={350}
              height={350}
            />
            <figcaption className={utilStyles.imageCaption}>
              <div>
              A shed in Herring Cove shows the impact of the storm. (David Burke/CBC)
              </div>
              
            </figcaption>
          </figure>
          <h3 className={utilStyles.subheading} id="section2.3">Hurricane Fiona 2022</h3>
          <p className={utilStyles.lightText}>
          Fiona hit Atlantic Canada on September 24, 2022 as a Category 2 hurricane with wind speeds of 160km/h and 100mm of rain. Fiona caused $660 million in damage across Atlantic Canada, making it the most costly extreme weather event ever recorded in Atlantic Canada (<a href="https://www.cbc.ca/news/canada/nova-scotia/fiona-atlantic-canada-insured-damages-660-million-1.6621583" >CBC</a>). The storm had an atmospheric pressure of 931.6mb - which is the lowest ever recorded in Canada. Offshore, wave heights reached 17m (<a href="https://www.queensu.ca/gazette/stories/climate-change-means-atlantic-canada-will-see-more-frequent-storms" >Queens University</a>). More than 500,000 people were left without power in the Maritimes. The storm also washed at least 20 homes into the ocean, primarily in Port aux Basques, N.L (<a href="https://www.cbc.ca/news/canada/nova-scotia/fiona-atlantic-canada-insured-damages-660-million-1.6621583#:~:text=The%20storm%20made%20landfall%20in,several%20deaths%2C%20the%20IBC%20said." >CBC</a>). 
          </p>
          <figure className={utilStyles.imageContainer}>
            <Image
              src="/about_page/hurricane_fiona_2022.svg"
              alt="Storm surge from Hurricane Juan (2003)"
              className={utilStyles.aboutPageImg}
              width={350}
              height={350}
            />
            <figcaption className={utilStyles.imageCaption}>
              <div>
              Footage shot over Port aux Basques, N.L., shows the damage caused by post-tropical storm Fiona. (CBC)

              </div>
              
            </figcaption>
          </figure>
          </ul>




          <h3 id="section3">3. How to Find more Information</h3>
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