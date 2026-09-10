import Navbar from "./navbar"

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-[72px] flex items-center bg-white/90 backdrop-blur-md border-b border-navy/10 shadow-[0_1px_2px_rgba(27,42,74,0.05)]">
      <div className="w-full px-4 xl:px-0 max-w-7xl mx-auto">
        <Navbar />
      </div>
    </header>
  )
}
