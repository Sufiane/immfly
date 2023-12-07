import { dbClient } from '../../index'

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
