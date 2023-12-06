export const login = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 7 },
        },
        required: ['email', 'password'],
    },
}

export const createAdmin = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 7 },
        },
        required: ['email', 'password'],
    },
}

// todo check ref usage
export const updatePassword = {
    body: {
        type: 'object',
        properties: {
            password: { type: 'string', minLength: 7 },
        },
        required: ['password'],
    },
}

export const deleteAdmin = {
    params: {
        id: { type: 'number' },
    },
}
