import { dbClient } from '../../index'
import { type FullCart } from './types'

export const fullCartSelect = {
    userId: true,
    Products: {
        select: {
            Product: {
                select: {
                    price: true,
                    id: true,
                    name: true,
                },
            },
            quantity: true,
        },
    },
}

export const getByUserEmail = async (
    email: string
): Promise<FullCart | null> => {
    // cannot use findUnique here because it requires a cart ID
    return dbClient.carts.findFirst({
        select: fullCartSelect,
        where: {
            User: {
                email,
            },
        },
    })
}

export const createCart = async (userId: number): Promise<FullCart> => {
    return dbClient.carts.create({
        data: {
            userId,
        },
        select: fullCartSelect,
    })
}

export const upsert = async (
    cartId: number,
    data: { productId: number; quantity: number }
): Promise<void> => {
    await dbClient.cartHasProduct.upsert({
        create: {
            quantity: data.quantity,
            productId: data.productId,
            cartId,
        },
        update: {
            quantity: data.quantity,
        },
        where: {
            cartId_productId: {
                cartId,
                productId: data.productId,
            },
        },
    })
}

export const upsertMany = async (
    cartId: number,
    data: Array<{ productId: number; quantity: number }>
): Promise<void> => {
    try {
        await dbClient.$transaction(async (trx) => {
            await Promise.all(
                data.map((payload) =>
                    trx.cartHasProduct.upsert({
                        create: {
                            quantity: payload.quantity,
                            productId: payload.productId,
                            cartId,
                        },
                        update: {
                            quantity: payload.quantity,
                        },
                        where: {
                            cartId_productId: {
                                cartId,
                                productId: payload.productId,
                            },
                        },
                    })
                )
            )
        })
    } catch {
        throw new Error('Could not upsert cart.')
    }
}

export const deleteMany = async (productIds: number[]): Promise<void> => {
    await dbClient.cartHasProduct.deleteMany({
        where: {
            productId: {
                in: productIds,
            },
        },
    })
}
