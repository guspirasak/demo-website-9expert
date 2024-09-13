'use client'

import { getAllArticleByMultiId } from "@/libs/UserAPI"
import { Box, Button, Container, HStack, Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useSingleArticle } from "../../context/SingleArticleContext"
import { useEffect, useRef, useState } from "react"
import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { HomepageArticleCard } from "@/app/components/ContentCard/HomepageArticleCard"
import { containerBreakpoints } from "@/config/theme"

export const RelatedArticle = () => {

    const breakpoint = useBreakpointValue({ base: false, lg: true })

    const { state } = useSingleArticle()

    const [article, setArticle] = useState<TArticle[]>([])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>()

    useEffect(() => {
        getAllArticleByMultiId(state.articleRelated as string[], (data: TArticle[], error: unknown) => {
            console.log(data)
            if (error) console.log(error)
            data ? setArticle(data) : setArticle([])
        })
    }, [state])

    return (
        <Stack
            w='100%'
            h='100%'
            minH='980px'
            py='65px'
            align='center'
            justify='start'
            bg='#19B5FE10'
        >
            <Container
                maxW={containerBreakpoints}
            >
                {
                    breakpoint ? 
                        <Stack
                            w='100%'
                            h='80px'
                            align='center'
                            justify='start'
                            borderBottom='4px'
                            borderColor='#19B5FE'
                        >
                            <Heading
                                fontSize='48px'
                            >
                                {`บทความที่เกี่ยวข้อง`}
                            </Heading>
                        </Stack>
                        :
                        <>
                            <HStack
                                spacing='20px'
                            >
                                <Box
                                    w='7px'
                                    h={{ base: '30px', lg: '53px' }}
                                    bg='exBlue'
                                >

                                </Box>
                                <Heading
                                    fontSize={{ base: '24px', lg: '36px' }}
                                    fontWeight='semibold'
                                >
                                    {`บทความที่เกี่ยวข้อง`}
                                </Heading>
                            </HStack>
                            <Text
                                mt='15px'
                                textColor='#817F7F'
                                fontSize={{ base: '16px', lg: '24px' }}
                                fontWeight='semibold'
                            >
                                {`9EXPERT TRAINING มีหลักสูตรการอบรมเกี่ยวกับ Microsoft Power Platform ดังนี้ :`}
                            </Text>
                        </>
                }
                <Box
                    w='100%'
                    h='100%'
                    position='relative'
                >
                    <Box
                        as={Swiper}
                        className='boxSwiperOfflineCourse'
                        w='100%'
                        h='100%'
                        pt='1rem'
                        pb='5rem'
                        px={{ base: '0rem', lg: '0.5rem' }}
                        mt={{ base: '1rem', lg: '5rem' }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onSwiper={(swiper: any) => swiperRef.current = swiper}
                        slidesPerView={'auto'}
                        spaceBetween={50}
                        initialSlide={0}
                        scrollbar={{
                            hide: false,
                            draggable: true,
                            snapOnRelease: true
                        }}
                        modules={[Scrollbar]}
                    >
                        {
                            article.map((item, index) => {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        style={{ width: '340px' }}
                                    >
                                        <HomepageArticleCard article={item} />
                                    </SwiperSlide>
                                )
                            })
                        }
                        {article.length > 3 ? <Stack>
                            <Button
                                position='absolute'
                                h='32px'
                                w='48px'
                                bg='#EEF2FF'
                                color='#19B5FE'
                                borderRadius='32px'
                                left={{ base: '3%', md: '7%', lg: '8%', xl: '10%', 'xl-1': '12%', '2xl': '15%' }}
                                bottom='0'
                                onClick={() => swiperRef.current.slidePrev()}
                                zIndex='10'
                                _hover={{
                                    bg: '#19B5FE',
                                    color: 'white'
                                }}
                            >
                                {`<`}
                            </Button>
                            <Button
                                position='absolute'
                                h='32px'
                                w='48px'
                                bg='#EEF2FF'
                                color='#19B5FE'
                                borderRadius='32px'
                                right={{ base: '3%', md: '7%', lg: '8%', xl: '10%', 'xl-1': '12%', '2xl': '15%' }}
                                bottom='0'
                                onClick={() => swiperRef.current.slideNext()}
                                zIndex='10'
                                _hover={{
                                    bg: '#19B5FE',
                                    color: 'white'
                                }}
                            >
                                {`>`}
                            </Button>
                        </Stack> : <></>}
                    </Box>
                </Box>
            </Container>
        </Stack>
    )
}