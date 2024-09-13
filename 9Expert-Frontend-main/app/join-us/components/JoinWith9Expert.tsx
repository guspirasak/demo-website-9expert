'use client'

import { Phone2Icon } from "@/app/icons/HomeIcons"
import { phoneNoStr } from "@/config/contact"
import { containerBreakpoints } from "@/config/theme"
import { Container, HStack, Heading, Image, ListItem, Stack, Text, UnorderedList, useColorModeValue } from "@chakra-ui/react"

export const JoinWith9Expert = () => {
    const bgColor = useColorModeValue('#013274', '#0C345D')
    const fontColor = useColorModeValue('#FFFFFF', '#FFFFFF')

    return (
        <Stack
            w='100%'
            id='contract'
            scrollMarginTop='150px'
            as='section'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bg='linear-gradient(180deg, #0B345D, #56BDF9)'
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w='100%'
                    bg={bgColor}
                    borderRadius='20px'
                    textColor={fontColor}
                    position='relative'
                    alignItems={{ base: 'center', lg: 'start' }}
                    flexDirection={{ base: 'column', lg: 'row' }}
                    p={{ base: '2rem', lg: '3rem' }}
                    spacing={{ base: '2rem', lg: '3rem' }}
                >
                    <Stack
                        w='250px'
                        h='250px'
                        align='center'
                        justify='center'
                        bg="#ffffff"
                        borderRadius='20px'
                        flexShrink={0}
                    >
                        <Image
                            w='160px'
                            h='160px'
                            src='/promotion/7.png'
                            alt="join icon"
                        />
                    </Stack>
                    <Stack
                        w='100%'
                        align={{ base: 'center', lg: 'start' }}
                        spacing={{ base: '1.25rem', lg: '1.5rem' }}
                    >
                        <Heading
                            textAlign={{ base: 'center', lg: 'start' }}
                            fontSize={{ base: '2rem', lg: '3rem' }}
                        >
                            ร่วมงานกับ 9Expert Training
                        </Heading>
                        <Text fontSize={{ base: '1rem', lg: '1.25rem' }}>
                            9Expert Training คือ สถาบันการฝึกอบรมคอมพิวเตอร์ที่สอนจากประสบการณ์ด้วยวิทยากรที่มีคุณภาพเราต้องการบุคคลากรที่มาร่วมงานดังนี้
                        </Text>
                        <UnorderedList
                            pl='20px'
                        >
                            <ListItem
                                fontSize={{ base: '1rem', lg: '1.25rem' }}
                            >
                                วิทยากรที่มีประสบการณ์ในการสอน (Instructor) มีความเชี่ยวชาญ และถ่ายทอดได้อย่างดี
                            </ListItem>
                            <ListItem
                                fontSize={{ base: '1rem', lg: '1.25rem' }}
                            >
                                พนักงานเสนอขายหลักสูตรอบรม จำนวนมาก
                            </ListItem>
                        </UnorderedList>
                        <Stack w='100%' spacing='1rem'>
                            <Text fontSize={{ base: '1rem', lg: '1.25rem' }}>
                                สนใจสมัครพร้อมส่งรายละเอียดมาที่
                            </Text>
                            <HStack spacing='1rem'>
                                <Image
                                    w='24px'
                                    h='24px'
                                    src='/contactus/email.svg'
                                    alt="email icon"
                                />
                                <Text
                                    fontSize={{ base: '1rem', lg: '1.25rem' }}
                                >
                                    Email : hr@9expert.co.th
                                </Text>
                            </HStack>
                            <HStack
                                spacing='1rem'
                            >
                                <Phone2Icon w='24px' h='24px' />
                                <Text
                                    fontSize={{ base: '1rem', lg: '1.25rem' }}
                                >
                                    โทร. {phoneNoStr}
                                </Text>
                            </HStack>
                        </Stack>
                    </Stack>
                </Stack>

            </Container>
        </Stack>
    )
}