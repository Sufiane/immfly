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
import { verifyJwt } from '../../auth'

export async function adminRoutes(fastify: FastifyInstance): Promise<void> {
    fastify.route({
        method: 'POST',
        url: '/login',
        schema: loginAdminSchema,
        handler: loginAdmin,
    })

    // create admin
    fastify.route({
        method: 'POST',
        url: '/create',
        schema: createAdminSchema,
        onRequest: [verifyJwt],
        handler: createAdmin,
    })

    fastify.route({
        method: 'POST',
        url: '/update-password',
        onRequest: [verifyJwt],
        schema: updatePasswordSchema,
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
        schema: deleteAdminSchema,
        onRequest: [verifyJwt],
        handler: deleteAdmin,
    })

    // Product related
    // create
    // edit
    // delete
    // list

    // Orders related
    // list
    // update status
}
