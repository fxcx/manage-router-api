import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'


export async function POST(request: any) {
    try {
        // Obtener datos del body
        const { email, password } = await request.json()

        // Validación básica
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email y contraseña son requeridos' },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return NextResponse.json(
                { message: 'Usuario no encontrado' },
                { status: 401 }
            )
        }

        // Verificar contraseña (si usas bcrypt)
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'Contraseña incorrecta' },
                { status: 401 }
            )
        }

        // Login exitoso - no devolver la contraseña
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json({
            message: 'Login exitoso',
            user: userWithoutPassword
        })

    } catch (error) {
        console.error('Error en login:', error)
        return NextResponse.json(
            { message: 'Error del servidor' },
            { status: 500 }
        )
    } finally {
        // Cerrar conexión de Prisma
        await prisma.$disconnect()
    }
}

