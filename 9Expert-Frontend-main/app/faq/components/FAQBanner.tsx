'use client'

import { Accordion, AspectRatio, Center, Container, Divider, Heading, Image, ListItem, Stack, UnorderedList } from "@chakra-ui/react"
import { BannerAccordionItems } from "./FAQAccordion"
import { questionList } from "@/config/faq"
import { containerBreakpoints } from "@/config/theme"

export const FAQBanner = () => {
    return (
        <Stack
            w='100%'
            as='section'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
        >
            <Container p={0} maxW={containerBreakpoints}>
                <Stack
                    w='100%'
                    align='center'
                    justify='start'
                    direction={{ base: 'column', lg: 'row' }}
                    spacing={{ base: '2rem', lg: '4rem' }}
                >
                    <AspectRatio
                        flexShrink={0}
                        ratio={1 / 1.2}
                        minW={{ base: '100%', lg: '462px' }}
                    >
                        <Image
                            alt='FAQ banner'
                            src='/faq/faq_banner.png'
                        />
                    </AspectRatio>
                    <Stack
                        w='100%'
                        align={{ base: 'center', lg: 'start' }}
                        justify={{ base: 'center', lg: 'start' }}
                    >
                        <Heading
                            fontSize={{ base: '2rem', lg: '3rem' }}
                            as='h1'
                        >
                            คำถามที่พบบ่อย
                        </Heading>
                        <Divider
                            my="1rem"
                            w='240px'
                            border='2px'
                            borderColor='#1CA7EC'
                            borderRadius='10px'
                        />
                        <Stack
                            w='100%'
                            align='start'
                            justify='start'
                        >
                            <Accordion
                                w='100%'
                                h='100%'
                                allowToggle
                            >
                                {
                                    questionList.map((item, index) => (
                                        <BannerAccordionItems key={index} title={item.title} >
                                            <UnorderedList>
                                                {item.description.map((description, i) => (
                                                    <ListItem key={i}>{description}</ListItem>
                                                ))}
                                            </UnorderedList>
                                        </BannerAccordionItems>
                                    ))
                                }
                            </Accordion>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}