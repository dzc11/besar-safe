import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Profile() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-primary">Profile</h2>
        <div className="mt-4 bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600">Feature coming soon: manage your reports & settings</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
