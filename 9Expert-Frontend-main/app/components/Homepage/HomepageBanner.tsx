'use client'

import { Box, Button, Container, Heading, Highlight, Stack, Text, Image, useColorModeValue } from "@chakra-ui/react"
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { useEffect, useRef, useState } from "react"
import { THomepageBanner } from "./interfaces/Homepage"
import { getBanner } from "@/services/api/home"
import Link from "next/link"
import { containerBreakpoints } from "@/config/theme"
import ReactPlayer from 'react-player'
import { buffer } from "stream/consumers"

export const HomepageBanner = () => {
    const bgColor = useColorModeValue('#ffffff', '#23262A')
    const headerColor = useColorModeValue('#000000', '#D4D6D8')
    const textColor = useColorModeValue('#000000', '#D9ECFF')
    const fontColor = useColorModeValue('#817F7F', '#ffffff')
    const [banners, setBanners] = useState<THomepageBanner[]>([])

    const swiperRef = useRef<SwiperClass>()

    useEffect(() => {
        async function fetchData() {
            const data = await getBanner();
            setBanners(data.result);
        }
        fetchData()
    }, []);


    return (
        <Stack
            as='section'
            w='100%'
            h='100%'
            px={{ base: '0', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            position='relative'
        >
            <Heading
                as='h1'
                visibility={'hidden'}
                fontSize={{ base: '2rem', lg: '3rem' }}
                position='absolute'
            >
                9Expert
            </Heading>
            <Container p={0} maxW={containerBreakpoints}>
                <Box
                    w='100%'
                    h='100%'
                >
                    {
                        banners.length > 0 && (
                            <Box
                                as={Swiper}
                                w='100%'
                                h='100%'
                                onInit={(swiper: SwiperClass) => {
                                    swiperRef.current = swiper
                                    swiper.autoplay.start()
                                }}
                                pagination={{
                                    clickable: true
                                }}
                                loop={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true
                                }}
                                onSwiper={(swiper: SwiperClass) => {
                                    swiper.autoplay.start()
                                }}
                                modules={[Pagination, Autoplay]}
                            >
                                {
                                    banners.map((banner, index) => (
                                        <SwiperSlide key={index}>
                                            <Stack
                                                align='center'
                                                justify='space-between'
                                                direction={{ base: 'column', lg: 'row' }}
                                                px='2rem'
                                                w='100%'
                                                h={{ base: '100%', lg: '600px' }}
                                                bg={bgColor}
                                                ml={{ base: '0', lg: '-1rem' }}
                                            >
                                                <Stack
                                                    align={{ base: 'center', lg: 'start' }}
                                                    justify='center'
                                                    w='100%'
                                                    h='100%'
                                                    spacing={{ base: '1rem', lg: '2rem' }}
                                                    pl={{ base: '0', lg: '2rem', 'xl-1': '5rem' }}
                                                >
                                                    <Heading
                                                        maxW='280px'
                                                        size={{ base: 'lg', md: '2xl' }}
                                                        color={headerColor}
                                                        textAlign={{ base: 'center', lg: 'left' }}
                                                    >
                                                        9Expert Training
                                                    </Heading>
                                                    <Text
                                                        display={{ base: 'none', lg: 'block' }}
                                                        textAlign={{ base: 'center', lg: 'left' }}
                                                        fontSize='lg'
                                                        maxW='430px'
                                                        textColor={textColor}
                                                    >
                                                        <Highlight
                                                            query='ขับเคลื่อนประเทศไทย'
                                                            styles={{ fontStyle: 'bold', fontWeight: '900', color: textColor }}
                                                        >
                                                            {`สอนแบ่งปันความรู้ เทคโนโลยี เพื่อ "ขับเคลื่อนประเทศไทย" Power BI, Excel, RPA, Macro, Power Platform,`}
                                                        </Highlight>
                                                    </Text>
                                                    <Text
                                                        display={{ base: 'block', lg: 'none' }}
                                                        textAlign={{ base: 'center', lg: 'left' }}
                                                        fontSize='lg'
                                                        maxW='430px'
                                                        textColor={fontColor}
                                                        mb='60px'
                                                    >
                                                        <Highlight
                                                            query='ขับเคลื่อนประเทศไทย'
                                                            styles={{ fontStyle: 'bold', fontWeight: '900', color: fontColor }}
                                                        >
                                                            สอนแบ่งปันความรู้ เทคโนโลยี เพื่อ &quot;ขับเคลื่อนประเทศไทย&quot;
                                                        </Highlight>
                                                    </Text>
                                                    <Button
                                                        as={Link}
                                                        href="/course"
                                                        w='228px'
                                                        h='60px'
                                                        mb={{ base: '30px', lg: '0' }}
                                                        color={useColorModeValue('white', '#23262A')}
                                                        borderRadius={{ base: '6px', lg: '20px' }}
                                                        bgGradient='linear(#FEC84B, #F79009)'
                                                        _hover={{
                                                            bgGradient: 'linear(#F79009, #FEC84B)',
                                                        }}
                                                        _active={{
                                                            bgGradient: 'linear(#F79009, #FEC84B)',
                                                        }}
                                                    >
                                                        <Text fontSize='lg'>ดูคอร์สเรียนทั้งหมด</Text>
                                                    </Button>
                                                </Stack>
                                                <Stack
                                                    w='100%'
                                                    h='100%'
                                                    position='relative'
                                                    align='center'
                                                    justify='center'
                                                >
                                                    <Box
                                                        w={{ base: '250px', lg: '330px' }}
                                                        h={{ base: '330px', lg: '420px' }}
                                                        bgGradient='linear(#1363DF, #47B5FF)'
                                                        borderRadius='20px'
                                                    >
                                                    </Box>
                                                    {
                                                        banner.type.toLowerCase() === 'image' ?
                                                            (
                                                                <Image
                                                                    position='absolute'
                                                                    src={banner.url}
                                                                    alt={banner.name}
                                                                    loading="lazy"
                                                                    w={{ base: '380px', lg: '530px' }}
                                                                    h={{ base: '230px', lg: '300px' }}
                                                                    borderRadius='20px'
                                                                />
                                                            )
                                                            :
                                                            (
                                                                <Box
                                                                    title="youtube video"
                                                                    position='absolute'
                                                                    w={{ base: '380px', lg: '530px' }}
                                                                    h={{ base: '230px', lg: '300px' }}
                                                                    bg='#000000'
                                                                    borderRadius='20px'
                                                                >
                                                                    <ReactPlayer
                                                                        className='react-player'
                                                                        url={banner.url}
                                                                        width='100%'
                                                                        height='100%'
                                                                        onPlay={() => {
                                                                            console.log('onPlay');
                                                                            swiperRef.current?.autoplay.stop();
                                                                        }}
                                                                        onPause={() => {
                                                                            console.log('onPause');
                                                                            swiperRef.current?.autoplay.start();
                                                                        }}
                                                                        stopOnUnmount
                                                                        onProgress={() => {
                                                                            swiperRef.current?.autoplay.stop();

                                                                            setTimeout(() => {
                                                                                swiperRef.current?.autoplay.start();
                                                                            }, 1000)
                                                                        }}
                                                                    />
                                                                </Box>
                                                            )
                                                    }
                                                </Stack>
                                            </Stack>
                                        </SwiperSlide>
                                    ))
                                }
                            </Box>
                        )
                    }
                </Box>
            </Container>
        </Stack>
    )
}