import { Prisma, PrismaClient } from '@prisma/client'

export const dbClient = new PrismaClient({
    errorFormat: 'pretty',
})

export import TransactionClient = Prisma.TransactionClient

export * from './dao'
