'use client'

import { professorMission } from "@/config/about-us";
import { containerBreakpoints } from "@/config/theme";
import type { HTMLChakraProps } from "@chakra-ui/react";
import { AspectRatio, Box, Center, Container, Heading, Highlight, Image, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";

const ProfileNameTag = ({ cardBgColor, position, ...props }: { cardBgColor: string, position: 'relative' | 'absolute', props?: HTMLChakraProps<'div'> }) => {
    return (<Stack
        p='1rem'
        bg={cardBgColor}
        backdropFilter='blur(20px)'
        borderRadius='20px'
        align='center'
        justify='center'
        textAlign='center'
        spacing='0.25rem'
        zIndex='4'
        position={position}
        bottom={{ base: '-20px', lg: '60px' }}
        right={{ base: '', lg: '10%', '4xl': '13%', '5xl': '17%' }}
        {...props}
    >
        <Heading size='md' mb='0.25rem' >อ.ชไลเวท พิพัฒพรรณวงศ์</Heading>
        <Text>ผู้อำนวยการฝ่ายฝึกอบรม</Text>
        <Text fontSize='sm' >บริษัท นายน์เอ็กซ์เพิร์ท จำกัด Microsoft MVP Power BI</Text>
    </Stack>)
}
export const AboutUsSpeech = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const bgColor = useColorModeValue('linear-gradient(180deg, #C5DCFA, #19B5FE)', 'linear-gradient(180deg, #0B345D, #19B5FE)')
    const fontColor = useColorModeValue('#2E2E2E', '#ffffff')
    const cardBgColor = useColorModeValue('#FFFFFFCC', '#2E2E2E99')
    const titleColor = useColorModeValue('#0B345D', '#ffffff')

    return (
        <Stack
            as="section"
            w='100%'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            minH='800px'
            align='center'
            justify={{ base: 'start', lg: 'center' }}
            position='relative'
            overflow='hidden'
            bg={bgColor}
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w='100%'
                    justifyContent='space-between'
                    spacing={{ base: '2rem', lg: '4rem' }}
                    flexDirection={{ base: 'column', lg: 'row' }}
                    position='relative'
                    align='center'
                >
                    {
                        isDesktop ?
                            <Text
                                zIndex={1}
                                w='60ch'
                                fontSize={{ base: '1.5rem', lg: '2rem' }}
                                textColor={fontColor}
                                textAlign='center'
                            >
                                <Highlight query='9EXPERT'>
                                    {professorMission}
                                </Highlight>
                            </Text>
                            :
                            <Stack
                                w='100%'
                                h='100%'
                                align='center'
                                justify='center'
                                spacing='2rem'
                            >
                                <Heading
                                    fontSize='2rem'
                                    textColor={titleColor}
                                >
                                    9EXPERT
                                </Heading>
                                <Text
                                    textAlign='center'
                                    fontSize='1.25rem'
                                    textColor={fontColor}
                                >{professorMission}</Text>
                            </Stack>
                    }
                    <Center
                        w='100%'
                        h='100%'
                        minH={{ base: '500px', lg: '600px' }}
                        position='relative'
                    >
                        <Box
                            w={{ base: '300px', sm: '320px', lg: '683px' }}
                            h={{ base: '300px', sm: '320px', lg: '683px' }}
                            border='4px'
                            borderColor='#3A86FF'
                            borderRadius='60px'
                            transform='rotate(11deg)'
                            position='absolute'
                        ></Box>
                        <Box
                            w={{ base: '300px', sm: '320px', lg: '680px' }}
                            h={{ base: '300px', sm: '320px', lg: '680px' }}
                            bg='linear-gradient(180deg, #19B5FEEE, #4091F4EE)'
                            borderRadius='60px'
                            transform='rotate(-8deg)'
                            position='absolute'
                        ></Box>
                        <Box
                            w={{ base: '38px', lg: '87px' }}
                            h={{ base: '38px', lg: '87px' }}
                            bg='white'
                            borderRadius={{ base: '5px', lg: '20px' }}
                            transform='rotate(-35deg)'
                            position='absolute'
                            top={{ base: '80px', lg: '-80px' }}
                            left={{ base: '25px', lg: '30px' }}
                        ></Box>
                        <Box
                            w={{ base: '22px', lg: '52px' }}
                            h={{ base: '22px', lg: '52px' }}
                            bg='white'
                            borderRadius={{ base: '5px', lg: '20px' }}
                            transform='rotate(-35deg)'
                            position='absolute'
                            top={{ base: '400px', lg: '280px' }}
                            right={{ base: '40px', lg: '20px' }}
                        ></Box>
                        <AspectRatio
                            ratio={515 / 756}
                            w={{ base: '348px', lg: '515px' }}
                            h={{ base: '450px', lg: '756px' }}
                            position='absolute'
                            bottom={{ base: '40px', lg: '-165px' }}
                        >
                            <Image
                                alt="professor"
                                src='/aboutus/professor.png'
                            />
                        </AspectRatio>
                        {
                            !isDesktop &&
                            <ProfileNameTag
                                cardBgColor={cardBgColor}
                                position='absolute'
                            />
                        }
                    </Center>
                </Stack>
                {
                    isDesktop &&
                    <ProfileNameTag
                        cardBgColor={cardBgColor}
                        position='absolute'
                    />
                }
            </Container>
        </Stack>
    )
}