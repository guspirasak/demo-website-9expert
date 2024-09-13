'use client'

import { Center, Image, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"

export const Chat = () => {
    return (
        <Stack
            w='fit-content'
            h='fit-content'
            align='center'
            position='fixed'
            bottom={{ base: '40px', lg: '60px' }}
            right={{ base: '40px', lg: '80px' }}
            zIndex={200}
            as={Link}
            href="https://m.me/9ExpertTraining"
            target="_blank"
            justify="center"
            _hover={{ opacity: 0.9 }}
        >
            {/* mobile */}
            <Stack
                display={{ base: 'flex', xl: 'none' }}
                w={{ base: '35px' }}
                h={{ base: '35px' }}
            >
                <Image
                    w={{ base: '35px' }}
                    h={{ base: '35px' }}
                    src="/chat.png"
                    alt="chat"
                    position="absolute"
                    top={{ base: '-20px' }}
                    right={{ base: '-20px' }}
                    loading="lazy"
                />
            </Stack>
            {/* desktop */}
            <Stack
                display={{ base: 'none', xl: 'flex' }}
                w="fit-content"
                h="fit-content"
            >
                <Image
                    w={{ base: '30px', xl: '50px', '2xl': '50px' }}
                    h={{ base: '30px', xl: '50px', '2xl': '50px' }}
                    src="/chat.png"
                    alt="chat"
                    position="absolute"
                    top={{ base: '-20px', xl: '-30px', '2xl': '-30px' }}
                    right={{ base: '-20px', xl: '-30px', '2xl': '-30px' }}
                    loading="lazy"
                />
                <Center
                    w={{ base: '100px', xl: '140px', '2xl': '170px' }}
                    h={{ base: '30px', xl: '45px', '2xl': '50px' }}
                    borderRadius="94px"
                    bg="white"
                    shadow="xl"
                >
                    <Text
                        fontSize={{ base: 'md', xl: '2xl', '2xl': '3xl' }}
                        fontWeight={{ base: '400', '2xl': '400' }}
                        color="black"
                    >
                        แชทกับเรา
                    </Text>
                </Center>
            </Stack>
        </Stack>
    );
}