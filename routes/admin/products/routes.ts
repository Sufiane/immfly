import { type FastifyInstance } from 'fastify'

import { verifyJwt } from '../../../auth'
import {
    listProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
} from './controllers'
import {
    createProduct as createProductSchema,
    updateProduct as updateProductPayloadSchema,
    productParams as productParamsSchema,
} from './schemas'

export const productRoutes = async (
    fastify: FastifyInstance
): Promise<void> => {
    fastify.route({
        method: 'GET',
        url: '/list',
        onRequest: [verifyJwt],
        handler: listProducts,
    })

    fastify.route({
        method: 'POST',
        url: '/create',
        schema: {
            body: createProductSchema,
        },
        onRequest: [verifyJwt],
        handler: createProduct,
    })

    fastify.route({
        method: 'GET',
        url: '/:productId',
        onRequest: [verifyJwt],
        schema: {
            params: productParamsSchema,
        },
        handler: getProduct,
    })

    fastify.route({
        method: 'POST',
        url: '/update/:productId',
        schema: {
            params: productParamsSchema,
            body: updateProductPayloadSchema,
        },
        onRequest: [verifyJwt],
        handler: updateProduct,
    })

    fastify.route({
        method: 'DELETE',
        url: '/delete/:productId',
        schema: {
            params: productParamsSchema,
        },
        onRequest: [verifyJwt],
        handler: deleteProduct,
    })
}
