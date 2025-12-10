import Link from 'next/link'
export default function FloatingButton() {
  return (
    <div className="fixed bottom-6 right-6">
      <Link href="/report">
        <a className="bg-primary text-white p-4 rounded-full shadow-xl inline-flex items-center justify-center">
          + Report
        </a>
      </Link>
    </div>
  )
}
