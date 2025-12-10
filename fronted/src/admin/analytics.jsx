import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useEffect, useState } from 'react'
import fetcher from '../../lib/fetcher'

export default function Analytics() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetcher('/api/report/list').then(r => setReports(r.reports || []))
  }, [])

  const total = reports.length
  const heavy = reports.filter(r => r.severity === 'HEAVY').length
  const verified = reports.filter(r => r.verified).length

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-primary">Analytics</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="text-sm text-gray-600">Total reports</div>
            <div className="text-2xl font-bold">{total}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="text-sm text-gray-600">Heavy</div>
            <div className="text-2xl font-bold">{heavy}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="text-sm text-gray-600">Verified</div>
            <div className="text-2xl font-bold">{verified}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
