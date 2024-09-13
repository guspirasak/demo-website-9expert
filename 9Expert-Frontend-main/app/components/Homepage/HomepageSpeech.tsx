'use client'

import { containerBreakpoints } from "@/config/theme";
import { Container, Heading, Highlight, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { motion } from 'framer-motion';

const MotionStack = motion(Stack);
const MotionImage = motion(Image);

export const HomepageSpeech = () => {
    const logo = useColorModeValue('/logo/9expert.png', '/logo/9expert_dark.png')
    const bgColor = useColorModeValue('linear(rgba(211, 235, 251, 1), rgba(217, 222, 255, 1))', 'linear(rgba(11, 52, 93, 0.1), #0B345D)')
    const cardBgColor = useColorModeValue('#FFFFFFCC', '#2E2E2E99')
    const bTextColot = useColorModeValue('black', 'white')

    return (
        <Stack
            w="100%"
            h="100%"
            minH="600px"
            align="center"
            justify="center"
            bgGradient={bgColor}
        >
            <Stack
                w="100%"
                h="100%"
                maxW={containerBreakpoints}
                minH="600px"
                align="center"
                justify="center"
                position="relative"
                px={{ base: '2rem', lg: '4rem' }}
                py={{ base: '3rem', lg: '4rem' }}
            >
                <Image
                    src={logo}
                    objectFit='contain'
                    alt="9expert logo"
                    position={{ base: 'static', lg: 'absolute' }}
                    width={140}
                    height={47}
                    top={{ base: '3rem', lg: '4rem' }}
                    left={{ base: '3rem', lg: '4rem' }}
                    loading="lazy"
                />
                <Stack
                    spacing={{ base: '2rem', lg: '3rem' }}
                    position={{ base: 'static', lg: 'absolute' }}
                    top="40%"
                    left={{ base: '10%', lg: '14%' }}
                    align={{ base: 'center', lg: 'start' }}
                >
                    <MotionStack
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        textAlign={{
                            base: 'center',
                            lg: 'start',
                            '2xl': 'center',
                        }}
                        fontSize={{ base: 'lg', lg: '2xl' }}
                        w={{ base: '100%', lg: '' }}
                        justify={{ base: 'center', lg: 'start' }}
                    >
                        <Text maxW="45ch">เราจะเป็นส่วนของการสนับสนุนให้กับบุคคลและองค์กร
                            <br />
                            ในการปรับตัวตามความเปลี่ยนแปลงของเทคโนโลยี
                            <br />
                            ให้ทันยุคสมัยใหม่เพื่อนำมาเพิ่มประสิทธิภาพการทำงาน
                            <br />
                            สร้างความได้เปรียบในการทำงาน
                            {` `}
                            <Text as='b'>{`ให้เหนือคู่แข่ง`}</Text>
                            {/* <Heading display='inline' lineHeight='tall'>
                            <Highlight
                                query='spotlight'
                            >
                                ให้เหนือคู่แข่ง
                            </Highlight>
                        </Heading> */}
                        </Text>
                    </MotionStack>
                    <MotionStack
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        w="100%"
                        display={{ base: 'none', lg: 'flex' }}
                        align="center"
                        justify="center"
                    >
                        <Stack w="fit-content" spacing="0" textAlign="center">
                            <Text
                                as="b"
                                fontSize="1.25rem"
                            >อ.ชไลเวท พิพัฒพรรณวงศ์</Text>
                            <Text
                                mt="0.25rem"
                                fontSize="1rem"
                            >ผู้อำนวยการฝ่ายฝึกอบรม</Text>
                            <Text fontSize="1rem">บจก.นายน์เอ็กซ์เพิร์ท</Text>
                        </Stack>
                    </MotionStack>
                </Stack>
                <MotionImage
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    alt="professor"
                    display={{ base: 'none', lg: 'block' }}
                    src="/aboutus/professor.png"
                    h="600px"
                    position="absolute"
                    right="0"
                    bottom="0"
                    loading="lazy"
                />
                <Stack
                    w="100%"
                    h="100%"
                    display={{ base: 'block', lg: 'none' }}
                    align="center"
                    justify="center"
                >
                    <Stack w="100%" align="center" justify="center" spacing="0">
                        <Image
                            alt="professor-mb"
                            src="/aboutus/professor.png"
                            h="400px"
                            position="static"
                            loading="lazy"
                        />
                        <Stack
                            w="345px"
                            p="1rem"
                            bg={cardBgColor}
                            backdropBlur='20px'
                            borderRadius="20px"
                            align="center"
                            justify="center"
                            textAlign="center"
                            spacing="0.25rem"
                        >
                            <Heading
                                size="md"
                                mb="0.25rem"
                            >อ.ชไลเวท พิพัฒพรรณวงศ์</Heading>
                            <Text>ผู้อำนวยการฝ่ายฝึกอบรม</Text>
                            <Text fontSize="sm">บริษัท นายน์เอ็กซ์เพิร์ท จำกัด Microsoft MVP Power BI</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}