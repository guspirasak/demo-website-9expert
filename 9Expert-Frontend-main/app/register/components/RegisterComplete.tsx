'use client'

import { GreenSuccessWithCircleIcon } from "@/app/icons/RegisterIcons"
import { Center, Heading, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const RegisterComplete = () => {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 5000)
    }, [])
    
    return (
        <Center
            w='100%'
            h='100%'
            minH='768px'
            flexDirection='column'
            gap='60px'
        >
            <Center
                w={{ base: '200px', lg: '400px' }}
                h={{ base: '200px', lg: '400px' }}
                bg='#F2FCF2'
                borderRadius='full'
            >
                <Center
                    w={{ base: '100px', lg: '200px' }}
                    h={{ base: '100px', lg: '200px' }}
                    bg='#CFF3CE'
                    borderRadius='full'
                >
                    <GreenSuccessWithCircleIcon w={{ base: '50px', lg: '100px' }} h={{ base: '50px', lg: '100px' }} />
                </Center>
            </Center>
            <Center
                flexDirection='column'
                gap='24px'
            >
                <Heading
                    fontSize='48px'
                    textColor='#2E2E2E'
                    textAlign='center'
                >
                    {`ลงทะเบียนเรียนสำเร็จ!`}
                </Heading>
                <Text
                    fontSize='24px'
                    textColor='#7D7D7D'
                    textAlign='center'
                >
                    {`ทาง 9Expert ได้ทำการส่งอีเมล์ยืนยันการสมัครของท่านพร้อมกำหนดการการเข้าอบรมเรียบร้อยครับ`}
                </Text>
            </Center>
        </Center>
    )
}