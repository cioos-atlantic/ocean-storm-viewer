import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/newglobals.css'
import '@/styles/404.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
