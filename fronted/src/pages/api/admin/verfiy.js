import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH'])
    return res.status(405).end()
  }
  try {
    const { id, verified } = req.body
    if (!id) return res.status(400).json({ ok: false, error: 'id_required' })
    const updated = await prisma.report.update({
      where: { id },
      data: { verified: Boolean(verified) }
    })
    return res.json({ ok: true, report: updated })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: e.message })
  }
}
