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