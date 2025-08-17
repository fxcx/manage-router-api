'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type{ FormData, FormErrors, LoginResponse } from '@/types/login'


export default function LoginSection() {
    const router = useRouter()
    
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        loginMethod: 'email'
    })
    
    const [errors, setErrors] = useState<FormErrors>({})

    // Manejar cambios en los inputs
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}
        
        if (!formData.email) {
            newErrors.email = 'El email es requerido'
        }
        
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Envío del formulario
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            })
            
            const data: LoginResponse = await response.json()
            
            if (response.ok) {
                router.push('/')
            } else {
                setErrors({ general: data.message || 'Error al iniciar sesión' })
            }
        } catch (error) {
            console.error('Error:', error)
            setErrors({ general: 'Error de conexión' })
        }
    }

    // Cambiar método de login
    const handleMethodChange = (method: 'email' | 'social'): void => {
        setFormData(prev => ({
            ...prev,
            loginMethod: method
        }))
    }

    return (
        <section className="max-w-md mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Login Options</h2>
                <p className="text-gray-600">Choose your preferred login method:</p>
            </div>


            {/* Formulario de email */}
            {formData.loginMethod === 'email' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="tu@email.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {errors.general && (
                        <p className="text-red-500 text-sm text-center">{errors.general}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            )}

            {/* Opciones sociales */}
            {formData.loginMethod === 'social' && (
                <div className="space-y-3">
                    <button
                        type="button"
                        className="w-full py-2 px-4 border rounded-md hover:bg-gray-50"
                    >
                        Continuar con Google
                    </button>
                    <button
                        type="button"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Continuar con Facebook
                    </button>
                </div>
            )}
        </section>
    )
}