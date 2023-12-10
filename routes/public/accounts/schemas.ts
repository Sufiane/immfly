import { Type } from '@sinclair/typebox'

const emailRule = Type.String({ format: 'email' })
const passwordRule = Type.String({ minLength: 7 })

export const login = Type.Required(
    Type.Object({
        email: emailRule,
        password: passwordRule,
    })
)

export const signup = Type.Required(
    Type.Object({
        email: emailRule,
        password: passwordRule,
        name: Type.String({ minLength: 1 }),
    })
)

export const createAddress = Type.Object({
    street: Type.String(),
    additionalStreet: Type.Optional(Type.String()),
    zipCode: Type.Number(),
    city: Type.String(),
    country: Type.String(),
})

export const createOrder = Type.Object({
    deliveryAddressId: Type.Number(),
})
