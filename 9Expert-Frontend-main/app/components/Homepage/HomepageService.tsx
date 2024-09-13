'use client'

import { Box, Heading, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"

export const HomepageService = () => {
    const cardBg = useColorModeValue('#F8FAFC', '#3B3B3B')
    const cardCenterBg = useColorModeValue('white', '#3B3B3B')
    const textColor = useColorModeValue('blackAlpha.900', 'white')

    return (
        <Box
            w='100%'
            h='100%'
            position='relative'
            display={{ base: 'flex', lg: 'block' }}
            flexDirection='column'
            alignItems={{ base: 'center', lg: 'none' }}
            justifyContent={{ base: 'center', lg: 'none' }}
        >
            <Box
                w='100%'
                h='480px'
                bg='#3A86FF'
            >
            </Box>
            <Box
                w='100%'
                h={{ base: '760px', lg: '220px' }}
            >
            </Box>
            <Stack

                py={{ base: '2rem', lg: '4rem' }}
                zIndex='1'
                position='absolute'
                w={{ base: '90%', lg: '100%' }}
                h='100%'
                align='center'
                justify='center'
                top='0'
                left={{ base: 'none', lg: '0' }}
                color='white'
                spacing='1rem'
            >
                <Heading
                    as='h2'
                    size={{ base: 'lg', md: '2xl' }}
                >
                    บริการของเรา
                </Heading>
                <Text
                    maxW="65ch"
                    textAlign='center'
                    fontSize={{ base: 'md', lg: 'xl' }}
                >
                    9Expert Training คือ สถาบันฝึกอบรมคอมพิวเตอร์ระดับมืออาชีพ ที่เปิดสอนให้กับบุคคลทั่วไป และระดับองค์กรด้วยการสอนให้รู้จริง ใช้งานได้จริง วิธีการสอนที่เข้าใจง่าย ด้วยวิทยากรที่มีคุณภาพและมีประสบการณ์จริง
                </Text>
                <Stack
                    w={{ base: '100%', lg: '90%' }}
                    direction={{ base: 'column', lg: 'row' }}
                    align={{ base: 'center', lg: 'none' }}
                    justify={{ base: 'center', lg: 'center' }}
                    spacing='24px'
                    color={textColor}
                >
                    <Stack
                        w={{ base: '100%', lg: '30%' }}
                        maxW='545px'
                        h='280px'
                        bg={cardBg}
                        borderRadius='24px'
                        align='center'
                        justify='center'
                        p='3rem'
                    >
                        <Image
                            w='60px'
                            h='60px'
                            alt='teacher icon'
                            src={useColorModeValue('/icons/teacher_light.png', '/icons/teacher_dark.png')}
                            loading="lazy"
                        />
                        <Heading as='h3' size='md'>{`สอนสด (Public Training) `}</Heading>
                        <Text textAlign='center' >{`อบรมสดกับวิทยากรมืออาชีพ ทั้งClass room ณ สถาบัน 9Expert Training และ เรียนสดผ่าน MS Teams ตามรอบอบรมที่ 9Expert Training กำหนด`}</Text>
                    </Stack>
                    <Stack
                        w={{ base: '100%', lg: '30%' }}
                        maxW='545px'
                        h='280px'
                        bg={cardCenterBg}
                        shadow='lg'
                        borderRadius='24px'
                        align='center'
                        justify='center'
                        p='3rem'
                    >
                        <Image
                            w='60px'
                            h='60px'
                            alt='ebook icon'
                            src={useColorModeValue('/icons/ebook_light.png', '/icons/ebook_dark.png')}
                            loading="lazy"
                        />
                        <Heading as='h3' size='md'>{`E-Learning`}</Heading>
                        <Text textAlign='center' >{`หลักสูตรการอบรมสอนสไตล์ใช้งานจริง ด้วยวิทยากรมากประสบการณ์ จาก 9Expert Training ในรูปแบบ  Video`}</Text>
                    </Stack>
                    <Stack
                        w={{ base: '100%', lg: '30%' }}
                        maxW='545px'
                        h='280px'
                        bg={cardBg}
                        borderRadius='24px'
                        align='center'
                        justify='center'
                        p='3rem'
                    >
                        <Image
                            w='60px'
                            h='60px'
                            alt='tutor icon'
                            src={useColorModeValue('/icons/tutor_light.png', '/icons/tutor_dark.png')}
                            loading="lazy"
                        />
                        <Heading as='h3' size='md'>{`สอนนอกสถานที่`}</Heading>
                        <Text textAlign='center' >{`สามารถลือกจัดอบรม On-site ณ สถานที่ของท่าน หรือ   Virtual Trainingเรียนสดผ่าน MS Teams`}</Text>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}