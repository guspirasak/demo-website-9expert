'use client'

import { Stack, Text, Image, useColorModeValue, Heading, Center } from "@chakra-ui/react"

const DesktopPromotionCard = ({ title, subtitle, image, iconBg, children }: { title: string, subtitle: string, image: string, iconBg?: React.ReactElement[], children?: React.ReactElement }) => { 
    const bgColor = useColorModeValue('linear-gradient(180deg, #228BFD 0%, #19B5FE 100%)', '#EBEBEB')
    const fontColor = useColorModeValue('#ffffff', '#2E2E2E')
    const iconColor = useColorModeValue('#ffffff', '#EBEBEB')

    return (
        <Stack
            w='100%'
            h={{ base: '100%', 'lg': '600px' }}
            p='3rem'
            borderRadius='20px'
            position='relative'
            bg={bgColor}
            color={fontColor}
        >
            <Stack alignItems="center" w="100%" spacing="1rem">
                <Center
                    bg={iconColor}
                    borderRadius='20px'
                    border='0'
                    w='85px'
                    h='85px'
                    flexShrink={0}
                >
                    <Image 
                        w='50px'
                        h='50px'
                        src={image}
                        alt="promotion icon"
                    />
                </Center>
                <Heading
                    textAlign="center"
                    fontSize='2rem'
                    fontWeight='700'
                >
                    {title}
                </Heading>
                <Text
                    textAlign="center"
                    fontSize='1rem'
                    fontWeight={400}
                >
                    {subtitle}
                </Text>
            </Stack>
            {children}
            {iconBg}
        </Stack>)
}

export default DesktopPromotionCard
