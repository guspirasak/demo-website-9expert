'use client'

import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { Heading, Stack, Image, HStack, Box, Button, Center, Link, useBreakpointValue } from "@chakra-ui/react"
import { useGroup } from "../context/GroupContext"
import { HomepageArticleCard } from "@/app/components/ContentCard/HomepageArticleCard"
import { cache, useRef } from "react"
import { Scrollbar } from "swiper/modules"
import { SwiperSlide } from "swiper/react"
import { Swiper } from "swiper/react"


export const GroupArticle = ({ article }: { article: TArticle[] }) => {

    const { state } = useGroup()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>()

    return (
        <Stack
            w='100%'
            h='100%'
            minH='1045px'
            align='center'
            justify='start'
        >
            <HStack
                w='100%'
                align='center'
                justify='center'
            >
                <Image
                    alt={state.courseGroup.courseGroupName + ' logo'}
                    src={state.courseGroup.courseGroupIcon}
                    w='60px'
                    h='60px'
                />
                <Heading
                    w='max-content'
                    textAlign='center'
                    fontSize={{ base: '32px', lg: '48px' }}
                >
                    {`บทความที่เกี่ยวข้อง`}
                </Heading>
            </HStack>
            <Box
                as={Swiper}
                className='boxSwiperOfflineCourse'
                w='100%'
                h='100%'
                px={{ base: '0', lg: '0.5rem' }}
                pt='1rem'
                pb='5rem'
                mt={{ base: '2rem', lg: '5rem' }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSwiper={(swiper: any) => swiperRef.current = swiper}
                // loop={true}
                slidesPerView='auto'
                centeredSlides={useBreakpointValue({ base: true, md: false })}
                spaceBetween={30}
                initialSlide={0}
                scrollbar={{
                    hide: false,
                    draggable: true,
                    snapOnRelease: true
                }}
                modules={[Scrollbar]}
            >
                {article.map((data, index) => (
                    <SwiperSlide
                        key={index}
                        style={{ width: '360px' }}
                    >
                        <Center
                            as={Link}
                            href={`/article/${data.articleTitle.replaceAll(' ', '_')}`}
                            _hover={{ textDecoration: 'none' }}
                        >
                            <HomepageArticleCard article={data} />
                        </Center>
                    </SwiperSlide>
                ))}
                {article.length > 3 ? <Stack >
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
        </Stack>
    )
}