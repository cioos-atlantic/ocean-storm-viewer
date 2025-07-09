import PageHeader from "./parts/page_header"
import PageFooter from "./parts/page_footer"

export default function Layout({ children, page_subtitle, page_description }) {
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
