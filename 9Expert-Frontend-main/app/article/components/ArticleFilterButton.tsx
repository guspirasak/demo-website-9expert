'use client'

import { Button, ButtonGroup, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const selected = {
    bg: '#5D8BF4',
    text: '#ffffff'
}
const button = {
    bg: 'transparent',
    text: '#5D8BF4'
}

export const ArticleFilterButton = () => {
    const bgColor = useColorModeValue('#EFF3FE', '#EFF4FE10')
    const params = useSearchParams()
    const category = params.get('category') || ''

    return (
        <Stack
            w='100%'
            align={{ base: 'center', lg: 'end' }}
            justify='center'
        >
            <ButtonGroup
                w='100%'
                maxW='500px'
                borderRadius='full'
                bg={bgColor}
                spacing='0'
            >
                <Button
                    as={Link}
                    href='/article'
                    scroll={false}
                    bgColor={category === '' ? selected.bg : button.bg}
                    w='70%'
                    h='50px'
                    borderRadius='full'
                    variant='ghost'
                    _active={{ bg: 'transparent' }}
                    _focus={{ bg: 'transparent' }}
                >
                    <Text
                        color={category === '' ? selected.text : button.text}
                        fontSize={{ base: '1rem', lg: '1.25rem' }}
                    >
                        ทั้งหมด
                    </Text>
                </Button>
                <Button
                    as={Link}
                    href='/article?category=article'
                    scroll={false}
                    w='100%'
                    h='50px'
                    bgColor={category === 'article' ? selected.bg : button.bg}
                    borderRadius='full'
                    variant='ghost'
                    _active={{ bg: 'transparent' }}
                    _focus={{ bg: 'transparent' }}
                >
                    <Text
                        color={category === 'article' ? selected.text : button.text}
                        fontSize={{ base: '1rem', lg: '1.25rem' }}
                    >
                        บทความ
                    </Text>
                </Button>
                <Button
                    as={Link}
                    href='/article?category=video'
                    scroll={false}
                    w='100%'
                    h='50px'
                    borderRadius='full'
                    variant='ghost'
                    bgColor={category === 'video' ? selected.bg : button.bg}
                    _active={{ bg: 'transparent' }}
                    _focus={{ bg: 'transparent' }}
                >
                    <Text
                        color={category === 'video' ? selected.text : button.text}
                        fontSize={{ base: '1rem', lg: '1.25rem' }}
                    >
                        บทความวีดีโอ
                    </Text>
                </Button>
            </ButtonGroup>
        </Stack>

    )
}