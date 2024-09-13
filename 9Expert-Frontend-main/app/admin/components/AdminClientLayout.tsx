'use client'

import { LogoIcon } from "@/app/icons/Logo"
import { Stack, useColorMode } from "@chakra-ui/react"
import { AdminSidebar } from "./AdminSidebar"
import { usePathname, useSearchParams } from "next/navigation"
import { AdminNavbar } from "./AdminNavbar"
import { useEffect } from "react"

export const AdminClientLayout = ({ children }: { children: React.ReactNode }) => {

    const searchParams = useSearchParams()
    const path = usePathname()
    const mode = useColorMode()

    useEffect(() => {
        mode.setColorMode('light')
    }, [])

    return (
        <>
            {
                path === '/admin/login' || path === '/admin/reset' ?
                    (
                        <>{children}</>
                    )
                    :
                    (
                        <Stack
                            w='100%'
                            h='100%'
                            direction='row'
                            spacing='0'
                            bg={
                                searchParams.get('page') === 'elearning-course' ? 'exAdminOnlineBg' : 'exAdminBackground'
                            }
                        >
                            <Stack
                                display={{ base: 'none', md: 'flex' }}
                                w='20%'
                                minH='100vh'
                                bg='exAdminBlack'
                            >
                                <LogoIcon m='1rem' w='180px' h='70px' />
                                <AdminSidebar />
                            </Stack>
                            <Stack
                                w={{ base: '100%', md: '80%' }}
                                h='100%'
                                spacing='0'
                            >
                                <Stack
                                    w='100%'
                                    h='100px'
                                    bg='white'
                                >
                                    <AdminNavbar />
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='100%'
                                >
                                    {children}
                                </Stack>
                            </Stack>
                        </Stack >
                    )
            }
        </>
    )
} 