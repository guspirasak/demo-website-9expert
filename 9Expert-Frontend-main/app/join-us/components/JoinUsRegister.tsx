'use client'

import { Button, Center, Heading, Image, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const MotionStack = motion(Stack);

interface RegisterCardProps {
    bgImageSrc: string,
    title: string,
    subtitle: string,
    buttonLabel: string,
    iconSrc: string
}

const LeftElement = () => {

    const [hover, setHover] = useState<boolean>(false)

    const variants = {
        hover: {
            height: '480px',
            alignItems: 'start',
            justyifyContent: 'start',
            paddingLeft: '74px',
            paddingRight: '74px',
            paddingTop: '53px',
            paddingBottom: '53px',
            flexDirection: 'row',
            transition: { duration: 0.3 }
        },
    }

    return (
        <MotionStack
            w='100%'
            h='100%'
            minH='1114px'
            align='center'
            justify='end'
            position='relative'
            bgImage='/join_us/bg_1.png'
            bgPos='center'
            bgRepeat='no-repeat'
            bgSize='cover'
            whileHover='hover'
            onHoverEnd={() => setHover(true)}
        >
            <MotionStack
                w='100%'
                h='1114px'
                align='center'
                justify='center'
                px='0'
                py='0'
                position='relative'
                bg='linear-gradient(180deg, #0B345DB2, #000000B2)'
                spacing='50px'
                direction='column'
                variants={variants}
            >
                {
                    hover ?
                        <>
                            <Center
                                w='154px'
                                h='154px'
                                bg='#FFFFFF99'
                                borderRadius='44px'
                            >
                                <Image
                                    w='100px'
                                    h='100px'
                                    src='/promotion/1.png'
                                    alt="promotion"
                                />
                            </Center>
                            <Stack
                                align='center'
                                justify='center'
                            >
                                <Heading
                                    textColor='white'
                                    fontSize='48px'
                                    fontWeight='700'
                                >
                                    {`ผู้ช่วยอาจารย์`}
                                </Heading>
                                <Text
                                    textColor='white'
                                    fontSize='28px'
                                    fontWeight='400'
                                >
                                    {`( PART-TIME )`}
                                </Text>
                            </Stack>
                            <Button
                                w='390px'
                                h='81px'
                                bg='#03418D'
                                borderRadius='15px'
                                color='white'
                                fontSize='30px'
                                fontWeight='400'
                                position='absolute'
                                bottom='53px'
                                right='45px'
                                onClick={() => document.getElementById('contract')?.scrollIntoView({ behavior: 'smooth' })}
                                _hover={{
                                    bg: '#03418D',
                                }}
                                _active={{
                                    bg: '#03418D',
                                }}
                            >
                                {`ติดต่อฝึกงาน`}
                            </Button>
                        </>
                        :
                        <>
                            <Stack
                                align='center'
                                justify='center'
                            >
                                <Heading
                                    textColor='white'
                                    fontSize='72px'
                                    fontWeight='700'
                                >
                                    {`ผู้ช่วยอาจารย์`}
                                </Heading>
                                <Text
                                    textColor='white'
                                    fontSize='36px'
                                    fontWeight='400'
                                >
                                    {`( PART-TIME )`}
                                </Text>
                            </Stack>
                            <Center
                                w='287px'
                                h='300px'
                                bg='#FFFFFF99'
                                borderRadius='44px'
                            >
                                <Image
                                    w='206px'
                                    h='206px'
                                    src='/promotion/1.png'
                                    alt="promotion"
                                />
                            </Center>
                            <Button
                                w='390px'
                                h='81px'
                                bg='#03418D'
                                borderRadius='15px'
                                color='white'
                                fontSize='30px'
                                fontWeight='400'
                                onClick={() => document.getElementById('contract')?.scrollIntoView({ behavior: 'smooth' })}
                                _hover={{
                                    bg: '#03418D',
                                }}
                                _active={{
                                    bg: '#03418D',
                                }}
                            >
                                {`ติดต่อฝึกงาน`}
                            </Button>
                        </>
                }
            </MotionStack>
        </MotionStack>
    )
}

const RightElement = () => {

    const [hover, setHover] = useState<boolean>(false)

    const variants = {
        hover: {
            height: '480px',
            alignItems: 'start',
            justyifyContent: 'start',
            paddingLeft: '74px',
            paddingRight: '74px',
            paddingTop: '53px',
            paddingBottom: '53px',
            flexDirection: 'row',
            transition: { duration: 0.3 }
        },
    }

    return (
        <MotionStack
            w='100%'
            h='100%'
            minH='1114px'
            align='center'
            justify='end'
            position='relative'
            bgImage='/join_us/bg_2.png'
            bgPos='center'
            bgRepeat='no-repeat'
            bgSize='cover'
            whileHover='hover'
            onHoverEnd={() => setHover(true)}
        >
            <MotionStack
                w='100%'
                h='1114px'
                align='center'
                justify='center'
                px='0'
                py='0'
                position='relative'
                bg='linear-gradient(180deg, #0B345DB2, #000000B2)'
                spacing='50px'
                direction='column'
                variants={variants}
            >
                {
                    hover ?
                        <>
                            <Center
                                w='154px'
                                h='154px'
                                bg='#FFFFFF99'
                                borderRadius='44px'
                            >
                                <Image
                                    w='100px'
                                    h='100px'
                                    src='/promotion/6.png'
                                    alt="promotion"
                                />
                            </Center>
                            <Stack
                                align='start'
                                justify='center'
                            >
                                <Heading
                                    textColor='white'
                                    fontSize='72px'
                                    fontWeight='700'
                                >
                                    {`นักศึกษาฝึกงาน`}
                                </Heading>
                                <Text
                                    textColor='white'
                                    fontSize='36px'
                                    fontWeight='400'
                                >
                                    {`( INTERNSHIP )`}
                                </Text>
                            </Stack>
                            <Button
                                w='390px'
                                h='81px'
                                bg='#03418D'
                                borderRadius='15px'
                                color='white'
                                fontSize='30px'
                                fontWeight='400'
                                position='absolute'
                                bottom='53px'
                                right='45px'
                                onClick={() => document.getElementById('contract')?.scrollIntoView({ behavior: 'smooth' })}
                                _hover={{
                                    bg: '#03418D',
                                }}
                                _active={{
                                    bg: '#03418D',
                                }}
                            >
                                {`ติดต่อฝึกงาน`}
                            </Button>
                        </>
                        :
                        <>
                            <Stack
                                align='center'
                                justify='center'
                            >
                                <Heading
                                    textColor='white'
                                    fontSize='72px'
                                    fontWeight='700'
                                >
                                    {`นักศึกษาฝึกงาน`}
                                </Heading>
                                <Text
                                    textColor='white'
                                    fontSize='36px'
                                    fontWeight='400'
                                >
                                    {`( INTERNSHIP )`}
                                </Text>
                            </Stack>
                            <Center
                                w='287px'
                                h='300px'
                                bg='#FFFFFF99'
                                borderRadius='44px'
                            >
                                <Image
                                    w='206px'
                                    h='206px'
                                    src='/promotion/6.png'
                                    alt="promotion"
                                />
                            </Center>
                            <Button
                                w='390px'
                                h='81px'
                                bg='#03418D'
                                borderRadius='15px'
                                color='white'
                                fontSize='30px'
                                fontWeight='400'
                                onClick={() => document.getElementById('contract')?.scrollIntoView({ behavior: 'smooth' })}
                                _hover={{
                                    bg: '#03418D',
                                }}
                                _active={{
                                    bg: '#03418D',
                                }}
                            >
                                {`ติดต่อฝึกงาน`}
                            </Button>
                        </>
                }
            </MotionStack>
        </MotionStack>
    )
}

const RegisterCard = ({ bgImageSrc = '', title, subtitle, buttonLabel, iconSrc = '' }: RegisterCardProps) => {
    const iconBg = useColorModeValue('#ffffffDE', '#0D0D0D99')
    const bgFilter = useColorModeValue('grayscale(0) blur(5px)', 'grayscale(1) blur(5px) brightness(0.5)')

    return (
        <MotionStack
            w='100%'
            h='100%'
            as='section'
            align='center'
            justify='end'
            bgImage={bgImageSrc}
            bgPos='center'
            bgRepeat='no-repeat'
            bgSize='cover'
            position='relative'
            spacing={0}
        >
            <MotionStack
                w='100%'
                h='100%'
                minH={{ base: '500px', lg: '800px' }}
                py={{ base: '3rem', lg: '4rem' }}
                align='center'
                justify='center'
                position='relative'
                bg='linear-gradient(180deg, #0B345DB2, #000000B2)'
                spacing={{ base: '2rem', lg: '3rem' }}
                direction='column'
                textColor='#ffffff'
                transition="0.5s"
                backdropFilter={bgFilter}
                _hover={{
                    transition: "0.5s",
                    bg: 'linear-gradient(180deg, #000000B2, #000000B2)',
                    backdropFilter: 'blur(0px) grayscale(0.5)',
                }}
            >
                <Stack
                    align='center'
                    justify='center'
                >
                    <Heading
                        fontSize={{ base: '2rem', lg: '4rem' }}
                    >
                        {title}
                    </Heading>
                    <Text
                        fontSize={{ base: '1.5rem', lg: '2rem' }}
                    >
                        {subtitle}
                    </Text>
                </Stack>
                <Center
                    w={{ base: '222px', lg: '287px' }}
                    h={{ base: '222px', lg: '300px' }}
                    bg={iconBg}
                    borderRadius='40px'
                >
                    <Image
                        w={{ base: '144px', lg: '206px' }}
                        h={{ base: '144px', lg: '206px' }}
                        src={iconSrc}
                        alt="icon"
                    />
                </Center>
                <Button
                    onClick={() => document.getElementById('contract')?.scrollIntoView({ behavior: 'smooth' })}
                    variant="solid"
                    mx="auto"
                    w="fit-content"
                    h="fit-content"
                    p="1.5rem"
                    bg='#03418D'
                    borderRadius="20px"
                    fontSize={{ base: '1.5rem', lg: '2rem' }}
                    textColor='#ffffff'
                    _hover={{
                        color: '#ffffff',
                        bg: '#19B5FE'
                    }}
                >
                    {buttonLabel}
                </Button>
            </MotionStack>
        </MotionStack>
    )
}

export const JoinUsRegister = () => {

    const breakpoint = useBreakpointValue({ base: false, '2xl': true })

    return (
        <Stack
            id="register"
            as="section"
            w='100%'
            align='center'
            justify='space-between'
            direction={{
                base: 'column', lg: 'row'
            }}
            spacing={0}
        >
            {
                breakpoint ?
                    (
                        <>
                            <Stack
                                w='50%'
                            >
                                <LeftElement />
                            </Stack>
                            <Stack
                                w='50%'
                            >
                                <RightElement />
                            </Stack>
                            
                        </>
                    )
                    :
                    (
                        <>
                            <RegisterCard bgImageSrc='/join_us/bg_1.png' title='ผู้ช่วยอาจารย์' subtitle='PART-TIME' iconSrc='/promotion/6.png' buttonLabel='ติดต่อสมัครงาน' />
                            <RegisterCard bgImageSrc='/join_us/bg_2.png' title='นักศึกษาฝึกงาน' subtitle='INTERNSHIP' iconSrc='/promotion/1.png' buttonLabel='ติดต่อฝึกงาน' />
                        </>
                    )
            }
        </Stack>
    )
}