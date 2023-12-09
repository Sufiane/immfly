import { type FastifyRequest } from 'fastify'

import { cartsDao, usersDao, type FullCart } from '../../../domain'
import {  type UpdatePayload } from './types'

export const get = async ({
    user: { email },
}: FastifyRequest): Promise<{
    userId: number
    totalPrice: number
    products: Array<{
        quantity: number
        name: string
        id: number
        price: number
        totalPrice: number
    }>
}> => {
    const cart = await cartsDao.getByUserEmail(email)

    if (!cart) {
        throw new Error('Cart not found.')
    }

    const products = cart.Products.map((cartProduct) => {
        const quantity = cartProduct.quantity
        const price = cartProduct.Product.price

        return {
            quantity,
            name: cartProduct.Product.name,
            id: cartProduct.Product.id,
            price,
            totalPrice: quantity * price,
        }
    })

    return {
        userId: cart.userId,
        products,
        totalPrice: products.reduce<number>((acc, currentProduct) => {
            return acc + currentProduct.totalPrice
        }, 0),
    }
}

const createCart = async (userEmail: string): Promise<FullCart> => {
    const user = await usersDao.getOneByEmail(userEmail)

    if (!user) {
        throw new Error('Could not create cart.')
    }

    return cartsDao.createCart(user.id)
}

export const update = async ({
    user: { email },
    body: { payload },
}: FastifyRequest<{ Body: UpdatePayload }>): Promise<void> => {
    const userCart =
        (await cartsDao.getByUserEmail(email)) ?? (await createCart(email))

    const { productIdsToRemove, productToUpsert } = payload.reduce<{
        productIdsToRemove: number[]
        productToUpsert: Array<{ productId: number; quantity: number }>
    }>(
        (acc, currentProduct) => {
            if (currentProduct.quantity === 0) {
                acc.productIdsToRemove.push(currentProduct.productId)
            } else {
                acc.productToUpsert.push(currentProduct)
            }

            return acc
        },
        { productIdsToRemove: [], productToUpsert: [] }
    )

    await Promise.all([
        cartsDao.upsertMany(userCart.userId, productToUpsert),
        cartsDao.deleteMany(productIdsToRemove),
    ])
}
