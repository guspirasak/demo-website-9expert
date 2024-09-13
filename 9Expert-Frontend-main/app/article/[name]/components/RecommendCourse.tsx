'use client'

import { TCourseCard } from "@/app/components/ContentCard/Card"
import { getAllCourseCardByMultiId } from "@/libs/UserAPI"
import { Container, HStack, Stack, Box, Heading, Text, Button, useBreakpointValue } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { Navigation, Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useSingleArticle } from "../../context/SingleArticleContext"
import { MiniSearchCourseCard } from "@/app/components/ContentCard/MiniSearchCourseCard"
import { containerBreakpoints } from "@/config/theme"

export const RecommendCourse = () => {
    const { state } = useSingleArticle()

    const [course, setCourse] = useState<TCourseCard[]>([])
    const tiggerScroll = useBreakpointValue({ base: 1, md: 2, '2xl': 5 }) || 1;

    const isShowScrollBar: boolean = course.length > tiggerScroll;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>()

    useEffect(() => {
        getAllCourseCardByMultiId(state.courseRelated as string[], (data: TCourseCard[], error: unknown) => {
            if (error) console.log(error)
            data ? setCourse(data) : setCourse([])
        })
    }, [state])

    return (
        <Stack
            w='100%'
            h='100%'
            py='75px'
            align='start'
            justify='center'
        >
            <Container
                maxW={containerBreakpoints}
            >
                <HStack
                    spacing='20px'
                >
                    <Box
                        w='7px'
                        h={{ base: '30px', lg: '53px' }}
                        bg='exBlue'
                        borderRadius='15px'
                    >

                    </Box>
                    <Heading
                        fontSize={{ base: '24px', lg: '36px' }}
                        fontWeight='semibold'
                    >
                        {`หลักสูตรแนะนำ`}
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
                        spaceBetween={30}
                        initialSlide={0}
                        scrollbar={{
                            hide: false,
                            draggable: true,
                            snapOnRelease: true
                        }}
                        modules={[Scrollbar]}
                    >
                        {
                            course.map((item, index) => {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        style={{ 
                                            width: '360px',
                                            height: 'fit-content',
                                        }}
                                    >
                                        <MiniSearchCourseCard course={item} />
                                    </SwiperSlide>
                                )
                            })
                        }
                        {isShowScrollBar ? <Stack>
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