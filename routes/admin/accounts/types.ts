import { type Static } from '@sinclair/typebox'

import {
    type createAdmin,
    type deleteAdmin,
    type login,
    type updatePassword,
} from './schemas'

export type CreateAdminPayload = Static<typeof createAdmin>

export type AdminParams = Static<typeof deleteAdmin>

export type LoginPayload = Static<typeof login>

export type UpdatePasswordPayload = Static<typeof updatePassword>
