'use client'

import { TCourseCard } from "@/app/components/ContentCard/Card"
import { OnlineCard } from "@/app/components/ContentCard/OnlineCard"
// import { OnlineCard } from "@/app/components/ContentCard/OnlineCard"
import { Box, Button, Center, Heading, Link, Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { useRef, cache } from "react"
import { FreeMode, Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export const ELBundleInclude = ({ children, title, course }: { children?: React.ReactNode, title: string, course: TCourseCard[] }) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>()

    // DEBUG:
    // const tempC1 = course[0]
    // for (let index = 0; index < 9; index++) {
    //     course.push(tempC1)
    // }

    const tiggerScroll = useBreakpointValue({ base: 1, md: 2, '2xl': 3 }) || 1;
    
    const isShowScrollBar:boolean = course.length >tiggerScroll;

    return (
        <Stack
            w='100%'
            align='center'
            minH={children ? { base: '1000px', xl: '1200px' } : { base: '850px', xl: '1200px' }}
            color='white'
            pt={{ base: '3rem', xl: '0' }}
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
                {title}
            </Heading>
            {
                children && 
                <Text
                    textAlign='center'
                    fontSize={{ base: '12px', lg: '36px' }}
                    mt={{ base: '30px', lg: '76px' }}
                >
                    {children}
                </Text>
            }
            <Box
                w='100%'
                h='100%'
                position='relative'
            >
                <Box
                    as={Swiper}
                    className='boxSwiperOfflineCourse'
                    // w='100%'
                    w={isShowScrollBar?'100%':'max-content'}
                    h='100%'
                    pt='1rem'
                    pb='5rem'
                    px={{ base: '0rem', lg: '0.5rem' }}
                    mt='5rem'
                    // centeredSlides={course.length<4?true:false}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onSwiper={(swiper: any) => swiperRef.current = swiper}
                    freeMode={true}
                    // loop={true}
                    slidesPerView='auto'
                    spaceBetween={30}
                    initialSlide={0}
                    scrollbar={{
                        hide: false,
                        draggable: true,
                        snapOnRelease: true
                    }}
                    modules={[Scrollbar, FreeMode]}
                >
                    {course.map((c, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ width: '340px' }}
                        >
                            <Center
                                as={Link}
                                href={c.courseUrl ? `${window.origin}/course/${c.courseUrl}_online` : `/course/${c.courseName.replaceAll(' ', '_')}_online`}
                                _hover={{
                                    textDecoration: 'unset'
                                }}
                            >
                                <OnlineCard course={c} />
                            </Center>
                        </SwiperSlide>
                    ))}
                    <Stack direction='row' visibility={isShowScrollBar ? 'visible': 'hidden'}>
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
                    </Stack>
                </Box>
            </Box>
        </Stack>
    )
}