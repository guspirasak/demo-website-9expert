'use client'
import { DownloadIcon } from "@chakra-ui/icons"
import { Button, Image, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react"

export const LiveCourseRegister = ({ id }: { id: string }) => {
    return (
        <Stack
            w='100%'
            h={{ base: '144px', '2xl': '144px' }}
            shadow='lg'
            align='center'
            justify='center'
            borderRadius='20px'
            p={{ base: '0.5rem', xl: '0.5rem' }}
            bg={useColorModeValue('#0B345D', '#0E4174')}
        >
            <Stack
                gap={{ base: '0.5rem', '2xl': '0.25rem' }}
                direction={{ base: 'row', '2xl': 'row' }}
            >
                <Image
                    w={{ base: '100px', md: '100px' }}
                    h={{ base: '75px', md: '75px' }}
                    src='/course/register.png'
                    alt='register image'
                    loading='lazy'
                />
                <Stack
                    align={{ base: 'start', '2xl': 'start' }}
                    justify={{ base: 'center', '2xl': 'center' }}
                    spacing='3px'
                >
                    <Text
                        w='80%'
                        fontSize={{ base: '16px', xl: '20px' }}
                        textColor='white'
                        fontWeight='600'
                    >
                        {`ลงทะเบียนหลักสูตรนี้ สำหรับองค์กร`}
                    </Text>
                    <Button
                        as={Link}
                        href={`/register/inhouse?course=${id}`}
                        variant="ghost"
                        w='fit-content'
                        h='40px'
                        color={useColorModeValue('white', 'black')}
                        fontSize={{ base: '14px', xl: '16px' }}
                        bg='#19B5FE'
                        borderRadius='100px'
                        rightIcon={<DownloadIcon w='16px' h='16px' />}
                        _hover={{ bg: '#19B5FE' }}
                    >
                        ลงทะเบียน / สำรองที่นั่ง
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}