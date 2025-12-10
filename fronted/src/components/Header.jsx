import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/"><a className="text-primary font-semibold text-lg">BesarSafe</a></Link>
        <nav className="space-x-4">
          <Link href="/map"><a className="text-sm">Map</a></Link>
          <Link href="/report"><a className="text-sm">Report</a></Link>
          <Link href="/history"><a className="text-sm">History</a></Link>
          <Link href="/admin"><a className="text-sm">Admin</a></Link>
        </nav>
      </div>
    </header>
  )
}