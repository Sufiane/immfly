import { type FastifyInstance } from 'fastify'

import { verifyJwt } from '../../../auth'
import { getAll, updateState } from './controllers'
import { updateState as updateStateSchema } from './schemas'

export const ordersRoutes = async (fastify: FastifyInstance): Promise<void> => {
    fastify.route({
        method: 'GET',
        url: '/list',
        onRequest: [verifyJwt],
        handler: getAll,
    })

    fastify.route({
        method: 'POST',
        url: '/update-state',
        schema: {
            body: updateStateSchema,
        },
        onRequest: [verifyJwt],
        handler: updateState,
    })
}
