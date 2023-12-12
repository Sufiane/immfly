import { type FastifyReply, type FastifyRequest } from 'fastify'

import { productsDao, type ProductsTypes } from '../../../domain/dao/'
import {
    type UpdateProductPayload,
    type CreateProductPayload,
    type ProductParams,
} from './types'

export const listProducts = (): Promise<ProductsTypes.FullProduct[]> => {
    return productsDao.getAll()
}

export const createProduct = async ({
    body: { name, price, description },
}: FastifyRequest<{ Body: CreateProductPayload }>): Promise<void> => {
    try {
        await productsDao.create(name, price, description)
    } catch {
        throw new Error('Could not create product.')
    }
}

export const getProduct = async (
    { params: { productId } }: FastifyRequest<{ Params: ProductParams }>,
    reply: FastifyReply
): Promise<ProductsTypes.FullProduct> => {
    const product = await productsDao.getOne(productId)

    if (!product) {
        return reply.code(404).send('Product not found.')
    }

    return product
}

export const updateProduct = async ({
    params: { productId },
    body: { name, price, description },
}: FastifyRequest<{
    Body: UpdateProductPayload
    Params: ProductParams
}>): Promise<void> => {
    try {
        await productsDao.update(productId, { name, price, description })
    } catch {
        throw new Error('Could not update product.')
    }
}

export const deleteProduct = async ({
    params: { productId },
}: FastifyRequest<{ Params: ProductParams }>): Promise<void> => {
    try {
        await productsDao.deleteProduct(productId)
    } catch {
        throw new Error('Could not delete product.')
    }
}
