import { type FastifyInstance } from 'fastify'

import { signup as signupSchema, login as loginSchema } from './schemas'
import { login, signup } from './controllers'

export async function publicRoutes(fastify: FastifyInstance): Promise<void> {
    fastify.route({
        method: 'POST',
        url: '/signup',
        schema: {
            body: signupSchema,
        },
        handler: signup,
    })

    fastify.route({
        method: 'POST',
        url: '/login',
        schema: {
            body: loginSchema,
        },
        handler: login,
    })


}
