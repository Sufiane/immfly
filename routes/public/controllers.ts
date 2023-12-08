import { type FastifyReply, type FastifyRequest } from 'fastify'

import { type LoginPayload, type SignupPayload } from './types'
import { usersDao } from '../../domain/'
import { comparePassword, hashPassword } from '../../auth'

export const signup = async (
    {
        body: { name, email, password },
    }: FastifyRequest<{ Body: SignupPayload }>,
    reply: FastifyReply
): Promise<string> => {
    try {
        const hashedPassword = await hashPassword(password)
        await usersDao.create(name, email, hashedPassword)

        const token = await reply.jwtSign({ email })

        return await reply.send(token)
    } catch {
        throw new Error('Could not signup user')
    }
}

export const login = async (
    { body: { email, password } }: FastifyRequest<{ Body: LoginPayload }>,
    reply: FastifyReply
): Promise<string> => {
    try {
        const userInDb = await usersDao.getOneByEmail(email)

        if (
            !userInDb ||
            !(await comparePassword(password, userInDb.password))
        ) {
            throw new Error('Could not connect user.')
        }

        const token = await reply.jwtSign({ email })

        return await reply.send({ token })
    } catch {
        throw new Error('Could not login.')
    }
}
