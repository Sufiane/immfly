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

export const updatePasswordByEmail = async (
    adminEmail: string,
    newPassword: string
): Promise<void> => {
    await dbClient.admins.update({
        data: {
            password: newPassword,
        },
        where: {
            email: adminEmail,
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

export const getOneByEmail = (
    email: string
): Promise<{ email: string; password: string; id: number } | null> => {
    return dbClient.admins.findUnique({
        select: {
            id: true,
            email: true,
            password: true,
        },
        where: {
            email,
        },
    })
}

export const getAll = (): Promise<Array<{ id: number; email: string }>> => {
    return dbClient.admins.findMany({
        select: {
            id: true,
            email: true,
        },
    })
}
