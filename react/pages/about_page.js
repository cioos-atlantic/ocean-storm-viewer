import React, {useLocation, useHistory} from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { siteTitle } from '@/components/layout';
import aboutStyles from '../styles/About.module.css';
import Image from "next/image";
import { pastAtlStorms } from '@/data/pastStormsDetails';
import parse from 'html-react-parser';
import { faq } from '@/data/faq';


/**
* The About component is responsible for rendering the About page of the Atlantic Hurricane Dashboard.
* It includes sections for extreme storms and hurricanes, past Atlantic Canada storms, and how to find more information.
*/

export default function About(){
  const router = useRouter();

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
              aria-label={`Learn more about the storm: ${storm.title}`}
              role="button"
              tabIndex="0"
              onClick={() =>{console.log(`${storm.title} clicked`)
                              handleClick(storm.name, storm.year, router)}}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick(storm.name, storm.year, router);
                }
                }}> 
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


/**
 * Handles the click event on a past Atlantic Canada storm's title.
 * It constructs a URL with the storm's name and year, and navigates to that URL using the provided router.
 
 */

function handleClick(stormName, stormYear, router){
  const url = `/?storms=historical&name=${stormName}&season=${stormYear}`;
  router.push(url);
}