import { type Static } from '@sinclair/typebox'

import { type updateState } from './schemas'

export type UpdateStatePayload = Static<typeof updateState>
