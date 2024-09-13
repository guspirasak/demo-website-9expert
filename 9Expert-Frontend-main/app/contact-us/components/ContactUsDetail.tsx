'use client'

import { addressName, addressName2, buildingName, instructorEmail, mobileNoStr, phoneNoStr, trainingEmail } from "@/config/contact"
import { containerBreakpoints } from "@/config/theme"
import { Box, Container, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"

const ContactCard = ({ iconSrc, alt, fontColor, cardBg, children }: { iconSrc: string, alt: string, fontColor: string, cardBg: string, children: React.ReactElement }) => {
    return (<Stack
        w='100%'
        h='290px'
        align='center'
        justify='center'
        shadow='md'
        borderRadius='20px'
        textAlign='center'
        textColor={fontColor}
        bg={cardBg}
        spacing='2rem'
    >

        <Image
            w='100px'
            h='100px'
            alt={alt}
            src={iconSrc}
        />
        <Box>
            {children}
        </Box>
    </Stack>)
}

export const ContactUsDetail = () => {
    const cardBg = useColorModeValue('#FFFFFF', '#FFFFFF11')
    const bgColor = useColorModeValue('#F4F7FB', '#24262A')
    const fontColor = useColorModeValue('#3B3B3B', '#EBEBEB')

    return (
        <Stack
            as="section"
            w="100%"
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem' }}
            bgColor={bgColor}
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w='100%'
                    h='100%'
                    align='center'
                    justify='space-around'
                    direction={{ base: 'column', lg: 'row' }}
                    spacing={{ base: '2rem', lg: '3rem' }}
                >
                    <ContactCard
                        fontColor={fontColor}
                        cardBg={cardBg}
                        iconSrc='/contactus/location.svg'
                        alt='location'
                    >
                        <>
                            <Text
                                fontSize='1.25rem'
                            >
                                {buildingName}
                            </Text>
                            <Text
                                fontSize='1.25rem'
                            >
                                {addressName}
                            </Text>
                            <Text
                                fontSize='1.25rem'
                            >
                                {addressName2}
                            </Text>
                        </>
                    </ContactCard>
                    <ContactCard
                        fontColor={fontColor}
                        cardBg={cardBg}
                        iconSrc='/contactus/phone.svg'
                        alt='phone'
                    >
                        <>
                            <Text
                                fontSize='1.25rem'
                            >
                                โทรศัพท์: {phoneNoStr}
                            </Text>
                        </>
                    </ContactCard>
                    <ContactCard
                        fontColor={fontColor}
                        cardBg={cardBg}
                        alt='email'
                        iconSrc='/contactus/email.svg'
                    >
                        <>
                            <Text
                                fontSize='1.25rem'
                            >
                                ฝ่ายฝึกอบรม / ทีมวิทยากร
                            </Text>
                            <Text
                                fontSize='1.25rem'
                            >
                                {trainingEmail} <br /> {instructorEmail}
                            </Text>
                        </>
                    </ContactCard>
                </Stack>
            </Container>
        </Stack>
    )
}