'use client'

import { adminLogin } from "@/libs/AdminAPI"
import { Button, Heading, Image, Input, Stack, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TAdminLogin } from "../../interface/AdminInterface"
import { useRouter } from "next/navigation"

export const LoginPage = () => {

    const [ state, setState ] = useState<{username: string, password: string}>({
        username: '',
        password: '',
    })

    const toast = useToast()

    const router = useRouter()

    useEffect(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }, [])

    const handleLogin = async () => {
        await adminLogin(state, (data: TAdminLogin, error: unknown) => {
            if (error) {
                console.log(error)
                return toast({
                    title: 'เกิดข้อผิดพลาด Email หรือ Password ไม่ถูกต้อง',
                    description: 'กรุณาลองใหม่อีกครั้ง',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
                })
            }

            if (data) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))

                toast({
                    title: 'เข้าสู่ระบบสําเร็จ',
                    description: 'เข้าสู่ระบบสําเร็จ',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
                })
                
                if (data.isFirstLogin) {
                    router.push('/admin/reset')
                } else {
                    router.push('/admin?tab=dashboard')
                }
            }
        })
    }

    return (
        <Stack
            w='100%'
            h='100%'
            minH='100vh'
            align='center'
            justify='center'
            bg='#2E2E2E'
        >
            <Stack
                w={{ base: '95%', md: '550px' }}
                h='100%'
                p='2rem'
                minH='500px'
                align='center'
                justify='center'
                bg='white'
                borderRadius='15px'
                spacing='2rem'
            >
                <Image 
                    alt='admin logo'
                    w='125px'
                    src='/logo/9expert.png'
                />
                <Heading
                    fontSize='3xl'
                >
                    {`Welcome back`}
                </Heading>
                <Stack
                    w='100%'
                    h='100%'
                >
                    <Text>
                        {`Email`}
                    </Text>
                    <Input 
                        h='50px'
                        type='email'
                        placeholder='อีเมลผู้ใช้งาน'
                        onChange={(e) => setState({...state, username: e.target.value})}
                    />
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                >
                    <Text>
                        {`Password`}
                    </Text>
                    <Input
                        h='50px'
                        type='password'
                        placeholder='รหัสผ่าน'
                        onChange={(e) => setState({...state, password: e.target.value})}
                    />
                </Stack>
                <Button
                    w='300px'
                    mt='1rem'
                    h='40px'
                    bg='black'
                    textColor='white'
                    onClick={handleLogin}
                >
                    {`เข้าสู่ระบบ`}
                </Button>
            </Stack>
        </Stack>
    )
}