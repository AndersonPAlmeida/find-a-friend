import { PrismaPg } from '@prisma/adapter-pg'
import { env } from '@/env/index'
import { PrismaClient } from './prisma/generated/prisma/client'

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
})

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
