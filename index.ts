import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

import { dbClient } from './domain'
import {
    adminRoutes,
    cartRoutes,
    catalogRoutes,
    productRoutes,
    publicRoutes,
    ordersRoutes,
} from './routes'

const fastify = Fastify({
    logger: true,
})

process.on('uncaughtException', () => {
    void dbClient.$disconnect()
})

const start = async (): Promise<void> => {
    try {
        await fastify.register(fastifyJwt, {
            secret: 'Wy5Vp3r53Cr3T',
            verify: {
                // to allow more ease while dev i put 1 day
                // todo put this as env variable to play along
                maxAge: '1d',
            },
            formatUser: function (user) {
                return {
                    email: user.email,
                }
            },
        })
        await fastify.register(adminRoutes, { prefix: '/api/admin' })
        await fastify.register(productRoutes, { prefix: '/api/admin/products' })
        await fastify.register(ordersRoutes, { prefix: '/api/admin/orders' })
        await fastify.register(publicRoutes, { prefix: '/api/public' })
        await fastify.register(catalogRoutes, { prefix: '/api/public/catalog' })
        await fastify.register(cartRoutes, { prefix: '/api/public/cart' })

        await fastify.listen({ port: 7777 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

void start()
