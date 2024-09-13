'use client'

import { Accordion, Center, Container, Divider, HStack, Heading, Image, ListItem, OrderedList, Stack, useColorModeValue } from "@chakra-ui/react"
import { ContentAccordionItems } from "./FAQAccordion"
import { useEffect, useState } from "react"
import { TFaq } from "@/app/admin/interface/CreateFaqInterface"
import { getFaq } from "@/libs/AdminAPI"
import { containerBreakpoints } from "@/config/theme"

export const FAQContent = () => {
    const [faqs, setFaqs] = useState<TFaq[]>([])
    const cardBg = useColorModeValue('#ffffff', '#2E2E2E')
    const bgColor = useColorModeValue('#F3F7FB', '#23262A')

    useEffect(() => {
        getFaq((data: TFaq[], error: unknown) => {
            if (error) {
                console.error(error)
                return []
            }
            setFaqs(data)
        })
    }, [])

    return (
        <Stack
            w='100%'
            as='section'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            bg={bgColor}
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w='100%'
                    h='max-content'
                    spacing={{ base: '1rem', lg: '2rem' }}
                >
                    <Stack
                        w='100%'
                        align='center'
                    >
                        <Heading
                            fontSize={{ base: '1.8rem', lg: '2.5rem' }}
                        >
                            คำถามทั่วไป
                        </Heading>
                        <Divider
                            my='1rem'
                            w='280px'
                            border='2px'
                            borderColor='#1CA7EC'
                            borderRadius='10px'
                        />
                    </Stack>
                    <Stack
                        w='100%'
                        h='100%'
                        align='start'
                        justify='space-between'
                        direction={{ base: 'column', lg: 'row' }}
                        flexWrap='wrap'
                        spacing={{ base: '2rem', lg: '3rem' }}
                    >
                        {
                            faqs.map((item, index) => (
                                <Stack
                                    key={index}
                                    w='100%'
                                    h='100%'
                                    minH='max-content'
                                    p={{ base: '1rem', lg: '2rem' }}
                                    bg={cardBg}
                                    align='center'
                                    justify='start'
                                    borderRadius='20px'
                                    shadow='md'
                                    flex='0 0 45%'
                                    spacing='1rem'
                                >
                                    <HStack
                                        w='100%'
                                        align='center'
                                        justify='start'
                                        spacing='1rem'
                                    >
                                        <Image src={item.icon} w='32px' h='32px' alt="faq icon" />
                                        <Heading
                                            fontSize='2rem'
                                            as='h3'
                                        >
                                            {item.title}
                                        </Heading>
                                    </HStack>
                                    <Accordion
                                        defaultIndex={[0]}
                                        allowToggle
                                        display='flex'
                                        flexDirection='column'
                                        w='100%'
                                        gap={{ base: '1rem', lg: '2rem' }}
                                    >
                                        {
                                            item.question.map((q, i) => (
                                                <ContentAccordionItems
                                                    key={i}
                                                    title={q.title}
                                                >
                                                    <OrderedList
                                                        p='1rem'
                                                        spacing='0.5rem'
                                                    >
                                                        {
                                                            q.description.map((d, j) => (
                                                                <ListItem
                                                                    key={j}
                                                                    fontSize={{ base: '1rem', lg: '1.25rem' }}
                                                                >
                                                                    {d}
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </OrderedList>
                                                </ContentAccordionItems>
                                            ))
                                        }
                                    </Accordion>
                                </Stack>
                            ))
                        }
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}