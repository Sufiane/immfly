import { type Prisma } from '@prisma/client'

import { type getAllSelect } from './queries'

export type FullProduct = Prisma.ProductsGetPayload<{
    select: typeof getAllSelect
}>
