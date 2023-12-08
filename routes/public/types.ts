import { type Static } from '@sinclair/typebox'

import { type login, type signup } from './schemas'

export type LoginPayload = Static<typeof login>
export type SignupPayload = Static<typeof signup>
