import { sendOtp } from '../../../lib/otp'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end()
  }
  const { phone } = req.body ? JSON.parse(req.body) : {}
  if (!phone) return res.status(400).json({ ok: false, error: 'phone_required' })
  const out = sendOtp(phone)
  return res.json({ ok: true, message: 'otp_sent', debug: out })
}
