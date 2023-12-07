import { type Static } from '@sinclair/typebox'

import {
    type createProduct,
    type updateProduct,
    type productParams,
} from './schemas'

export type CreateProductPayload = Static<typeof createProduct>

export type UpdateProductPayload = Static<typeof updateProduct>
export type ProductParams = Static<typeof productParams>
