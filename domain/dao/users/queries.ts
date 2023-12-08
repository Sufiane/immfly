import { dbClient } from '../../index'
import { type FullAdmin } from './types'

export const create = async (
    name: string,
    email: string,
    password: string
): Promise<void> => {
    await dbClient.users.create({
        data: {
            name,
            email,
            password,
        },
    })
}

export const fullUserSelect = {
    id: true,
    name: true,
    email: true,
    password: true,
}

export const getOneByEmail = async (
    email: string
): Promise<FullAdmin | null> => {
    return dbClient.users.findUnique({
        select: fullUserSelect,
        where: {
            email,
        },
    })
}
