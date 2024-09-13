'use client'

import { jobsList } from "@/config/join-us"
import { containerBreakpoints } from "@/config/theme"
import { AspectRatio, Button, Container, Heading, Image, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import JobAccordion from "./JobAccordion"
import { useEffect, useState } from "react"
import { getJob } from "@/libs/UserAPI"

export type TRecruit = {
    _id?: string;
    icon: string;
    role: string;
    description: string;
    requirement: string;
    createAt?: string;
    isActive?: boolean;
    isDeleted?: boolean;
};

export const JoinUsFullTime = () => {
    const buttonBg = useColorModeValue('#1CA7EC', '#03418D')
    const fontColor = useColorModeValue('#ffffff', '#EBEBEB')

    const [job, setJob] = useState<TRecruit[]>([])

    useEffect(() => {
        getJob((data: TRecruit[], error: unknown) => {
            if (error) console.log(error)
            if (data) setJob(data)
        })
    }, [])

    return (
        <Stack
            w='100%'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bg='#0B345D'
        >
            <Container p={0} maxW={containerBreakpoints} >
                <Stack
                    w='100%'
                    align='center'
                    justify='space-between'
                    direction={{ base: 'column', lg: 'row' }}
                    spacing={{ base: '2rem', lg: '3rem' }}
                >
                    <Stack
                        w={{ base: '100%', lg: '438px' }}
                        h='100%'
                        align='center'
                        justify='center'
                    >
                        <AspectRatio
                            ratio={438 / 568}
                            w={{ base: '315px', lg: '438px' }}
                            h={{ base: '409px', lg: '568px' }}
                        >
                            <Image
                                borderRadius='20px'
                                alt='join us full time'
                                w='100%'
                                src='/join_us/join_us_full.png'
                            />
                        </AspectRatio>
                    </Stack>
                    <Stack
                        w='100%'
                        align='center'
                        justify='center'
                        spacing={{ base: '2rem', lg: '3rem' }}
                    >
                        <Stack
                            align='center'
                            justify='center'
                            spacing={0}
                        >
                            <Heading
                                textColor='white'
                                fontSize={{ base: '2rem', lg: '3rem' }}
                            >
                                พนักงานประจำ
                            </Heading>
                            <Text
                                textColor='#C5DCFA'
                                fontSize={{ base: '1rem', lg: '1.5rem' }}
                            >
                                Fulltime
                            </Text>
                        </Stack>
                        <Stack
                            w='100%'
                            align='center'
                            justify='center'
                            spacing={{ base: '2rem', lg: '3rem' }}
                        >
                            {job.map((job) => (
                                <JobAccordion key={job._id} job={job} />
                            ))}
                        </Stack>
                        <Stack w="100%" direction='row' justify='end'>
                            <Button
                                onClick={() => document.getElementById('contract')?.scrollIntoView({ behavior: 'smooth' })}
                                variant="solid"
                                w="fit-content"
                                h="fit-content"
                                p="1.5rem"
                                bg={buttonBg}
                                borderRadius="20px"
                                fontSize={{ base: '1.5rem', lg: '1.5rem' }}
                                textColor={fontColor}
                                _hover={{
                                    color: '#ffffff',
                                    bg: '#19B5FE'
                                }}
                            >
                                ติดต่อเพื่อสมัครงาน
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}