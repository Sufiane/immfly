import { Type } from '@sinclair/typebox'

const productNameRule = Type.String({ minLength: 1 })
const productDescriptionRule = Type.String()
const productPriceRule = Type.Number({ minimum: 0 })

export const createProduct = Type.Object({
    name: productNameRule,
    description: productDescriptionRule,
    price: productPriceRule,
})

export const updateProduct = Type.Object(
    {
        name: Type.Optional(productNameRule),
        description: Type.Optional(productDescriptionRule),
        price: Type.Optional(productPriceRule),
    },
    { minProperties: 1 }
)

export const productParams = Type.Required(
    Type.Object({
        productId: Type.Number({ minimum: 0 }),
    })
)
