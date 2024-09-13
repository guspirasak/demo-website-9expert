'use client'

import { TCourseCard } from "@/app/components/ContentCard/Card"
import { OfflineCard } from "@/app/components/ContentCard/OfflineCard"
import { useSingleCourse } from "@/app/course/context/SingleCourseContext"
import { Button, Center, useBreakpointValue } from "@chakra-ui/react"
import { Box, Heading, Stack, useColorModeValue } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { TLiveRef } from "../interface/LiveTab"

export const LiveRelatedCourse = ({ relatedCourse, setTabRef }: { relatedCourse: TCourseCard[], setTabRef: Dispatch<SetStateAction<TLiveRef>> }) => {

    const [ swiper, setSwiper ] = useState<any>(null)
    const relatedRef = useRef<HTMLDivElement>(null)

    const tiggerScroll = useBreakpointValue({ base: 1, md: 2, '2xl': 5 }) || 1;

    const isShowScrollBar: boolean = relatedCourse.length > tiggerScroll;

    useEffect(() => {
        setTabRef((prev) => ({ ...prev, related: relatedRef }))     
    }, [])

    return (
        <Stack
            w='100%'
            align='center'
            minH={{ base: '850px', xl: '850px' }}
            pt={{ base: '3rem', xl: '0' }}
            ref={relatedRef}
            scrollMarginTop='150px'
        >
            <Heading
                w='100%'
                pb='2rem'
                textAlign='center'
                fontSize={{ base: '24px', lg: '48px' }}
                textColor={useColorModeValue('black', 'white')}
                borderBottom='2px'
                borderColor='#DCE6E1'
                as='h2'
            >
                {`หลักสูตรที่เกี่ยวข้อง`}
            </Heading>
            <Box
                w='100%'
                h='fit-content'
                minH='750px'
                position='relative'
            >
                <Box
                    as={Swiper}
                    className='boxSwiperOfflineCourse'
                    w='100%'
                    h='100%'
                    py='1rem'
                    pb='75px'
                    px={{ base: '0rem', lg: '0.5rem' }}
                    mt='5rem'
                    my='60px'
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
                    {relatedCourse.length > 0 && relatedCourse.map((c, index) => (
                        <SwiperSlide
                            key={index}
                            style={{
                                width: 'auto',
                            }}
                        >
                            <Center>
                                <OfflineCard course={c} />
                            </Center>
                        </SwiperSlide>
                    ))}
                    <Stack direction='row' visibility={isShowScrollBar ? 'visible' : 'hidden'}>
                        <Button
                            position='absolute'
                            h='32px'
                            w='48px'
                            bg='#EEF2FF'
                            color='#19B5FE'
                            borderRadius='32px'
                            left={{ base: '3%', md: '7%', lg: '8%', xl: '10%', 'xl-1': '12%', '2xl': '15%' }}
                            bottom='0'
                            onClick={() => swiper?.slidePrev()}
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
                            onClick={() => swiper?.slideNext()}
                            zIndex='10'
                            _hover={{
                                bg: '#19B5FE',
                                color: 'white'
                            }}
                        >
                            {`>`}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Stack>
    )
}