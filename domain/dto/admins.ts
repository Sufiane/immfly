import { dbClient } from '../index'

export const create = async (
    email: string,
    password: string
): Promise<void> => {
    await dbClient.admins.create({
        data: {
            email,
            password,
        },
    })
}

export const updatePassword = async (
    adminId: number,
    newPassword: string
): Promise<void> => {
    await dbClient.admins.update({
        data: {
            password: newPassword,
        },
        where: {
            id: adminId,
        },
    })
}

export const deleteAdmin = async (adminId: number): Promise<void> => {
    await dbClient.admins.delete({
        where: {
            id: adminId,
        },
    })
}
