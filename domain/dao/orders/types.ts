import { type Prisma } from '@prisma/client'

import { type getAllByEmailSelect } from './queries'

export type FullOrder = Prisma.OrdersGetPayload<{
    select: typeof getAllByEmailSelect
}>
