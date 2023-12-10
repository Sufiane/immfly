import { type FastifyInstance } from 'fastify'

import { verifyJwt } from '../../../auth'
import { getAll } from './controllers'

export const ordersRoutes = async (fastify: FastifyInstance): Promise<void> => {
    fastify.route({
        method: 'GET',
        url: '/list',
        onRequest: [verifyJwt],
        handler: getAll,
    })
}
