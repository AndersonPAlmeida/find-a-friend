import { PrismaPg } from '@prisma/adapter-pg'
import { env } from '@/env/index.js'
import { PrismaClient } from './prisma/generated/prisma/client.js'

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
})

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
