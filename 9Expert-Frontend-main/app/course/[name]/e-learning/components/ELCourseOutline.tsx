'use client'

import { useSingleCourse } from "@/app/course/context/SingleCourseContext"
import { PDFFileIcon } from "@/app/icons/CourseIcon"
import { DownloadIcon } from "@chakra-ui/icons"
import { Button, HStack, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"

export const ELCourseOutline = () => {

    const { state } = useSingleCourse()

    return (
        <Stack
            w='100%'
            h='100%'
            align='center'
            justify='center'
            position='relative'
            spacing='30px'
        >
            {
                state.catalogURL && (
                    <Stack
                        w='100%'
                        h='144px'
                        shadow='lg'
                        align='center'
                        justify='center'
                        borderRadius='20px'
                        p='1.5rem'
                        bg='white'
                        display={{ base: 'none', '2xl': 'block' }}
                    >
                        <HStack
                            gap='1.5rem'
                        >
                            <PDFFileIcon w='68px' h='86px' />
                            <Stack
                                align='start'
                                justify='center'
                                spacing='3px'
                            >
                                <Text
                                    w='80%'
                                    fontSize='20px'
                                    textColor={useColorModeValue('#19B5FE', '#2E2E2E')}
                                    fontWeight='600'
                                >
                                    {`ดาวน์โหลด Course Outline`}
                                </Text>
                                <Button
                                    as={Link}
                                    href={state.catalogURL ? state.catalogURL : ''}
                                    target="_blank"
                                    w='131px'
                                    h='40px'
                                    color='white'
                                    fontSize='16px'
                                    bg={useColorModeValue('#19B5FE', '#2E2E2E')}
                                    borderRadius='100px'
                                    rightIcon={<DownloadIcon w='16px' h='16px' />}
                                >
                                    {`ดาวน์โหลด`}
                                </Button>
                            </Stack>
                        </HStack>
                    </Stack>
                )
            }
            <Stack
                w='100%'
                h={{ base: '144px', '2xl': '144px' }}
                shadow='lg'
                align='center'
                justify='center'
                borderRadius='20px'
                p={{ base: '0.5rem', xl: '1.5rem' }}
                bg={'#19B5FE'}
            >
                <Stack
                    gap={{ base: '0.5rem', '2xl': '1.5rem' }}
                    direction={{ base: 'row', '2xl': 'row' }}
                >
                    <Image
                        w={{ base: '100px', md: '150px' }}
                        h={{ base: '75px', md: '100px' }}
                        src='/online/1.png'
                        alt='online course'
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
                            {`ซื้อหลักสูตรนี้สำหรับองค์กร`}
                        </Text>
                        <Button
                            as={Link}
                            href={state.onlineUrl ? state.onlineUrl : ''}
                            target="_blank"
                            w='fit-content'
                            h='40px'
                            color={'white'}
                            fontSize={{ base: '14px', xl: '16px' }}
                            bg='#0B345D'
                            borderRadius='100px'
                            rightIcon={<DownloadIcon w='16px' h='16px' />}
                        >
                            {`ดาวน์โหลด`}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                w='100%'
                h={{ base: '144px', '2xl': '144px' }}
                shadow='lg'
                align='center'
                justify='center'
                borderRadius='20px'
                p={{ base: '0.5rem', xl: '1.5rem' }}
                bg={'linear-gradient(180deg, #56BDF9 0%, #5F2DED 100%)'}
            >
                <Stack
                    gap={{ base: '0.5rem', '2xl': '1rem' }}
                    direction={{ base: 'row', '2xl': 'row' }}
                >
                    <Image
                        w={{ base: '75px', md: '100px' }}
                        h={{ base: '75px', md: '100px' }}
                        src='/online/2.png'
                        alt='online course 2'
                        loading='lazy'
                    />
                    <Stack
                        align={{ base: 'start', '2xl': 'start' }}
                        justify={{ base: 'center', '2xl': 'center' }}
                        spacing='3px'
                    >
                        <Text
                            w='100%'
                            fontSize={{ base: '16px', xl: '20px' }}
                            textColor='white'
                            fontWeight='600'
                        >
                            {`ลงทะเบียนหลักสูตรนี้`}
                        </Text>
                        <Button
                            as={Link}
                            href={state.onlineUrl ? state.onlineUrl : ''}
                            target="_blank"
                            w='fit-content'
                            h='40px'
                            color={useColorModeValue('white', 'black')}
                            fontSize={{ base: '14px', xl: '16px' }}
                            bg='linear-gradient(180deg, #FEC84B 0%, #F79009 100%)'
                            borderRadius='100px'
                        >
                            {`สมัครเรียน`}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
