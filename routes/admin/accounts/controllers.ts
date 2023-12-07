import { type FastifyInstance, type FastifyRequest } from 'fastify'

import { adminsDao, type AdminsTypes } from '../../../domain'
import {
    type AdminParams,
    type CreateAdminPayload,
    type LoginPayload,
    type UpdatePasswordPayload,
} from './types'

export async function loginAdmin(
    this: FastifyInstance,
    {
        body: { email, password },
    }: FastifyRequest<{
        Body: LoginPayload
    }>
): Promise<{ token: string }> {
    const userInDb = await adminsDao.getOneByEmail(email)

    // To not let anyone outside the app know if an email is used or not
    // we do not send back a more detailed response.
    if (!userInDb || password !== userInDb.password) {
        throw new Error('Wrong email or password.')
    }

    return { token: this.jwt.sign({ email: userInDb.email }) }
}

export const createAdmin = async ({
    body: { email, password },
}: FastifyRequest<{
    Body: CreateAdminPayload
}>): Promise<void> => {
    try {
        await adminsDao.create(email, password)
    } catch (e) {
        throw new Error('Could not create new admin.')
    }
}

export const updatePassword = async ({
    user: authUser,
    body: { password },
}: FastifyRequest<{ Body: UpdatePasswordPayload }>): Promise<void> => {
    try {
        await adminsDao.updatePasswordByEmail(authUser.email, password)
    } catch {
        throw new Error('Error while updating admin password.')
    }
}

export const getAll = (): Promise<AdminsTypes.BasicAdmin[]> => {
    return adminsDao.getAll()
}

export const deleteAdmin = async ({
    user: { email: currentUserEmail },
    params: { id: idToDelete },
}: FastifyRequest<{ Params: AdminParams }>): Promise<void> => {
    // we have to make an extra call to get the user id because
    // we don't want to sign the jwt with the user db id.
    const currentUser = await adminsDao.getOneByEmail(currentUserEmail)

    // Since we're here, it means the user exist no need for an extra null check
    if (currentUser!.id === idToDelete) {
        throw new Error('Cannot delete own account !')
    }

    try {
        await adminsDao.deleteAdmin(idToDelete)
    } catch {
        throw new Error('Error while deleting admin account.')
    }
}
