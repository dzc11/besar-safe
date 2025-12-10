import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Success() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-primary">Report submitted</h2>
          <p className="mt-2 text-gray-600">Thank you — laporan Anda sudah terkirim dan menunggu verifikasi admin.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
