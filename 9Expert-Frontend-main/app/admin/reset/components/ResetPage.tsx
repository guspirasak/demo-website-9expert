'use client'

import { adminLogin, adminResetPassword, getAdmin } from "@/libs/AdminAPI"
import { Button, Heading, Image, Input, Stack, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TAdminLogin } from "../../interface/AdminInterface"
import { useRouter } from "next/navigation"

export const ResetPage = () => {

    const [state, setState] = useState<{ username: string, password: string, newPassword: string }>({
        username: '',
        password: '',
        newPassword: ''
    })

    const [ confirmPassword, setConfirmPassword ] = useState('')

    const username = JSON.parse(localStorage.getItem('user') as string)

    const toast = useToast()

    const router = useRouter()

    useEffect(() => {
        if (username) {
            getAdmin(username, (data: TAdminLogin, error: unknown) => {
                console.log(data)
                if (error) router.push('/admin/login')
                
                if (!data) router.push('/admin/login')

                if (data.isFirstLogin === false) router.push('/admin/reset')
            })
        } else {
            localStorage.removeItem('token')
            router.push('/admin/login')
        }
    }, [])

    const handleReset = async () => {
        if (state.newPassword !== confirmPassword) {
            toast({
                title: 'รหัสผ่านไม่ตรงกัน',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        } else {
            adminResetPassword({...state, username: username}, (data: TAdminLogin, error: unknown) => {
                if (error) {
                    toast({
                        title: `เกิดข้อผิดพลาด ${error}`,
                        description: 'กรุณาลองใหม่อีกครั้ง',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                } else {
                    toast({
                        title: 'เปลี่ยนรหัสผ่านสําเร็จ',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'top-right'
                    })
                    router.push('/admin/login')
                }
            })
        }
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
                        {`Password`}
                    </Text>
                    <Input
                        h='50px'
                        type='password'
                        placeholder='รหัสผ่าน'
                        onChange={(e) => setState({ ...state, password: e.target.value })}
                    />
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                >
                    <Text>
                        {`New Password`}
                    </Text>
                    <Input
                        h='50px'
                        type='password'
                        placeholder='รหัสผ่าน'
                        onChange={(e) => setState({ ...state, newPassword: e.target.value })}
                    />
                </Stack>
                <Stack
                    w='100%'
                    h='100%'
                >
                    <Text>
                        {`Confirm Password`}
                    </Text>
                    <Input
                        h='50px'
                        type='password'
                        placeholder='รหัสผ่าน'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Stack>
                <Button
                    w='300px'
                    mt='1rem'
                    h='40px'
                    bg='black'
                    textColor='white'
                    onClick={handleReset}
                >
                    {`เปลี่ยนรหัสผ่าน`}
                </Button>
            </Stack>
        </Stack>
    )
}