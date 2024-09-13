'use client'

import { containerBreakpoints } from "@/config/theme";
import { Center, Container, Stack, Image, Text, HStack, Divider, Heading, useColorModeValue, Box } from "@chakra-ui/react"
import { motion } from 'framer-motion';

const MotionStack = motion(Stack);

export const AboutUs9Expert = () => {
    const fontColor = useColorModeValue('#19B5FE', '#ffffff');
    const titleColor = useColorModeValue('#161921', '#ffffff');
    const descriptionColor = useColorModeValue('#2E2E2E70', '#ffffff');
    return (
        <MotionStack
            as="section"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            w='100%'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w='100%'
                    align='center'
                    justify='space-between'
                    direction={{ base: 'column', lg: 'row' }}
                    spacing={{ base: '2rem', lg: '4rem' }}
                >
                    <Stack
                        w='100%'
                        align='center'
                        position="relative"
                    >
                        <Box
                            w={{ base: '280px', lg: '374px' }}
                            h={{ base: '228px', lg: '274px' }}
                            position='absolute'
                            borderRadius='20px'
                            bg='#19B5FE'
                            top={{ base: '-30px', lg: '-20px' }}
                            left={{ base: '-14px', lg: '-20px', '2xl': '40px' }}
                            opacity="0.2"
                        ></Box>
                        <Image
                            maxW='550px'
                            w="100%"
                            src="/aboutus/image1.png"
                            alt="photo of customer"
                            zIndex="1"
                            borderRadius="20px"
                        />
                    </Stack>
                    <Stack
                        w='100%'
                        align={{ base: 'center', lg: 'start' }}
                        justify='center'
                        spacing='1rem'
                    >
                        <HStack
                            w='100%'
                            justify={{ base: 'center', lg: 'start' }}
                        >
                            <Text
                                textColor={fontColor}
                                fontSize="1.5rem"
                            >
                                About 9Expert
                            </Text>
                            <Divider
                                border='2px'
                                borderColor="#19B5FE"
                                w='80px'
                            />
                        </HStack>
                        <Heading
                            textAlign={{ base: 'center', lg: 'start' }}
                            textColor={titleColor}
                            fontSize={{ base: '1.75rem', lg: '2.75rem' }}
                        >
                            9EXPERT TRAINING คือ
                        </Heading>
                        <Text
                            textAlign={{ base: 'center', lg: 'start' }}
                            fontSize={{ base: '1rem', lg: '1.25rem' }}
                            maxW='54ch'
                            textColor={descriptionColor}
                        >
                            สถาบันฝึกอบรมคอมพิวเตอร์ระดับมืออาชีพ ที่เปิดสอนให้กับบุคคลทั่วไปด้วยสอนให้รู้จริง ใช้งานได้จริง วิธีการสอนที่เข้าใจง่าย ด้วยวิทยากรที่มีคุณภาพและมีประสบการณ์จริง ไม่ว่าจะเป็นการสอนโปรแกรมสำหรับการใช้งานสำนักงาน, การพัฒนาโปรแกรม, หรือการวิเคราะห์ข้อมูล ระบบฐานข้อมูล, AI, RPA ทุกหลักสูตรถูกออกแบบจากโลกการทำงานจริง เพื่อนำคุณค่าที่ดีที่สุด มอบให้กับผู้อบรม
                        </Text>
                    </Stack>
                </Stack>
            </Container>
        </MotionStack>
    );
}