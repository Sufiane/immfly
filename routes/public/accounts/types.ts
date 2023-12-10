import { type Static } from '@sinclair/typebox'

import {
    type createAddress,
    type createOrder,
    type login,
    type signup,
} from './schemas'

export type LoginPayload = Static<typeof login>
export type SignupPayload = Static<typeof signup>
export type CreateAddressPayload = Static<typeof createAddress>
export type CreateOrderPayload = Static<typeof createOrder>
