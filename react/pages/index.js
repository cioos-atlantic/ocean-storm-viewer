// https://www.freecodecamp.org/news/best-practices-for-security-of-your-react-js-application/

// Checkout DOMPurify for security https://github.com/cure53/DOMPurify
// used with dangerouslySetInnerHTML()

// URL Validation:
// function validateURL(url) {
// 	const parsed = new URL(url)
// 	return ['https:', 'http:'].includes(parsed.protocol)
// }
// <a href={validateURL(url) ? url : ''}>This is a link!</a>


import { useRouter } from 'next/router'
import queryString from 'query-string';
import Layout from '../components/layout'
import { basePath } from '@/next.config';

const top_nav = [
  { name: "Home", href: basePath },
  { name: "Active Storms", href: basePath + "?storms=active" },
  { name: "Active Storms (new)", href: basePath + "/active_storms" },
  { name: "Historical Storms", href: basePath + "?storms=historical" },
  { name: "Historical Storms (new)", href: basePath + "/historical_storms" },
  { name: "About Hurricanes", href: basePath + "?storms=hurricanes" },
  { name: "About Hurricanes (new)", href: basePath + "/about" },
]

const logo = {
  src: `${basePath}/cioos-atlantic_EN.svg`,
  alt: "CIOOS Atlantic - Hurricane Dashboard",
  href: "https://cioosatlantic.ca/"
}

export default function StormDashboard() {
  const router = useRouter()
  const qs = queryString.parseUrl(process.env.BASE_URL + router.asPath)

  return (
    <Layout
      topNav={top_nav}
      logo={logo}
      querystring={qs}
    ></Layout>
  )
}
