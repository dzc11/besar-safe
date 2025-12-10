import Header from '../components/Header'
import Footer from '../components/Footer'
import fetcher from '../lib/fetcher'
import { useEffect, useState } from 'react'
import ReportCard from '../components/ReportCard'

export default function History() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetcher('/api/report/list').then(r => setReports(r.reports || []))
  }, [])

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-primary">History of your reports</h2>
        <div className="mt-4 space-y-3">
          {reports.map(r => <ReportCard key={r.id} r={r} />)}
          {reports.length === 0 && <div className="text-gray-500">No reports yet</div>}
        </div>
      </main>
      <Footer />
    </>
  )
}