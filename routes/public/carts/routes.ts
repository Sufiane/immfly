import { type FastifyInstance } from 'fastify'

import { verifyJwt } from '../../../auth'
import { get, update } from './controllers'
import { update as updateSchema } from './schemas'

export const cartRoutes = async (fastify: FastifyInstance): Promise<void> => {
    fastify.route({
        method: 'GET',
        url: '/',
        onRequest: [verifyJwt],
        handler: get,
    })

    fastify.route({
        method: 'POST',
        url: '/update',
        onRequest: [verifyJwt],
        schema: {
            body: updateSchema
        },
        handler: update
    })
}
