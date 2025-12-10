import Header from '../components/Header'
import Footer from '../components/Footer'
import MapView from '../components/MapView'
import fetcher from '../lib/fetcher'
import { useEffect, useState } from 'react'

export default function MapPage() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetcher('/api/report/list').then(r => setReports(r.reports || []))
  }, [])

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-primary">Peta Laporan Banjir</h2>
        <div className="mt-4">
          <MapView reports={reports} />
        </div>
      </main>
      <Footer />
    </>
  )
}
