import { Type } from '@sinclair/typebox'

export const update = Type.Required(
    Type.Object({
        payload: Type.Array(
            Type.Object({
                productId: Type.Number({ minimum: 0 }),
                quantity: Type.Number({ minimum: 0 }),
            })
        ),
    })
)
