'use client'

import { MagnifyingGlassIcon } from "@/app/icons/HomeIcons"
import { Button, Heading, Input, InputGroup, InputLeftAddon, Stack, useColorModeValue } from "@chakra-ui/react"
import { useRef } from "react"

export const CertificateBanner = ({ handleSearch }: { handleSearch: (email: string) => void }) => {

    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <Stack
            id="service-topic"
            w='100%'
            h='100%'
            align='center'
            justify='center'
            bgImage={useColorModeValue('url("/banner/course_banner_bg.png")', 'url("/banner/course_banner_bg_dark.png")')}
            backgroundSize='cover'
            color='white'
        >
            <Heading
                as='h1'
                w={{ base: '100%', lg: '50%' }}
                textAlign={{ base: 'center', lg: 'start' }}
                id="service-us"
                fontSize={{ base: '32px', lg: '48px' }}
            >
                {`ผลการค้นหาเกียรติบัตร :`}
            </Heading>
            <Stack
                w={{ base: '95%', lg: '50%' }}
                h={{ base: '40px', lg: '50px' }}
                align='start'
                justify='center'
                direction='row'
                spacing='38px'
                mt={{ base: '20px', lg: '45px' }}
            >
                <InputGroup
                    id="search-course"
                    as='h2'
                    w='100%'
                    h={{ base: '40px', lg: '50px' }}
                    bg='white'
                    alignItems='center'
                    borderRadius={{ base: '10px', lg: '16px' }}
                    border='0'
                >
                    <InputLeftAddon
                        h={{ base: '40px', lg: '50px' }}
                        bg='white'
                        border='0'
                        borderRadius={{ base: '10px', lg: '16px' }}
                    >
                        <MagnifyingGlassIcon color='#3A86FF' w='20px' h='20px' />
                    </InputLeftAddon>
                    <Input
                        ref={inputRef}
                        h={{ base: '40px', lg: '50px' }}
                        borderRadius={{ base: '10px', lg: '16px' }}
                        border='0'
                        placeholder='กรอกอีเมลล์ผู้ใช้งาน'
                        textColor='black'
                        _placeholder={{
                            fontSize: { base: '16px', lg: '24px' },
                        }}
                    />
                </InputGroup>
                <Button
                    w='153px'
                    h={{ base: '40px', lg: '50px' }}
                    bg='linear-gradient(180deg, #FEC84B 0%, #F79009 100%)'
                    fontSize={{ base: '16px', lg: '24px' }}
                    fontWeight='bold'
                    borderRadius='10px'
                    color='white'
                    onClick={() => handleSearch(inputRef.current?.value || '')}
                    _hover={{
                        bg: 'linear-gradient(180deg, #FEC84B 0%, #F79009 100%)',
                    }}
                    _active={{
                        bg: 'linear-gradient(180deg, #FEC84B 0%, #F79009 100%)',
                    }}
                >
                    {`ค้นหา`}
                </Button>
            </Stack>
        </Stack>
    )
}