import { type FastifyReply, type FastifyRequest } from 'fastify'

import { adminsDao } from '../domain'

export async function verifyJwt(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    try {
        const jwtPayload = await request.jwtVerify<{ email: string }>()

        const userInDB = await adminsDao.getOneByEmail(jwtPayload.email)

        if (!userInDB) {
            throw new Error('Bad token.')
        }
    } catch (e) {
        return reply.send(e)
    }
}
