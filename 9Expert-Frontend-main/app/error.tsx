'use client' // Error components must be Client Components
 
import { facebookUrl } from '@/config/contact'
import { containerBreakpoints } from '@/config/theme'
import { Container, Stack, Text, Heading, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect } from 'react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
 
export default function ErrorPage({
    error,
    reset,
}: {
    readonly error: Error & { digest?: string }
    readonly reset: () => void
}) {
    useEffect(() => {
    // Log the error to an error reporting service
        console.error(error)
    }, [error])
 
    return (
        <>
            <Navbar /> 
            <Container maxW={containerBreakpoints} centerContent={true} p={0}>
                <Stack h="60dvh" spacing="1rem" justify="center" align="center">
                    <Heading>เกิดข้อผิดพลาด!</Heading>
                    <Text>ขออภัยในความไม่สะดวก โปรดตรวจสอบใหม่อีกครั้งภายหลัง</Text>
                    <Button as={Link} variant="solid" target="_blank" href={facebookUrl} >ติดต่อเจ้าหน้าที่</Button>
                </Stack>
            </Container>
            <Footer/>
        </>
    )
}