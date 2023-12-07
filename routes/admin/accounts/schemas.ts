import { Type } from '@sinclair/typebox'

const emailRule = Type.String({ format: 'email' })
const passwordRule = Type.String({ minLength: 7 })

export const login = Type.Required(
    Type.Object({
        email: emailRule,
        password: passwordRule,
    })
)

export const createAdmin = Type.Required(
    Type.Object({
        email: emailRule,
        password: passwordRule,
    })
)

export const updatePassword = Type.Required(
    Type.Object({
        password: passwordRule
    })
)

export const deleteAdmin = Type.Required(
    Type.Object({
        id: Type.Number({ minimum: 0})
    })
)