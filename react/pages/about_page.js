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
                {faq.map((question, index) => (
                  <li key={index}>
                    <a href={`#section1.${index}`}>{question.title}</a>
                  </li>
                ))}
              </ul>
            </ul>

            <ul>
              <a href="#section2">2. Some Past Atlantic Canada Storms</a>
              <ul>
                {pastAtlStorms.map((storm, index) => (
                    <li key={index}>
                      <a href={`#section1.${index}`}>{storm.title}</a>
                    </li>
                  ))}
              </ul>
            </ul>

            <ul>
              <a href="#section3">3. How to Find more Information</a>
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
              <h3 className={aboutStyles.subheading} id={`section2.${index}`}>
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