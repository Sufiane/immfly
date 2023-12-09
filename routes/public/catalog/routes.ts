import { type FastifyInstance } from 'fastify'

import { list } from './controllers'

export const catalogRoutes = async (
    fastify: FastifyInstance
): Promise<void> => {
    fastify.route({
        method: 'GET',
        url: '/list',
        handler: list,
    })
}
