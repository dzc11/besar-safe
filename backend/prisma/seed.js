const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.admin.upsert({
    where: { email: 'admin@besarsafe.local' },
    update: {},
    create: {
      name: 'Admin BesarSafe',
      email: 'admin@besarsafe.local',
      password: '$2a$10$FvQmF8I8uYv3GZQYQ/3vkuwE1j1YxE2M7vO2H2f6s8KxYt7vG8l4a' // "password" bcrypt hashed
    }
  });

  const sampleReports = [
    {
      houseNumber: '12A',
      severity: 'MEDIUM',
      waterLevel: 75,
      photoUrl: '/uploads/sample1.jpg',
      latitude: -6.200000,
      longitude: 106.816666,
      rw: '01',
      verified: false
    },
    {
      houseNumber: '45B',
      severity: 'HEAVY',
      waterLevel: 120,
      photoUrl: '/uploads/sample2.jpg',
      latitude: -6.201000,
      longitude: 106.817000,
      rw: '02',
      verified: true
    }
  ];

  for (const r of sampleReports) {
    await prisma.report.upsert({
      where: { id: r.id ?? r.houseNumber },
      update: {},
      create: {
        ...r,
        reporterPhone: '081234567890'
      }
    });
  }

  console.log('Seeded database.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });