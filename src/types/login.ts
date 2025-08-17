export interface FormData {
    email: string
    password: string
    loginMethod: 'email' | 'social'
}

export interface FormErrors {
    email?: string
    password?: string
    general?: string
}

export interface LoginResponse {
    message: string
    user?: {
        id: number
        email: string
        name?: string
    }
}

