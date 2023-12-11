import { dbClient } from '../../index'
import { type BasicAdmin, type FullAdmin } from './types'

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

export const fullAdminSelect = {
    id: true,
    email: true,
    password: true,
}

export const getOneByEmail = (
    email: string
): Promise<FullAdmin | null> => {
    return dbClient.admins.findUnique({
        select: fullAdminSelect,
        where: {
            email,
        },
    })
}

export const basicSelect = {
    id: true,
    email: true,
}

export const getAll = (): Promise<BasicAdmin[]> => {
    return dbClient.admins.findMany({
        select: basicSelect,
    })
}
