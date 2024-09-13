'use client'

import { MoonWithStarIcon, SunFillIcon } from "@/app/icons/HomeIcons"
import { Box, IconButton, Text, VStack, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import React, { ReactElement, useMemo } from "react"

const MotionIconButton = motion(IconButton)
const MotionBox = motion(Box)

type VariantValue = {
    x?: number,
    opacity?: number,
    rotate?: number
}

const transitionConfig = {
    type: "spring",
    stiffness: 700,
    damping: 30,
    duration: 0.5
}
const lightTheme = { iconBg: '#ffffff', iconColor: 'rgba(119, 128, 139, 1)', buttonBg: '#1BA7EC' }
const darkTheme = {
    iconBg: '#3B3B3B', iconColor: '#ffffff', buttonBg: '#C4C4C4'
}

const getVariant = (mode: string, lightValue: VariantValue, darkValue: VariantValue) => {
    return mode === 'light' ? lightValue : darkValue;
}

export const ColorModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { iconBg, iconColor, buttonBg } = useColorModeValue(lightTheme, darkTheme)

    const ButtonVariants = useMemo(() => ({
        initial: () => getVariant(colorMode, { x: 23, opacity: 1 }, { x: 0, opacity: 1 }),
        animate: () => getVariant(colorMode, { x: 0, opacity: 1 }, { x: 23, opacity: 1 }),
        exit: () => getVariant(colorMode, { x: 0, opacity: 0.5 }, { x: 23, opacity: 0.5 })
    }), [colorMode]);

    const IconVariants = useMemo(() => ({
        initial: () => getVariant(colorMode, { rotate: 360 }, { rotate: 0 }),
        animate: () => getVariant(colorMode, { rotate: 0 }, { rotate: 360 }),
        exit: () => getVariant(colorMode, { rotate: 0 }, { rotate: 360 })
    }), [colorMode]);

    const MotionBoxComponent = ({ children, color }: { children: ReactElement, color: string }) => (
        <MotionBox
            p='0'
            m='0'
            display='flex'
            alignItems='center'
            justifyContent='center'
            variants={IconVariants}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            transition={{
                rotate: {
                    duration: 0.5
                }
            }}
        >
            {React.cloneElement(children, { color })}
        </MotionBox>
    );

    return (<VStack
        ml='1rem'
        display={{ base: 'none', 'xl-1': 'inline-flex' }}
    >
        <Text as='label' fontSize='xs' color={iconColor}>{colorMode === "light" ? 'Light Mode' : 'Dark Mode'}</Text>
        <AnimatePresence
            initial={false}
            mode='wait'
            onExitComplete={toggleColorMode}
        >
            <Box
                as="button"
                position='relative'
                display='flex'
                alignItems='center'
                justifyContent='start'
                p='0'
                w='48px'
                h='24px'
                borderRadius='16px'
                bg={buttonBg}
                onClick={toggleColorMode}
                _hover={{
                    bg: buttonBg
                }}
                _active={{
                    bg: buttonBg
                }}
            >
                <MotionIconButton
                    aria-label='colorMode'
                    icon={
                        colorMode === 'light' ?
                            <MotionBoxComponent color='yellow.300'>
                                <SunFillIcon h='16px' w='16px' p='0' m='0' />
                            </MotionBoxComponent>
                            :
                            <MotionBoxComponent color='white'>
                                <MoonWithStarIcon h='16px' w='64px' p='0' m='0' />
                            </MotionBoxComponent>
                    }
                    bg={iconBg}
                    p='0'
                    m='0'
                    ml='3px'
                    maxW='20px'
                    minW='20px'
                    w='20px'
                    h='20px'
                    variant='ghost'
                    layout
                    variants={ButtonVariants}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}
                    transition={{
                        x: transitionConfig
                    }}
                    borderRadius='full'
                    _hover={{
                        bg: iconBg
                    }}
                    _active={{
                        bg: iconBg
                    }}
                />
            </Box>
        </AnimatePresence>

    </VStack>
    )
}