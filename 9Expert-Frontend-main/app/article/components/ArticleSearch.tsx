'use client'

import { Button, HStack, Heading, Input, Stack, useBreakpointValue } from "@chakra-ui/react"
import { MiniArticleCard } from "./ArticleCard"
import { useArticle } from "../context/ArticleContext"

export const ArticleSearch = () => {

    const breakpoint = useBreakpointValue({ base: false, lg: true })

    const { state } = useArticle()

    return (
        <Stack
            align='start'
            w='100%'
            h='100%'
            position='relative'
            spacing='30px'        
        >
            {
                breakpoint &&
                <Stack
                    w='100%'
                    h='159px'
                    minH='159px'
                    px='45px'
                    justify='center'
                    border='1px'
                    borderRadius='10px'
                    borderColor='#F2F5FA'
                    shadow='md'
                    spacing='21px'
                >
                    <Heading
                        fontSize='24px'
                    >
                        {`ค้นหาบทความ`}
                    </Heading>
                    <HStack
                        w='100%'
                        spacing='0'
                    >
                        <Input
                            name="search interest article"
                            w='100%'
                            h='61px'
                            bg='#F9F9F9'
                            placeholder="บทความที่สนใจ"
                            border='0'
                            borderRadius='0'
                        />
                        <Button
                            bg='#F9F9F9'
                            h='61px'
                            borderRadius='0'
                            textColor='#000E29'
                            _hover={{
                                bg: '#F9F9F9'
                            }}
                            _active={{
                                bg: '#F9F9F9'
                            }}
                        >
                            {`ค้นหา`}
                        </Button>
                    </HStack>
                </Stack>
            }
            <Stack
                w='100%'
                h='100%'
                px='45px'
                py='40px'
                justify='center'
                border='1px'
                borderRadius='10px'
                borderColor='#F2F5FA'
                shadow='md'
                spacing='21px'
            >
                <Heading
                    fontSize='24px'
                >
                    {`บทความล่าสุด`}
                </Heading>
                <Stack
                    w='100%'
                    h='100%'
                    spacing={{ base: '15px', lg: '36px' }}
                >
                    {
                        state && state.slice(0, 3).map((article, index) => (
                            <MiniArticleCard
                                key={index}
                                article={article}
                            />
                        ))
                    }
                </Stack>
            </Stack>
        </Stack>
    )
}