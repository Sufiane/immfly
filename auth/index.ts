import { type FastifyReply, type FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'

import { adminsDao, usersDao } from '../domain'

export async function verifyJwt(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    const path = request.routeOptions.url.split('/')

    const dao = path.includes('admin') ? adminsDao : usersDao

    try {
        const jwtPayload = await request.jwtVerify<{ email: string }>()

        const userInDB = await dao.getOneByEmail(jwtPayload.email)

        if (!userInDB) {
            throw new Error('Bad token.')
        }
    } catch (e) {
        return reply.send(e)
    }
}

export async function hashPassword(passwordToHash: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(passwordToHash, salt)
}

export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
}
