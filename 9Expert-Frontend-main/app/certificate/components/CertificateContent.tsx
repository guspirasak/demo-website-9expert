'use client'

import { TCertificate } from "@/app/admin/interface/CreateCertificate"
import { CertificateCard } from "@/app/components/ContentCard/CertificateCard"
import { Box, Container, Heading, Stack, useBreakpointValue, Wrap, WrapItem } from "@chakra-ui/react"

export const CertificateContent = ({ certificates }: { certificates: TCertificate[] }) => {

    const breakpoint = useBreakpointValue({ base: false, lg: true })

    return (
        <>
            <Stack
                w='100%'
                h='100%'
                mt='91px'
                mb='125px'
            >
                <Container
                    maxW='80%'
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='start'
                        justify='center'
                    >
                        <Stack
                            w='100%'
                            align='center'
                            justify={{ base: 'center', lg: 'space-between' }}
                            direction='row'
                            borderBottom={{ base: '2px', lg: 'none' }}
                            borderColor='exBlue'
                            pb={{ base: '10px', lg: '0' }}
                        >
                            <Heading
                                w='fit-content'
                                minW='fit-content'
                                fontSize={{ base: '24px', lg: '50px' }}
                                fontWeight='extrabold'
                                textAlign={{ base: 'center', lg: 'start' }}
                            >
                                {`เกียรติบัตร`}
                            </Heading>
                            {
                                breakpoint &&
                                <Box
                                    w='100%'
                                    h='0px'
                                    ml='75px'
                                    border='2px'
                                    borderColor='#4185E7'
                                    borderRadius='full'
                                >

                                </Box>
                            }
                        </Stack>
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        mt='91px'
                        align='center'
                        justify='center'
                    >
                        <Wrap
                            h='100%'
                            spacing='50px'
                        >
                            {
                                certificates.length > 0 && certificates.map((course, index) => (
                                    course.user.map((user) => (
                                        <WrapItem
                                            key={user.certificateNo}
                                        >
                                            <CertificateCard courseId={course.courseId} user={user} />
                                        </WrapItem>
                                    ))
                                ))
                            }
                        </Wrap>
                    </Stack>
                </Container>
            </Stack>
        </>
    )
}