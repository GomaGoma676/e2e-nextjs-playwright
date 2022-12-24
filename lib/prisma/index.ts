import { PrismaClient } from '@prisma/client'
declare let global: { prisma: PrismaClient }

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}
export default prisma

// Learn more:
// https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/lib/prisma.ts
// https://pris.ly/d/help/next-js-best-practices
