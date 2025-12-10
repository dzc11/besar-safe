import Header from '../../components/Header'
import Footer from '../../components/Footer'
import fetcher from '../../lib/fetcher'
import { useEffect, useState } from 'react'

export default function AdminReports() {
  const [reports, setReports] = useState([])
  const [filter, setFilter] = useState({ severity: '', rw: '', dateFrom: '', dateTo: '' })

  useEffect(() => {
    fetcher('/api/report/list').then(r => setReports(r.reports || []))
  }, [])

  async function verify(id, v) {
    await fetch('/api/admin/verify', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, verified: v })
    })
    setReports(reports.map(r => r.id === id ? {...r, verified: v} : r))
  }

  const filtered = reports.filter(r => {
    if (filter.severity && r.severity !== filter.severity) return false
    if (filter.rw && r.rw !== filter.rw) return false
    if (filter.dateFrom && new Date(r.createdAt) < new Date(filter.dateFrom)) return false
    if (filter.dateTo && new Date(r.createdAt) > new Date(filter.dateTo)) return false
    return true
  })

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-primary">Manage Reports</h2>

        <div className="mt-4 bg-white p-4 rounded-xl shadow">
          <div className="flex gap-2">
            <select onChange={e => setFilter({...filter, severity: e.target.value})} className="border rounded p-2">
              <option value="">All severities</option>
              <option value="HEAVY">Heavy</option>
              <option value="MEDIUM">Medium</option>
              <option value="LIGHT">Light</option>
              <option value="NONE">None</option>
            </select>
            <input placeholder="RW" onChange={e => setFilter({...filter, rw: e.target.value})} className="border rounded p-2" />
            <input type="date" onChange={e => setFilter({...filter, dateFrom: e.target.value})} className="border rounded p-2" />
            <input type="date" onChange={e => setFilter({...filter, dateTo: e.target.value})} className="border rounded p-2" />
          </div>

          <div className="mt-4 overflow-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">House</th>
                  <th className="text-left p-2">Severity</th>
                  <th className="text-left p-2">Water level</th>
                  <th className="text-left p-2">RW</th>
                  <th className="text-left p-2">Created</th>
                  <th className="text-left p-2">Photo</th>
                  <th className="text-left p-2">Verified</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-t">
                    <td className="p-2">{r.houseNumber}</td>
                    <td className="p-2">{r.severity}</td>
                    <td className="p-2">{r.waterLevel} cm</td>
                    <td className="p-2">{r.rw}</td>
                    <td className="p-2">{new Date(r.createdAt).toLocaleString()}</td>
                    <td className="p-2">{r.photoUrl ? <img src={r.photoUrl} alt="" className="w-20 h-12 object-cover rounded"/> : '-'}</td>
                    <td className="p-2">
                      {r.verified ? <button onClick={() => verify(r.id, false)} className="bg-red-600 text-white px-3 py-1 rounded">Unverify</button> :
                        <button onClick={() => verify(r.id, true)} className="bg-green-600 text-white px-3 py-1 rounded">Verify</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-sm text-gray-500 p-4">No reports match filters</div>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
