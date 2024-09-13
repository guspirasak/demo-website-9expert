'use client'

import { Stack, Text, useColorModeValue, Heading } from "@chakra-ui/react"

export const HeroBanner = ({ title = '', subtitle = '', children }: { title: string, subtitle?: string, children?: React.ReactElement }) => {
    const bgImage = useColorModeValue('url("/banner/course_banner_bg.png")', 'url("/banner/course_banner_bg_dark.png")');
    const fontColor = useColorModeValue('#ffffff', '#EBEBEB')
    return (
        <Stack
            as="section"
            w="100%"
            h={{ base: "180px", lg: "380px" }}
            align="center"
            justify="center"
            bgImage={bgImage}
            backgroundSize="cover"
            color={fontColor}
        >
            <Heading
                as="h1"
                fontSize={{ base: '4xl', lg: '6xl' }}
                textAlign="center"
            >
                {title}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} textAlign="center">
                {subtitle}
            </Text>
            {children}
        </Stack>
    )
}