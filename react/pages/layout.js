import PageHeader from "./parts/page_header"
import PageFooter from "./parts/page_footer"
import { loadSpace } from "@usersnap/browser";

export default function Layout({ children, page_subtitle, page_description }) {

  const spaceKey = 'dbba29d9-e060-4d56-8a09-923ef07e516d'
  // Will need to find some better way to store as secret

  useEffect(() => {
    loadSpace(spaceKey).then((api) => {
      api.init()
    })
  })
  
  return (
    <>
      <PageHeader
        page_description={ page_description }
        page_subtitle={ page_subtitle }
      />
      <main className="body">
        { children }
      </main>
      <PageFooter />
    </>
  )
}
