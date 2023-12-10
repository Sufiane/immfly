import { Type } from '@sinclair/typebox'

enum OrderState {
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
}

export const updateState = Type.Object({
    orderId: Type.Number({ minimum: 0 }),
    state: Type.Enum(OrderState),
})
