import { type Prisma } from '@prisma/client'

import { type basicSelect, type fullAdminSelect } from './queries'

export type BasicAdmin = Prisma.AdminsGetPayload<{
    select: typeof basicSelect
}>

export type FullAdmin = Prisma.AdminsGetPayload<{
    select: typeof fullAdminSelect
}>
