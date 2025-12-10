import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const config = {
  api: {
    bodyParser: false,
  },
};

function ensureUploadDir() {
  const dir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({ multiples: false });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ ok: false, error: 'parse_error' });
      }
      try {
        const {
          houseNumber,
          severity = 'LIGHT',
          waterLevel = '0',
          latitude,
          longitude,
          rw,
          phone
        } = fields;

        let photoUrl = null;
        if (files.photo) {
          const uploadDir = ensureUploadDir();
          const file = files.photo;
          const data = fs.readFileSync(file.filepath);
          const ext = file.originalFilename.split('.').pop();
          const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
          const outPath = path.join(uploadDir, filename);
          fs.writeFileSync(outPath, data);
          photoUrl = `/uploads/${filename}`;
        }

        const created = await prisma.report.create({
          data: {
            houseNumber: String(houseNumber),
            severity: String(severity),
            waterLevel: parseInt(waterLevel || '0'),
            photoUrl,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            rw: rw || null,
            reporterPhone: phone || null
          }
        });

        return res.json({ ok: true, report: created });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, error: e.message });
      }
    });
  } else if (req.method === 'GET') {
    // list
    try {
      const reports = await prisma.report.findMany({ orderBy: { createdAt: 'desc' }});
      return res.json({ ok: true, reports });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ ok: false, error: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET','POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
