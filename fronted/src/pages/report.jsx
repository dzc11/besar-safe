import Header from '../components/Header'
import Footer from '../components/Footer'
import PhotoUploader from '../components/PhotoUploader'
import { useState } from 'react'
import fetcher from '../lib/fetcher'
import { useRouter } from 'next/router'

export default function ReportPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    houseNumber: '',
    severity: 'LIGHT',
    waterLevel: 0,
    latitude: -6.200000,
    longitude: 106.816666,
    rw: ''
  })
  const [photoFile, setPhotoFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [phoneVerified, setPhoneVerified] = useState(false)

  async function sendOtp() {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    }).then(r => r.json())
    if (res.ok) {
      setOtpSent(true)
      alert('OTP sent (mock). Check server logs for debug.')
    }
  }

  async function verifyOtp() {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code: otp })
    }).then(r => r.json())
    if (res.ok) {
      setPhoneVerified(true)
      alert('Phone verified (mock).')
    } else {
      alert('OTP invalid')
    }
  }

  function handlePhoto(file, dataUrl) {
    setPhotoFile(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = new FormData()
      payload.append('houseNumber', form.houseNumber)
      payload.append('severity', form.severity)
      payload.append('waterLevel', form.waterLevel)
      payload.append('latitude', form.latitude)
      payload.append('longitude', form.longitude)
      payload.append('rw', form.rw)
      if (photoFile) payload.append('photo', photoFile)
      if (phoneVerified) payload.append('phone', phone)

      const res = await fetch('/api/report', { method: 'POST', body: payload })
      const data = await res.json()
      if (data.ok) {
        router.push('/success')
      } else {
        alert('Error: ' + (data.error || 'unknown'))
      }
    } catch (err) {
      console.error(err)
      alert('Submit failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-primary">Lapor Banjir</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-white rounded-xl p-4 shadow">
          <div>
            <label className="block text-sm font-medium">House Number</label>
            <input value={form.houseNumber} onChange={e => setForm({...form, houseNumber: e.target.value})} className="mt-1 block w-full border rounded p-2"/>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Severity</label>
              <select value={form.severity} onChange={e => setForm({...form, severity: e.target.value})} className="mt-1 block w-full border rounded p-2">
                <option value="NONE">None</option>
                <option value="LIGHT">Light</option>
                <option value="MEDIUM">Medium</option>
                <option value="HEAVY">Heavy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Water level (cm)</label>
              <input type="number" value={form.waterLevel} onChange={e => setForm({...form, waterLevel: Number(e.target.value)})} className="mt-1 block w-full border rounded p-2"/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">RW (optional)</label>
            <input value={form.rw} onChange={e => setForm({...form, rw: e.target.value})} className="mt-1 block w-full border rounded p-2"/>
          </div>

          <div>
            <label className="block text-sm font-medium">Photo</label>
            <PhotoUploader onChange={handlePhoto} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Latitude</label>
              <input type="number" step="any" value={form.latitude} onChange={e => setForm({...form, latitude: Number(e.target.value)})} className="mt-1 block w-full border rounded p-2"/>
            </div>
            <div>
              <label className="block text-sm">Longitude</label>
              <input type="number" step="any" value={form.longitude} onChange={e => setForm({...form, longitude: Number(e.target.value)})} className="mt-1 block w-full border rounded p-2"/>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm font-medium mb-2">Phone verification (optional but recommended)</div>
            <div className="flex gap-2">
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="08xxxxxxxxxx" className="flex-1 border rounded p-2" />
              <button type="button" onClick={sendOtp} className="bg-primary text-white px-3 rounded">Send OTP</button>
            </div>
            {otpSent && !phoneVerified && (
              <div className="mt-2 flex gap-2">
                <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" className="flex-1 border rounded p-2" />
                <button type="button" onClick={verifyOtp} className="bg-green-600 text-white px-3 rounded">Verify</button>
              </div>
            )}
            {phoneVerified && <div className="text-sm text-green-600 mt-2">Phone verified</div>}
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded">
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
