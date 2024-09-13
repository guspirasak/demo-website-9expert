'use client'

import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { AspectRatio, Button, Image, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const ArticleCategoryCard = ({ courseGroup }: { courseGroup: TCourseGroup }) => {
    return (
        <Stack
            as={Link}
            scroll={false}
            href={`/article?group=${courseGroup.courseGroupName.replaceAll(' ', '_')}`}
            w='100%'
            h='100%'
            py='1rem'
            align='center'
            justify='center'
            spacing='0'
            transition="transform 0.2s ease-in-out"
            _hover={{
                opacity: 0.8,
                transform: 'scale(1.1)',
            }}
        >
            <AspectRatio
                ratio={1}
                w={{ base: '64px', lg: '96px' }}
                h={{ base: '64px', lg: '96px' }}
            >
                <Image
                    alt='category icon'
                    src={courseGroup.courseGroupIcon}
                />
            </AspectRatio>
            <Text>
                {courseGroup.courseGroupNameAbbr}
            </Text>
        </Stack>
    )
}

export const ArticleCategory = () => {

    const courseGroup = useSelector(getCourseGroup)
    const fontColor = useColorModeValue('#19B5FE', '#ffffff')
    const isDesktop = useBreakpointValue({ base: false, lg: true })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>()

    return (
        <Stack
            w='100%'
            h='100%'
            align='center'
            justify='center'
            position='relative'
            spacing='0'
        >
            <Text
                as='h2'
                fontSize={{ base: '1.5rem', lg: '2rem' }}
                textColor={fontColor}
            >
                เลือกหัวข้อบทความที่คุณสนใจ
            </Text>
            <Stack
                as={Swiper}
                className='article-category-swiper'
                w='90%'
                pb='50px'
                align='center'
                justify='center'
                roundLengths
                centeredSlidesBounds={true}
                centeredSlides={true}
                initialSlide={isDesktop ? 6 : 2}
                slidesPerView={'auto'}
                spaceBetween={isDesktop ? 64 : 32}
                spacing={{ base: '1rem', lg: '2rem' }}
                scrollbar={{
                    hide: false,
                    draggable: true,
                    snapOnRelease: true
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSwiper={(swiper: any) => swiperRef.current = swiper}
                modules={[Scrollbar]}
            >
                {
                    courseGroup.map((cg: TCourseGroup, index: number) => (
                        <SwiperSlide
                            key={index}
                            style={{
                                height: '100%',
                                width: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ArticleCategoryCard courseGroup={cg} />
                        </SwiperSlide>
                    ))
                }
                <Button
                    id='chakra-swiper-prev'
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
                    id='chakra-swiper-next'
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
            </Stack>
        </Stack >
    )
}