'use client'

import { ClassroomIcon, ConsultingIcon, OnlineIcon, VideoContentIcon } from "@/app/icons/PortfolioIcon";
import { about9Expert, servicesList } from "@/config/portfolio";
import { containerBreakpoints } from "@/config/theme";
import { Button, Container, Heading, SimpleGrid, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import Link from "next/link";

const MotionStack = motion(Stack);

type ServiceCard = {
    title: string
    description: string
    bgImage: string
    textColor: string
    icon: JSX.Element
}

const iconSize = { base: '30px', lg: '60px' }

const iconList = {
    "classroom": <ClassroomIcon
        w={iconSize}
        h={iconSize}
    />,
    "online": <OnlineIcon
        w={iconSize}
        h={iconSize}
    />,
    "videoContent": <VideoContentIcon
        w={iconSize}
        h={iconSize} />,
    "consulting": <ConsultingIcon
        w={iconSize}
        h={iconSize} />
}

const RegisterButton = ({ buttonBg }: { buttonBg: string }) => {
    return (<Button
        as={Link}
        href='/register/inhouse'
        w="fit-content"
        h="fit-content"
        p="1.5rem"
        bg={{ base: '#19B5FE', lg: buttonBg }}
        borderRadius="20px"
        fontSize="1.125rem"
        textColor='#ffffff'
        _hover={{
            bg: '#19B5FE',
        }}
        _active={{
            bg: buttonBg,
        }}
    >
        สนใจจัดอบรมภายในองค์กรของท่าน
    </Button>)
}
const ServiceCard = ({ title, description, bgImage, textColor, icon }: ServiceCard) => {
    return (
        <Stack
            w={{ base: '100%' }}
            h={{ base: '180px', lg: '100%' }}
            bgImage={bgImage}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            borderRadius="20px"
            textColor={textColor}
            overflow="hidden"
        >
            <MotionStack
                w='100%'
                h='100%'
                p={{ base: '1.25rem', lg: '2rem' }}
                bg='linear-gradient(180deg, #0B345D, #0B345D)'
                overflow="hidden"
                opacity={1}
                whileHover={{
                    opacity: 0.8
                }}
                transition={{ duration: 0.5 }}
            >
                {icon}
                <Heading
                    as="h3"
                    fontSize={{ base: '1rem', lg: '1.25rem' }}
                    fontWeight="600"
                    opacity={1}
                >{title} </Heading>
                <Text
                    noOfLines={{ base: 3, lg: 6 }}
                    fontSize={{ base: '0.875rem', lg: '1rem' }}
                    opacity={1}
                >{description}</Text>
            </MotionStack>
        </Stack>
    )
}

export const PortfolioService = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    const fontColor = useColorModeValue('#ffffff', '#EBEBEB')
    const buttonBg = '#0B345D'

    return (
        <Stack
            w="100%"
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            position="relative"
            align="center"
            justify="center"
            bg="radial-gradient(86.04% 115.93% at 15.76% 24.28%, #1D70C2 0%, #0B345D 100%)"
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w="100%"
                    align="center"
                    justify="space-between"
                    direction={{ base: 'column', lg: 'row' }}
                    spacing={{ base: '2rem', lg: '2rem' }}
                >
                    <MotionStack
                        w="100%"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        spacing={{ base: '1rem', lg: '2rem' }}
                    >
                        <Heading
                            fontSize={{ base: '2rem', lg: '2.5rem' }}
                            textAlign={{ base: 'center', lg: 'start' }}
                            textColor={fontColor}
                        >
                            บริการด้านการเรียนรู้<br />แนะนำสำหรับองค์กรของท่าน
                        </Heading>
                        <Text
                            fontSize={{ base: '1rem', lg: '1.25rem' }}
                            textColor={fontColor}
                            maxW="40ch"
                            textAlign={{ base: 'center', lg: 'start' }}
                        >
                            {about9Expert}
                        </Text>
                        {isDesktop && (<RegisterButton buttonBg={buttonBg} />)}
                    </MotionStack>
                    <SimpleGrid w="100%" columns={2} spacing={{ base: '1.5rem', lg: '2rem' }}>
                        {servicesList.map((item) => {
                            return (<ServiceCard
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                textColor={fontColor}
                                bgImage={item.src}
                                icon={iconList[item.icon as keyof typeof iconList]}
                            />)
                        })}
                    </SimpleGrid>
                    {!isDesktop && (<RegisterButton buttonBg={buttonBg} />)}
                </Stack>
            </Container>
        </Stack>
    );
}