import '@fastify/jwt'

declare module '@fastify/jwt' {
    interface FastifyJWT {
        // payload type is used for signing and verifying
        payload: {
            email: string
        }
        // user type is return type of `request.user` object
        user: {
            email: string
        }
    }
}
