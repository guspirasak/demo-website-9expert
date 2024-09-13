'use client'

import { GraduationCapIcon } from "@/app/icons/CardIcons"
import { containerBreakpoints } from "@/config/theme"
import { Button, Container, Image, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"

const PromotionButton = ({ buttonText, buttonBg, fontColor, href, fontSize, icon }: { buttonText: string, fontColor: string, buttonBg: string, href: string, fontSize: string, icon: JSX.Element }) => (
    <Button
        as={Link}
        variant="solid"
        w={{ base: '100%', lg: '400px' }}
        h='94px'
        bg={buttonBg}
        textColor={fontColor}
        fontSize={fontSize}
        borderRadius='20px'
        leftIcon={icon}
        href={href}
        _hover={{
            color: '#ffffff',
            bg: '#19B5FE'
        }}
    >
        {buttonText}
    </Button>
)

export const PromotionSubBanner = () => {
    const buttonBg = useColorModeValue('#1CA7EC', '#EBEBEB')
    const buttonTextColor = useColorModeValue('#ffffff', '#3B3B3B')
    const textColor = useColorModeValue('#ffffff', '#EBEBEB')
    const breakpoint = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <Stack
            w='100%'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            align='center'
            justify='center'
            bgImage='/promotion/promotion_sub_banner_bg.png'
            bgPosition='center'
            bgRepeat='no-repeat'
            bgSize='cover'
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w='100%'
                    align='center'
                    justify={{ base: 'center', lg: 'space-between' }}
                    direction={{ base: 'column-reverse', lg: 'row' }}
                    spacing={{ base: '1rem', lg: '0' }}
                >
                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='center'
                    >
                        <Image
                            alt='promotion element'
                            w={464}
                            h={380}
                            objectFit="contain"
                            src='/promotion/promotion_element.png'
                        />
                    </Stack>
                    <Stack
                        w='100%'
                        align='center'
                        justify='center'
                        textAlign='center'
                        spacing={{ base: '1rem', lg: '2rem' }}
                    >
                        <Text
                            textColor={textColor}
                            fontSize={{ base: '1.25rem', lg: '2rem' }}
                            fontWeight={400}
                        >
                            หลักสูตรที่ช่วยท่านเพิ่มพื้นฐานความรู้<br />ด้านออฟฟิศและดูแลระบบฐานข้อมูล<br />ได้อย่างมืออาชีพ
                        </Text>
                        <Text
                            fontSize={{ base: '2rem', lg: '3rem' }}
                            fontWeight={700}
                            bg='linear-gradient(180deg, #FF8E31 0%, #FEC84B 100%)'
                            backgroundClip='text'
                            textColor='transparent'
                        >
                            มากกว่า 50+ หลักสูตร
                        </Text>
                        {
                            breakpoint &&
                            <PromotionButton
                                buttonText="ดูหลักสูตรทั้งหมด"
                                buttonBg='#1CA7EC'
                                fontColor='#ffffff'
                                href="/course"
                                fontSize='1.5rem'
                                icon={<GraduationCapIcon w='50px' h='50px' />}
                            />
                        }
                    </Stack>
                </Stack>
                {
                    !breakpoint && <Stack w={{ base: '100%', md: '50%' }} mx="auto" justifyContent="center" px="2rem">
                        <PromotionButton
                            buttonText="ดูหลักสูตรทั้งหมด"
                            buttonBg='#1CA7EC'
                            fontColor='#ffffff'
                            href="/course"
                            fontSize='1.5rem'
                            icon={<GraduationCapIcon w='50px' h='50px' />}
                        />
                    </Stack>
                }
            </Container>
        </Stack>
    )
}        