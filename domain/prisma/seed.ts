import { PrismaClient } from '@prisma/client'

import { hashPassword } from '../../auth'

const prisma = new PrismaClient()

async function main(): Promise<void> {
    await prisma.admins.create({
        data: {
            email: 'admin@email.com',
            password: await hashPassword("1234567"),
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async () => {
        await prisma.$disconnect()
        process.exit(1)
    })