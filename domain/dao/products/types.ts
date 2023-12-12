import { type Prisma } from '@prisma/client'

import { type fullProductSelect } from './queries'

export type FullProduct = Prisma.ProductsGetPayload<{
    select: typeof fullProductSelect
}>

