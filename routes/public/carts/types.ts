import { type Static } from '@sinclair/typebox'

import { type update } from './schemas'


export type UpdatePayload = Static<typeof update>