'use client'

import { ISingleCourseContext, useSingleCourse } from "@/app/course/context/SingleCourseContext"
import { PDFFileIcon } from "@/app/icons/CourseIcon"
import { DownloadIcon } from "@chakra-ui/icons"
import { Button, HStack, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"

export const LiveCourseOutline = () => {

    const { state, setState }: ISingleCourseContext = useSingleCourse()

    return (
        <Stack
            w='100%'
            h='144px'
            shadow='lg'
            align='center'
            justify='center'
            borderRadius='20px'
            p='1.5rem'
            bg='white'
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
                        href={state.catalogURL ? state.catalogURL : '#'}
                        target="_blank"
                        w='131px'
                        h='40px'
                        color='white'
                        fontSize='16px'
                        bg={useColorModeValue('#19B5FE', '#2E2E2E')}
                        borderRadius='100px'
                        rightIcon={<DownloadIcon w='16px' h='16px' />}
                        _hover={{ bg: useColorModeValue('#19B5FE', '#323232') }}
                    >
                        {`ดาวน์โหลด`}
                    </Button>
                </Stack>
            </HStack>
        </Stack>
    )
}
