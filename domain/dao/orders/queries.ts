import { dbClient, type TransactionClient } from '../../index'
import { type FullOrder, type FullOrderAdmin } from './types'

export const create = async (
    userId: number,
    payload: Array<{
        productId: number
        quantity: number
    }>,
    deliveryAddressId: number,
    transaction?: TransactionClient
): Promise<void> => {
    const db = transaction ?? dbClient

    await db.orders.create({
        data: {
            userId,
            deliveryAddressId,
            date: new Date(),
            state: 'PENDING',
            Products: {
                create: payload.map((data) => {
                    return {
                        productId: data.productId,
                        quantity: data.quantity,
                    }
                }),
            },
        },
    })
}

export const getAllByEmailSelect = {
    id: true,
    state: true,
    Products: {
        select: {
            quantity: true,
            Product: {
                select: {
                    name: true,
                    price: true,
                },
            },
        },
    },
    DeliveryAddress: {
        select: {
            street: true,
            additionalStreet: true,
            zipCode: true,
            city: true,
            country: true,
        },
    },
}

export const getAllByEmail = (email: string): Promise<FullOrder[]> => {
    return dbClient.orders.findMany({
        select: getAllByEmailSelect,
        where: {
            Users: {
                email,
            },
        },
    })
}

export const getAllOrdersSelect = {
    ...getAllByEmailSelect,
    Users: {
        select: {
            id: true,
            name: true,
            email: true,
        },
    },
}

export const getAll = (): Promise<FullOrderAdmin[]> => {
    return dbClient.orders.findMany({
        select: getAllOrdersSelect,
    })
}
