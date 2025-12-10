import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { id } = req.query
  if (req.method === 'GET') {
    try {
      const r = await prisma.report.findUnique({ where: { id }})
      if (!r) return res.status(404).json({ ok: false, error: 'not_found' })
      return res.json({ ok: true, report: r })
    } catch(e) {
      console.error(e)
      res.status(500).json({ ok: false, error: e.message })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end()
  }
}
