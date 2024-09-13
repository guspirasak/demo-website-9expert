'use client'

import { TCourseCard } from "@/app/components/ContentCard/Card"
import { OnlineCard } from "@/app/components/ContentCard/OnlineCard"
// import { OnlineCard } from "@/app/components/ContentCard/OnlineCard"
import { Box, Button, Center, Heading, Link, Stack } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { TLiveRef } from "../../class/interface/LiveTab"

export const ELRelatedCourse = ({ courses, setTabRef }: { courses: TCourseCard[], setTabRef: Dispatch<SetStateAction<TLiveRef>> }) => {

    const [swiper, setSwiper] = useState<any>(null)
    const relatedRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTabRef((prev) => ({ ...prev, related: relatedRef }))
    }, [])

    return (
        <Stack
            w='100%'
            align='center'
            minH={{ base: '850px', xl: '1200px' }}
            color='white'
            pt={{ base: '3rem', xl: '0' }}
            ref={relatedRef}
            scrollMarginTop='150px'
        >
            <Heading
                w='100%'
                pb='2rem'
                textAlign='center'
                fontSize={{ base: '24px', lg: '48px' }}
                borderBottom='2px'
                borderColor='white'
                as='h2'
            >
                {`หลักสูตรที่เกี่ยวข้อง`}
            </Heading>
            <Box
                w='100%'
                h='700px'
                position='relative'
            >
                <Box
                    as={Swiper}
                    className='boxSwiperOnlineCourse'
                    w='100%'
                    h='100%'
                    py='1rem'
                    pb='100px'
                    px={{ base: '0rem', lg: '0.5rem' }}
                    mt='5rem'
                    slidesPerView='auto'
                    spaceBetween={30}
                    loop={false}
                    onSwiper={(swiper: any) => setSwiper(swiper)}
                    scrollbar={{
                        hide: false,
                        draggable: true,
                        snapOnRelease: true
                    }}
                    modules={[Scrollbar]}
                >
                    {courses.map((course, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ width: '340px' }}
                        >
                            <Center
                                as={Link}
                                href={course.courseUrl ? `${window.origin}/course/${course.courseUrl}_online` : `/course/${course.courseName.replaceAll(' ', '_')}_online`}
                            >
                                <OnlineCard course={course} />
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
                        onClick={() => swiper.slidePrev()}
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
                        onClick={() => swiper.slideNext()}
                        zIndex='10'
                        _hover={{
                            bg: '#19B5FE',
                            color: 'white'
                        }}
                    >
                        {`>`}
                    </Button>
                </Box>
            </Box>
        </Stack>
    )
}