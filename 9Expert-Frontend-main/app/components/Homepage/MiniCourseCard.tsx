'use client'

import { Box, Stack, Heading, Image, useColorModeValue, AspectRatio } from "@chakra-ui/react"
import Link from "next/link"

type TMiniCourseCard = {
    icon: string
    title: string
    color?: string
}

export const MiniCourseCard = ({ icon, title, color }: TMiniCourseCard) => {
    const bgColor = useColorModeValue('#ffffff', '#282828')

    return (
        <Box
            as={Link}
            href={`/group/${title.replace(/ /g, '-')}`}
            borderRadius='20px'
            bg={bgColor}
            w={{ base: '150px', lg: '250px', '2xl': '100%' }}
            h={{ base: '150px', lg: '250px', '2xl': '100%' }}
            maxW='420px'
            _hover={{
                transform: 'scale(1.05, 1.05)',
            }}
        >
            <Stack
                w='100%'
                h='100%'
                p='1rem'
                align='center'
                justify={{ base: 'center', '2xl': 'start' }}
                direction={{ base: 'column', '2xl': 'row' }}
            >
                <AspectRatio
                    ratio={1}
                    minW={{ base: '60px', lg: '90px' }}
                    minH={{ base: '60px', lg: '90px' }}
                    w={{ base: '60px', lg: '90px' }}
                >
                    <Image
                        src={icon}
                        alt={title}
                        width={{ base: '60px', lg: '90px' }}
                        height={{ base: '60px', lg: '90px' }}
                        minW={{ base: '60px', lg: '90px' }}
                        minH={{ base: '60px', lg: '90px' }}
                    />
                </AspectRatio>
                <Box
                    display={{ base: 'none', '2xl': 'block' }}
                    w='4px'
                    h='45px'
                    bg={color}
                    ml='0.5rem'
                    borderRadius='10px'
                >
                </Box>
                <Heading as='h3' fontSize={{ base: '1rem', lg: '1.5rem' }} textAlign='center' >{title}</Heading>
            </Stack>
        </Box>
    )
}