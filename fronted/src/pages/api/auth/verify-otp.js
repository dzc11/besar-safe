import { verifyOtp } from '../../../lib/otp'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end()
  }
  const { phone, code } = req.body ? JSON.parse(req.body) : {}
  if (!phone || !code) return res.status(400).json({ ok: false, error: 'phone_and_code_required' })
  const ok = verifyOtp(phone, code)
  return res.json({ ok })
}
