import type { FastifyInstance } from 'fastify'
import {
    createAdmin,
    loginAdmin,
    updatePassword,
    getAll,
    deleteAdmin,
} from './controllers'
import {
    createAdmin as createAdminSchema,
    updatePassword as updatePasswordSchema,
    login as loginAdminSchema,
    deleteAdmin as deleteAdminSchema
} from './schemas'
import { verifyJwt } from '../../../auth'

export async function adminRoutes(fastify: FastifyInstance): Promise<void> {
    fastify.route({
        method: 'POST',
        url: '/login',
        schema: {
            body: loginAdminSchema
        },
        handler: loginAdmin,
    })

    fastify.route({
        method: 'POST',
        url: '/create',
        schema: {
            body: createAdminSchema
        },
        onRequest: [verifyJwt],
        handler: createAdmin,
    })

    fastify.route({
        method: 'POST',
        url: '/update-password',
        onRequest: [verifyJwt],
        schema: {
            body: updatePasswordSchema
        },
        handler: updatePassword,
    })

    fastify.route({
        method: 'GET',
        url: '/list',
        onRequest: [verifyJwt],
        handler: getAll,
    })

    fastify.route({
        method: 'DELETE',
        url: '/delete/:id',
        schema: {
            params: deleteAdminSchema
        },
        onRequest: [verifyJwt],
        handler: deleteAdmin,
    })

    // Orders related
    // list
    // update status
}
