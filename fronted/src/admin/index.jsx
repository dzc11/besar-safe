import Header from '../../components/Header'
import Link from 'next/link'
import Footer from '../../components/Footer'

export default function AdminHome() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-primary">Admin Dashboard</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/reports"><a className="bg-white p-4 rounded-xl shadow">View Reports</a></Link>
          <Link href="/admin/analytics"><a className="bg-white p-4 rounded-xl shadow">Analytics</a></Link>
          <div className="bg-white p-4 rounded-xl shadow">Settings (soon)</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
