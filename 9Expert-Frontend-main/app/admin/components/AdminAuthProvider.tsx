'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) router.push('/admin/login')

    }, [])

    return children
}
