'use client'

import { Stack } from "@chakra-ui/react"
import { CertificateBanner } from "./CertificateBanner"
import { Navbar } from "@/app/components/layout/Navbar"
import { CertificateContent } from "./CertificateContent"
import { useState } from "react"
import { TCertificate } from "@/app/admin/interface/CreateCertificate"
import { searchUserCertificates } from "@/services/api/search"

export const CertificatePage = () => {

    const [cers, setCers] = useState<TCertificate[]>([])

    const handleSearch = async (email: string) => {
        const result = await searchUserCertificates(email)
        setCers(result)
    }

    return (
        <>
            <Navbar />
            <Stack
                w='100%'
                h={{ base: '180px', lg: '380px' }}
                align='center'
                position='relative'
            >
                <CertificateBanner handleSearch={handleSearch} />
            </Stack>
            <Stack
                w='100%'
                h='100%'
                align='center'
                justify='center'
                position='relative'
            >
                <CertificateContent certificates={cers} />
            </Stack>
            {/* <Stack
                w='100%'
                h='min-content'
                minH='300px'
                mt={{ base: '3rem', lg: '10rem' }}
                mb='3rem'
                align='center'
                position='relative'
            >
                <Button
                    w='350px'
                    h='100px'
                    color='white'
                    fontSize='32px'
                    bgGradient='linear(135deg, rgba(64, 145, 244, 1), rgba(86, 189, 249, 1))'
                    _hover={{
                        bgGradient: 'linear(135deg, rgba(64, 145, 244, 1), rgba(86, 189, 249, 1))',
                    }}
                    _active={{
                        bgGradient: 'linear(135deg, rgba(64, 145, 244, 1), rgba(86, 189, 249, 1))',
                    }}
                >
                    {`แสดงเพิ่มเติม`}
                </Button>
            </Stack> */}
        </>
    )
}