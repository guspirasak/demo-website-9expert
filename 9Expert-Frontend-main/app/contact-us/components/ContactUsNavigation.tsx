'use client'

import { CallIcon, CompanyIcon, LocationCompanyIcon } from "@/app/icons/ContactIcon"
import { companyAddress, companyAddressEN, companyName, companyNameEN, googleMapEmbedded, googleMapUrl, mobileNoStr, phoneNoStr } from "@/config/contact"
import { containerBreakpoints } from "@/config/theme"
import { Button, Center, Container, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"

export const ContactUsNavigation = () => {
    const fontColor = useColorModeValue('#2E2E2E', '#EBEBEB')
    const buttonText = useColorModeValue('#ffffff', '#EBEBEB')
    const buttonBg = useColorModeValue('#1CA7EC', '#186BE2')

    return (
        <Stack
            as='section'
            w='100%'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
        >
            <Container p={0} maxW={containerBreakpoints} >
                <Stack
                    w='100%'
                    align='center'
                    justify='center'
                    spacing={{ base: '2rem', lg: '3rem' }}
                >
                    <Heading
                        as='h2'
                        fontSize={{ base: '2rem', lg: '3rem' }}
                        textColor={fontColor}
                        textAlign='center'
                    >
                        ตำแหน่งที่ตั้งของเรา
                    </Heading>
                    <Center
                        as='iframe'
                        title="map"
                        w='100%'
                        h='480px'
                        borderRadius='20px'
                        src={googleMapEmbedded}
                        allowFullScreen={false}
                        referrerPolicy="no-referrer-when-downgrade"
                    ></Center>
                    <Button
                        as={Link}
                        href={googleMapUrl}
                        variant="solid"
                        w="fit-content"
                        h="fit-content"
                        p="1.5rem"
                        bg={buttonBg}
                        borderRadius="20px"
                        fontSize="1.5rem"
                        textColor={buttonText}
                        _hover={{
                            color: '#ffffff',
                            bg: '#19B5FE'
                        }}>นำทางโดย Google Maps</Button>

                    <Stack
                        w='100%'
                        align='center'
                        justify='center'
                        mx='auto'
                        spacing='1rem'
                        direction={{ base: 'column', lg: 'row' }}
                    >
                        <LocationCompanyIcon w='70px' h='70px' />
                        <Stack
                            textAlign={{ base: 'center', lg: 'start' }}
                        >
                            <Heading
                                fontSize='1.25rem'
                                fontWeight='600'
                            >
                                {companyName}
                            </Heading>
                            <Text
                                fontSize='1.25rem'
                                fontWeight='400'
                            >
                                {companyAddress}
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}