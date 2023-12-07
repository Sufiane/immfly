import { dbClient } from '../../index'

import { type FullProduct } from './types'

export const create = async (
    name: string,
    price: number,
    description: string
): Promise<void> => {
    await dbClient.products.create({
        data: {
            name,
            price,
            description,
        },
    })
}

export const update = async (
    productId: number,
    data: {
        price?: number
        name?: string
        description?: string
    }
): Promise<void> => {
    await dbClient.products.update({
        where: {
            id: productId,
        },
        data: {
            name: data.name,
            price: data.price,
            description: data.description,
        },
    })
}

export const deleteProduct = async (productId: number): Promise<void> => {
    await dbClient.products.delete({
        where: {
            id: productId,
        },
    })
}

export const getAllSelect = {
    description: true,
    price: true,
    name: true,
    id: true,
}

export const getAll = async (): Promise<FullProduct[]> => {
    return dbClient.products.findMany({
        select: getAllSelect,
    })
}
