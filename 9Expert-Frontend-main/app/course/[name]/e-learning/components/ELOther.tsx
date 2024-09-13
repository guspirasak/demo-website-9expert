'use client'

// import { OnlineCard } from "@/app/components/ContentCard/OnlineCard"
import { Box, Center, Heading, Stack, useBreakpointValue } from "@chakra-ui/react"
import { Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export const ELOther = () => {

    const breakpoints = useBreakpointValue({
        base: 1,
        md: 2,
        xl: 3
    })
    
    return (
        <Stack
            w='100%'
            align='center'
            minH='1200px'
            color='white'
        >
            <Heading
                w='100%'
                pb='2rem'
                textAlign='center'
                fontSize='48px'
                borderBottom='2px'
                borderColor='#1CA7EC'
            >
                {`หลักสูตรที่เกี่ยวข้อง`}
            </Heading>
            <Box
                w='100%'
                h='580px'
                position='relative'
            >
                <Box
                    as={Swiper}
                    className='boxSwiperOnlineCourse'
                    w='100%'
                    h='100%'
                    py='1rem'
                    px={{ base: '0rem', lg: '0.5rem' }}
                    mt='5rem'
                    slidesPerView={breakpoints}
                    spaceBetween={30}
                    centeredSlides={true}
                    initialSlide={2}
                    scrollbar={{
                        hide: false,
                        draggable: true,
                        snapOnRelease: true
                    }}
                    modules={[Scrollbar]}
                >
                    {[...Array(5)].map((_, index) => (
                        <SwiperSlide
                            key={index}
                        >
                            <Center>
                                {/* <OnlineCard image='/card/onlinecard.png' /> */}
                            </Center>
                        </SwiperSlide>
                    ))}
                </Box>
            </Box>
        </Stack>
    )
}