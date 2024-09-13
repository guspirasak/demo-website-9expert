'use client'

import { OnlineCard } from "@/app/components/ContentCard/OnlineCard"
import { Stack, Container, Heading, Box, Center, Button, useBreakpointValue } from "@chakra-ui/react"
import { Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useGroup } from "../context/GroupContext"
import Link from "next/link"
import { useRef } from "react"

export const GroupOnline = () => {

    const { state } = useGroup()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>()

    return (
        <Stack
            w='100%'
            h='100%'
            pb='5rem'
        >
            <Container
                maxW='100%'
                p={{ base: '0', lg: 'auto' }}
            >
                <Heading
                    w='100%'
                    h='100%'
                    pb='30px'
                    mb='100px'
                    textAlign={{ base: 'center', lg: 'end' }}
                    fontSize={{ base: '32px', lg: '56px' }}
                    borderBottom='2px'
                    borderColor={'white'}
                    color={'white'}
                >
                    {`e-Learning`}
                </Heading>
                <Box
                    w='100%'
                    h='700px'
                    position='relative'
                >
                    <Box
                        as={Swiper}
                        className='boxSwiperOfflineCourse'
                        w='100%'
                        h='100%'
                        py='1rem'
                        px={{ base: '0rem', lg: '0.5rem' }}
                        mt='5rem'
                        slidesPerView={'auto'}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onSwiper={(swiper: any) => swiperRef.current = swiper}
                        spaceBetween={30}
                        centeredSlides={useBreakpointValue({ base: true, md: false })}
                        scrollbar={{
                            hide: false,
                            draggable: true,
                            snapOnRelease: true
                        }}
                        modules={[Scrollbar]}
                    >
                        {
                            state.course.filter((cc) => cc.courseType === 'Online').map((c, index) => (
                                <SwiperSlide
                                    key={index}
                                    style={{ width: '340px' }}
                                >
                                    <Center
                                        as={Link}
                                        href={c.courseUrl ? `${window.origin}/course/${c.courseUrl}_online` : `/course/${c.courseName.replaceAll(' ', '_')}_online`}
                                    >
                                        <OnlineCard course={c} />
                                    </Center>
                                </SwiperSlide>
                            ))
                        }
                        {state.course.filter((cc) => cc.courseType === 'Online').length > 3 ? <Stack>
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