'use client'

import { Box, Button, Stack, Center, Container, Heading, useColorModeValue } from "@chakra-ui/react"
import { Autoplay, Scrollbar } from "swiper/modules"
import { SwiperSlide, Swiper, SwiperClass } from "swiper/react"
import { MiniTechnologyCard } from "./MiniTechnologyCard"
import { BusinessDarkIcon, BusinessIcon } from "@/app/icons/HomeIcons"
import { useSelector } from "react-redux"
import { getTechnologyAreas } from "@/redux/technologyAreasSlide"
import { TTechnologyArea } from "@/app/admin/interface/CreateCourseInterface"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { containerBreakpoints } from "@/config/theme"

const MotionBox = motion(Box)

export const HomepageTechnology = () => {

    const technologyArea = useSelector(getTechnologyAreas)
    const swiperRef = useRef<SwiperClass>()

    const techBgColor = useColorModeValue('#F4F7FB', '#24262A')
    const icon = useColorModeValue(<BusinessIcon w='90px' h='80px' />, <BusinessDarkIcon w='90px' h='80px' />)

    useEffect(() => {
        swiperRef.current?.autoplay.start()
    }, [swiperRef])

    return (
        <Stack
            w='100%'
            h='600px'
            align='center'
            position='relative'
            py={{ base: '2rem', lg: '4rem' }}
            bgColor={techBgColor}>
            <Heading as='h2' size={{ base: 'lg', md: '2xl' }} >เทคโนโลยีที่น่าสนใจ</Heading>
            <Container
                p={0} maxW={containerBreakpoints}
            >
                <MotionBox
                    w='100%'
                    h='100%'
                    position='relative'
                >
                    <Box
                        as={Swiper}
                        className='boxSwiperOfflineCourse'
                        w='100%'
                        h='100%'
                        my='2rem'
                        slidesPerView='auto'
                        onSwiper={(swiper: SwiperClass) => swiperRef.current = swiper}
                        spaceBetween={80}
                        initialSlide={0}
                        speed={3000}
                        grabCursor={true}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        scrollbar={{
                            hide: false,
                            draggable: true,
                            snapOnRelease: true
                        }}
                        modules={[Scrollbar, Autoplay]}
                    >
                        {technologyArea.map((item: TTechnologyArea, index: number) => (
                            <SwiperSlide
                                key={index}
                                style={{ width: 'auto' }}
                            >
                                <Center
                                    as={Link}
                                    href={`/course?technology=${item.technologyName.replaceAll(' ', '_')}`}
                                >
                                    <MiniTechnologyCard icon={item.icon ? item.icon : icon}>
                                        {item.technologyName}
                                    </MiniTechnologyCard>
                                </Center>
                            </SwiperSlide>
                        ))}
                        <Button
                            position='absolute'
                            h='32px'
                            w='48px'
                            bg='#EEF2FF'
                            color='#19B5FE'
                            borderRadius='32px'
                            left={{ base: '3%', md: '7%', lg: '8%', xl: '10%', 'xl-1': '12%', '2xl': '15%' }}
                            bottom='0'
                            onClick={() => swiperRef.current?.slidePrev()}
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
                            onClick={() => swiperRef.current?.slideNext()}
                            zIndex='10'
                            _hover={{
                                bg: '#19B5FE',
                                color: 'white'
                            }}
                        >
                            {`>`}
                        </Button>
                    </Box>
                </MotionBox>
            </Container>
        </Stack>
    )
}