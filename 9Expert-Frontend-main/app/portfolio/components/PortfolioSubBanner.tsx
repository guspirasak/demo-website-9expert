'use client'

import { containerBreakpoints } from "@/config/theme";
import { Container, Heading, Image, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { motion } from 'framer-motion';

const MotionStack = motion(Stack);

export const PortfolioSubBanner = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const bgImage = useColorModeValue('/portfolio/sub_banner_bg.png', '/portfolio/dark_sub_banner_bg.png')
    const bgColor = useColorModeValue('#1BA7EC', '#2E2E2E')
    const fontColor = useColorModeValue('#ffffff', '#EBEBEB')

    return (
        <Stack
            w="100%"
            h="100%"
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bgColor={bgColor}
            bgRepeat="no-repeat"
            bgPosition={{ base: 'center', lg: 'right' }}
            bgSize="cover"
            bgImage={{ base: 'none', lg: bgImage }}
        >
            <Container p={0} maxW={containerBreakpoints}>
                <MotionStack
                    w='100%'
                    h='480px'
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    spacing={{ base: '1.5rem', lg: '2rem' }}
                    align={{ base: 'center', lg: 'start' }}
                    justify='center'
                    textAlign={{ base: 'center', lg: 'start' }}
                    textColor={fontColor}
                >
                    <Heading
                        maxW={{ base: '16ch', lg: '24ch' }}
                        fontSize={{ base: '1.5rem', lg: '2.5rem' }}
                    >
                        ด้วยหลักสูตรที่ครอบคุม ทั้งในด้านการวางแผน และระบบฐานข้อมูล
                    </Heading>
                    <Text
                        maxW={{ base: '26ch', lg: '47ch' }}
                        fontSize={{ base: '1rem', lg: '1rem' }}
                        textColor={'#C5DCFA'}
                    >
                        เรียนจบพร้อมใช้งานได้จริง สามารถนำไปพัฒนาระบบภายในองค์กรของท่านได้อย่างมีประสิทธิภาพ
                    </Text>
                    <Stack w="100%" mx="auto" p="1rem" align="center" justify="center">
                        {!isDesktop && <Image fit="contain" src="/portfolio/sub_banner_mobile.png" alt="bg image mobile" />}
                    </Stack>
                </MotionStack>
            </Container>
        </Stack>
    );
}