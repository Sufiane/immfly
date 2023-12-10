import { type FastifyReply, type FastifyRequest } from 'fastify'

import {
    type CreateAddressPayload,
    type CreateOrderPayload,
    type LoginPayload,
    type SignupPayload,
} from './types'
import {
    addressesDao,
    cartsDao,
    dbClient,
    ordersDao,
    usersDao,
} from '../../../domain'
import { comparePassword, hashPassword } from '../../../auth'

export const signup = async (
    {
        body: { name, email, password },
    }: FastifyRequest<{ Body: SignupPayload }>,
    reply: FastifyReply
): Promise<string> => {
    try {
        const hashedPassword = await hashPassword(password)
        await usersDao.create(name, email, hashedPassword)

        const token = await reply.jwtSign({ email })

        return await reply.send({ token })
    } catch {
        throw new Error('Could not signup user')
    }
}

export const login = async (
    { body: { email, password } }: FastifyRequest<{ Body: LoginPayload }>,
    reply: FastifyReply
): Promise<string> => {
    try {
        const userInDb = await usersDao.getOneByEmail(email)

        if (
            !userInDb ||
            !(await comparePassword(password, userInDb.password))
        ) {
            throw new Error('Could not connect user.')
        }

        const token = await reply.jwtSign({ email })

        return await reply.send({ token })
    } catch {
        throw new Error('Could not login.')
    }
}

export const createAddress = async ({
    body: address,
    user: { email },
}: FastifyRequest<{ Body: CreateAddressPayload }>): Promise<void> => {
    // no need to check, if we're here the user exist
    const userInDb = (await usersDao.getOneByEmail(email))!

    await addressesDao.createAddress(userInDb.id, address)
}

export const createOrder = async ({
    user: { email },
    body: { deliveryAddressId },
}: FastifyRequest<{ Body: CreateOrderPayload }>): Promise<void> => {
    const cart = await cartsDao.getByUserEmail(email)

    if (!cart) {
        throw new Error('Cannot create order w/o cart.')
    }

    const payload = cart.Products.map((product) => {
        return {
            quantity: product.quantity,
            productId: product.Product.id,
        }
    })

    await dbClient.$transaction(async (trx) => {
        await ordersDao.create(cart.userId, payload, deliveryAddressId, trx)

        // to empty the cart after creating the order we just need to delete
        await cartsDao.deleteCart(cart.userId, trx)
    })
}

export const getOrders = async ({
    user: { email },
}: FastifyRequest): Promise<
    Array<{
        id: number
        state: string
        totalPrice: number
        address: {
            street: string
            additionalStreet: string | null
            city: string
            zipCode: number
            country: string
        }
        products: Array<{
            name: string
            price: number
            quantity: number
            totalPrice: number
        }>
    }>
> => {
    const ordersInDb = await ordersDao.getAllByEmail(email)

    return ordersInDb.map((order) => {
        const products = order.Products.map((product) => {
            const price = product.Product.price
            const quantity = product.quantity

            return {
                name: product.Product.name,
                price,
                quantity,
                totalPrice: quantity * price,
            }
        })

        return {
            id: order.id,
            state: order.state,
            address: {
                street: order.DeliveryAddress.street,
                additionalStreet: order.DeliveryAddress.additionalStreet,
                city: order.DeliveryAddress.city,
                zipCode: order.DeliveryAddress.zipCode,
                country: order.DeliveryAddress.country,
            },
            products,
            totalPrice: products.reduce<number>((acc, currentProduct) => {
                return acc + currentProduct.totalPrice
            }, 0),
        }
    })
}
