import { type Prisma } from '@prisma/client'

import type { fullUserSelect } from './queries'

export type FullAdmin = Prisma.UsersGetPayload<{
    select: typeof fullUserSelect
}>
