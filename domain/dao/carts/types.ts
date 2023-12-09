import { type Prisma } from '@prisma/client'

import { type fullCartSelect } from './queries'

export type FullCart = Prisma.CartsGetPayload<{ select: typeof fullCartSelect }>
