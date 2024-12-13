import React from 'react';
import styles from '../components/layout.module.css';
import Head from 'next/head';
import { siteTitle } from '@/components/layout';
import utilStyles from '../styles/utils.module.css';

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
          <h1 className={utilStyles.headingXl}>About the Atlantic Hurricane Dashboard</h1>
          <p className={utilStyles.lightText}>
            The Atlantic Hurricane Dashboard provides real-time and historical data on hurricanes in the Atlantic region.
            Our mission is to equip researchers, meteorologists, and the public with accurate, accessible information
            about storms and their impacts.
          </p>
          <h2 className={utilStyles.headingLg}>Features</h2>
          <ul className={utilStyles.list}>
            <li>Interactive maps with real-time storm tracking.</li>
            <li>Access to historical hurricane data for analysis.</li>
            <li>Data visualizations to understand storm trajectories and impacts.</li>
          </ul>
          <h2 className={utilStyles.headingLg}>Our Team</h2>
          <p className={utilStyles.lightText}>
            This project is developed by a dedicated team of data scientists, meteorologists, and software engineers
            passionate about improving hurricane awareness and preparedness.
          </p>
        </section>
      </main>
    </div>
  )
}