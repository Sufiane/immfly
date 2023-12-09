import { dbClient } from '../../index'

export const createAddress = async (
    userId: number,
    payload: {
        city: string
        country: string
        street: string
        additionalStreet?: string
        zipCode: number
    }
): Promise<void> => {
    try {
        await dbClient.addresses.create({
            data: {
                city: payload.city,
                country: payload.country,
                street: payload.country,
                additionalStreet: payload.additionalStreet,
                zipCode: payload.zipCode,
                userId,
            },
        })
    } catch {
        throw new Error('Could not create address.')
    }
}
