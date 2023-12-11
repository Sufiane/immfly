import { ordersDao } from '../../../domain'
import { type FastifyRequest } from 'fastify'
import { type UpdateStatePayload } from './types'

export const getAll = async (): Promise<
    Array<{
        id: number
        state: string
        totalPrice: number
        user: {
            id: number
            name: string
        }
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
    const orders = await ordersDao.getAll()

    return orders.map((order) => {
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

        const totalPrice = products.reduce((acc, product) => {
            return acc + product.totalPrice
        }, 0)

        return {
            id: order.id,
            state: order.state,
            user: {
                id: order.Users.id,
                name: order.Users.name,
            },
            totalPrice,
            address: {
                street: order.DeliveryAddress.street,
                additionalStreet: order.DeliveryAddress.additionalStreet,
                city: order.DeliveryAddress.city,
                zipCode: order.DeliveryAddress.zipCode,
                country: order.DeliveryAddress.country,
            },
            products,
        }
    })
}

export const updateState = async ({
    body: { state, orderId },
}: FastifyRequest<{ Body: UpdateStatePayload }>): Promise<void> => {
    await ordersDao.updateState(orderId, state)
}
