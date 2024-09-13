'use client'

import Link from 'next/link'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { containerBreakpoints } from '@/config/theme'
import { Container, Stack, Heading, Text, Button } from '@chakra-ui/react'
 
export default function NotFound() {
    return (
        <>
            <Navbar /> 
            <Container maxW={containerBreakpoints} centerContent={true} p={0}>
                <Stack h="60dvh" spacing="1rem" justify="center" align="center">
                    <Heading>ไม่พบหน้านี้</Heading>
                    <Text>เนื้อหาที่คุณหาไม่เจอ โปรดตรวจสอบใหม่อีกครั้ง</Text>
                    <Button as={Link} variant="outline" href="/">กลับหน้าหลัก</Button>
                </Stack>
            </Container>
            <Footer/>
        </>
    )
}