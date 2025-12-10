import Header from '../components/Header'
import Footer from '../components/Footer'
import MapView from '../components/MapView'
import FloatingButton from '../components/FloatingButton'
import fetcher from '../lib/fetcher'
import { useEffect, useState } from 'react'

export default function Home() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetcher('/api/report/list').then(r => setReports(r.reports || []))
  }, [])

  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-primary">Selamat datang di BesarSafe</h1>
        <p className="text-gray-600 mt-2">Lapor banjir cepat — data crowdsourced untuk Kelurahan Besar</p>

        <div className="mt-6">
          <MapView reports={reports} />
        </div>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold">How to report</h3>
            <ol className="list-decimal pl-5 text-sm text-gray-600 mt-2">
              <li>Open form</li>
              <li>Fill house number, severity, water level, attach photo</li>
              <li>Submit — your report goes to admin for verification</li>
            </ol>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold">Recent reports</h3>
            <div className="mt-2 space-y-3">
              {reports.slice(0,3).map(r => (
                <div key={r.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    {r.photoUrl ? <img src={r.photoUrl} alt="p" className="w-full h-full object-cover"/> : null}
                  </div>
                  <div>
                    <div className="text-sm font-medium">No. {r.houseNumber}</div>
                    <div className="text-xs text-gray-500">{r.severity} · {r.waterLevel} cm</div>
                  </div>
                </div>
              ))}
              {reports.length === 0 && <div className="text-sm text-gray-500">No reports yet</div>}
            </div>
          </div>
        </section>

      </main>
      <FloatingButton />
      <Footer />
    </div>
  )
}
