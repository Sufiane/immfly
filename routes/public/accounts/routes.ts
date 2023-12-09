import { type FastifyInstance } from 'fastify'

import {
    signup as signupSchema,
    login as loginSchema,
    createAddress as createAddressSchema,
} from './schemas'
import { createAddress, login, signup } from './controllers'
import { verifyJwt } from '../../../auth'

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

    fastify.route({
        method: 'POST',
        url: '/addresses',
        schema: {
            body: createAddressSchema,
        },
        onRequest: [verifyJwt],
        handler: createAddress,
    })
}
