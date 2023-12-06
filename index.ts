import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

import { dbClient } from './domain'
import { adminRoutes } from './routes/admin'

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
        await fastify.listen({ port: 7777 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

void start()
