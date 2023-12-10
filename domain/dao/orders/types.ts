import { type Prisma } from '@prisma/client'

import { type getAllByEmailSelect, type getAllOrdersSelect } from './queries'

export type FullOrder = Prisma.OrdersGetPayload<{
    select: typeof getAllByEmailSelect
}>

export type FullOrderAdmin = Prisma.OrdersGetPayload<{
    select: typeof getAllOrdersSelect
}>
