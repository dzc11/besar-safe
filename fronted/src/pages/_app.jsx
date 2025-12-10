import '../styles/globals.css'
import { useEffect } from 'react'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // fix leaflet icon path when used with Next.js
    if (typeof window !== 'undefined') {
      import('leaflet/dist/leaflet.css')
    }
  }, [])

  return (
    <>
      <Head>
        <title>BesarSafe - Crowd Flood Reporting for Kelurahan Besar</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}