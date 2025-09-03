import SiteHeader from "./ui/SiteHeaader"
import LinkList from "./ui/LinkList"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="p-6 max-w-xl w-full mx-auto flex flex-col gap-6">
        <LinkList />
      </main>
    </>
  )
}
