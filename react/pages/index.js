// https://www.freecodecamp.org/news/best-practices-for-security-of-your-react-js-application/

// Checkout DOMPurify for security https://github.com/cure53/DOMPurify
// used with dangerouslySetInnerHTML()

// URL Validation:
// function validateURL(url) {
// 	const parsed = new URL(url)
// 	return ['https:', 'http:'].includes(parsed.protocol)
// }
// <a href={validateURL(url) ? url : ''}>This is a link!</a>


// import Head from 'next/head'
import { useRouter } from 'next/router'
import queryString from 'query-string';
import Layout from '../components/layout'
// import utilStyles from '../styles/utils.module.css'
// import { getAllStormData } from '../lib/storms'

const top_nav = [
  { name: "Home", href: "/" },
  { name: "Active Storms", href: "?storms=active" },
  { name: "Historical Storms", href: "?storms=historical" },
  { name: "About Hurricanes", href: "?storms=hurricanes" },
]

const logo = {
  src: "/cioos-atlantic_EN.svg",
  alt: "CIOOS Atlantic - Hurricane Dashboard",
  href: "https://cioosatlantic.ca/"
}

export async function getServerSideProps() {
  // Get external data from the file system, API, DB, etc.
  // const forecast_sources = getAllStormData();
  let active_storm_data = {};
  let station_data = {};

  try {
    const resource = await fetch(process.env.BASE_URL + '/api/active_storms')
    active_storm_data = await resource.json();
  }
  catch (fetch_err) {
    console.log("Could not fetch storm data on load.");
  }

  try {
    const station_resource = await fetch(process.env.BASE_URL + '/api/query_stations')
    station_data = await station_resource.json();
  }
  catch (fetch_err) {
    console.log("Could not fetch station data on load.");
  }

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      active_storm_data: active_storm_data,
      station_data: station_data
    }
  }
}



export default function StormDashboard({ active_storm_data, station_data }) {
  const router = useRouter()
  const qs = queryString.parseUrl(process.env.BASE_URL + router.asPath)

  // console.log("STORM TYPE: " + qs.query.storms)

  return (
    <Layout topNav={top_nav} logo={logo} active_storm_data={active_storm_data} station_data={station_data} querystring={qs} >

    </Layout>
  )
}
