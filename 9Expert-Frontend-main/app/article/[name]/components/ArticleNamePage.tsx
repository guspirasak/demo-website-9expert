'use client'

import { Navbar } from "@/app/components/layout/Navbar"
import { Button, Container, HStack, Image, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { ArticleNameBanner, ArticleNameBannerMobile } from "./ArticleNameBanner"
import { RelatedCourse } from "./RelatedCourse"
import { LatestArticle } from "./LatestArticle"
import { useEffect, useRef } from "react"
import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { useSingleArticle } from "../../context/SingleArticleContext"
import { ArticleContent } from "./ArticleContent"
import { RecommendCourse } from "./RecommendCourse"
import { RelatedArticle } from "./RelatedArticle"
import { Footer } from "@/app/components/layout/Footer"
import { Chat } from "@/app/components/Chat"
import { containerBreakpoints } from "@/config/theme"

export const ArticleNamePage = ({ article }: { article: TArticle }) => {

    const { state, setState } = useSingleArticle()

    const breakpoint = useBreakpointValue({ base: false, '2xl': true })

    const bannerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const relatedRef = useRef<HTMLDivElement>(null)
    const arelatedRef = useRef<HTMLDivElement>(null)

    const sidebarBg = useColorModeValue('white', '#282828')
    const textColor = useColorModeValue('#0B345D', 'white')

    useEffect(() => {
        setState(article)
    }, [article])

    return (
        <>
            <Navbar />
            <Stack
                ref={bannerRef}
                scrollMarginTop='150px'
                w='100%'
                h='100%'
                align='center'
                position='relative'
            >
                {
                    breakpoint ? <ArticleNameBanner /> : <ArticleNameBannerMobile />
                }
            </Stack>
            <Stack
                w='100%'
                h='100%'
                mt='20px'
                mb='5rem'
                align='center'
                position='relative'
            >
                <Container
                    maxW={containerBreakpoints}
                    position='relative'
                >
                    <Stack
                        ref={contentRef}
                        scrollMarginTop='150px'
                        w='100%'
                        h='100%'
                        direction='row'
                        align='start'
                        justify='space-between'
                        position='relative'
                        gap='3rem'

                    >
                        <Stack
                            w='100%'
                            h='100%'
                            align='start'
                            overflowX='hidden'
                        >
                            <ArticleContent />
                        </Stack>
                        {
                            breakpoint &&
                            <Stack
                                w='100%'
                                h='100%'
                                minW='485px'
                                maxW='485px'
                                align='start'
                                justify='start'
                                spacing='50px'
                                position='sticky'
                                top='0'
                            >
                                <Stack
                                    w='100%'
                                    h='fit-content'
                                    align='start'
                                >
                                    <Stack
                                        p='18px'
                                        w='100%'
                                        h='100%'
                                        maxW='437px'
                                        shadow='md'
                                        borderRadius='20px'
                                        spacing='15px'
                                        bg={sidebarBg}
                                        color={textColor}
                                    >
                                        <HStack
                                            w='100%'
                                            h='100%'
                                            spacing='0'
                                        >
                                            <Button
                                                w='100%'
                                                h='100%'
                                                minH='65px'
                                                variant='ghost'
                                                borderRadius='20px'
                                                justifyContent='start'
                                                onClick={() => bannerRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                                _hover={{
                                                    bg: 'none'
                                                }}
                                                _active={{
                                                    bg: '#19B5FE4D'
                                                }}
                                                whiteSpace='normal'
                                            >
                                                <Image
                                                    alt={`${state.articleTitle} image`}
                                                    w='30px'
                                                    h='30px'
                                                    mr='10px'
                                                    borderRadius='5px'
                                                    src={state.articleImage ? state.articleImage : 'https://via.placeholder.com/30'}
                                                    fit='cover'
                                                />
                                                <Text textAlign='start' noOfLines={1}>{state.articleTitle}</Text>
                                            </Button>
                                        </HStack>
                                        <Button
                                            w='100%'
                                            h='100%'
                                            minH='65px'
                                            variant='ghost'
                                            borderRadius='20px'
                                            justifyContent='start'
                                            onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                            _hover={{
                                                bg: 'none'
                                            }}
                                            _active={{
                                                bg: '#19B5FE4D'
                                            }}
                                        >
                                            <Image
                                                alt='article detail image'
                                                w='30px'
                                                h='30px'
                                                mr='10px'
                                                src='/course/target.png'
                                            />
                                            {`เนื้อหาบทความ`}
                                        </Button>
                                        {
                                            state.articleRelated && state.articleRelated.length > 0 &&
                                            <Button
                                                w='100%'
                                                h='100%'
                                                minH='65px'
                                                variant='ghost'
                                                borderRadius='20px'
                                                justifyContent='start'
                                                onClick={() => arelatedRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                                _hover={{
                                                    bg: 'none'
                                                }}
                                                _active={{
                                                    bg: '#19B5FE4D'
                                                }}
                                            >
                                                <Image
                                                    alt='article related image'
                                                    w='30px'
                                                    h='30px'
                                                    mr='10px'
                                                    src='/course/newspaper.png'
                                                />
                                                {`บทความที่เกี่ยวข้อง`}
                                            </Button>
                                        }
                                        {
                                            state.courseRelated && state.courseRelated.length > 0 &&
                                                <Button
                                                    w='100%'
                                                    h='100%'
                                                    minH='65px'
                                                    variant='ghost'
                                                    borderRadius='20px'
                                                    justifyContent='start'
                                                    onClick={() => relatedRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                                    _hover={{
                                                        bg: 'none'
                                                    }}
                                                    _active={{
                                                        bg: '#19B5FE4D'
                                                    }}
                                                >
                                                    <Image
                                                        alt="course related image"
                                                        w='30px'
                                                        h='30px'
                                                        mr='10px'
                                                        src='/course/certificate.png'
                                                    />
                                                    {`หลักสูตรที่เกี่ยวข้อง`}
                                                </Button>
                                        }
                                    </Stack>
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='center'
                                    bg={sidebarBg}
                                >
                                    <RelatedCourse />
                                </Stack>
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='center'
                                    bg={sidebarBg}
                                >
                                    <LatestArticle />
                                </Stack>
                            </Stack>
                        }
                    </Stack>
                </Container>
            </Stack>
            {
                state.courseRelated && state.courseRelated.length > 0 && (
                    <Stack
                        ref={relatedRef}
                        scrollMarginTop='150px'
                        w='100%'
                        h='100%'
                        align='center'
                        position='relative'
                    >
                        <RecommendCourse />
                    </Stack>
                )
            }
            {
                state.articleRelated && state.articleRelated.length > 0 && (
                    <Stack
                        ref={arelatedRef}
                        scrollMarginTop='150px'
                        w='100%'
                        h='100%'
                        align='center'
                        position='relative'
                    >
                        <RelatedArticle />
                    </Stack>
                )
            }
            <Chat />
            <Footer />
        </>
    )
}