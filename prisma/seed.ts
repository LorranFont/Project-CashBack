import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'teste@lorran.com' },
    update: {},
    create: {
      email: 'teste@lorran.com',
      name: 'Lorran Fontenele',
      password: '123', 
      referralCode: 'LORRAN21',
      transactions: {
        create: [
          { amount: 50.00, description: 'Cashback Compra iPhone', type: 'CASHBACK', status: 'COMPLETED' },
          { amount: 10.00, description: 'Bônus: Indicação Amigo', type: 'REFERRAL_BONUS', status: 'COMPLETED' },
        ]
      }
    },
  })
  console.log('Usuário de teste criado com sucesso:', user.name)
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })