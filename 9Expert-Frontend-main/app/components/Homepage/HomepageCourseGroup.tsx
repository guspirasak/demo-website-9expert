'use client'

import { Box, Grid, Heading, SimpleGrid, Stack, useColorModeValue } from "@chakra-ui/react"
import { MiniCourseCard } from "./MiniCourseCard"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { useSelector } from "react-redux"
import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"


export const HomepageCourseGroup = () => {
    const courseGroup = useSelector(getCourseGroup)
    const bgColor = useColorModeValue('linear-gradient(315deg, rgba(211, 235, 251, 1), rgba(217, 222, 255, 1))', 'linear-gradient(315deg, #001A72, #34B0EE)')

    function splitArray<T>(arr: T[], chunkSize: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    }

    return (
        <Stack
            w='100%'
            h='100%'
            bgGradient={bgColor}
            position='relative'
            align='center'
            justify='center'
            py={{ base: '3rem', lg: '4rem' }}
            px={{ base: '2rem', lg: '4rem' }}
            spacing={{ base: '2rem', lg: '4rem' }}
        >
            <Heading
                as='h2'
                size={{ base: 'lg', md: '2xl' }}
            >
                กลุ่มหลักสูตร
            </Heading>
            <SimpleGrid
                as='ul'
                display={{ base: 'none', 'xl-1': 'grid' }}
                w='100%'
                maxW={'1920px'}
                h='min-content'
                columns={4}
                rowGap='2rem'
                spacing='2rem'
            >
                {
                    courseGroup.length > 0 && courseGroup.map((item: TCourseGroup, i: number) =>
                        <Stack
                            key={i}
                            as='li'
                        >
                            <MiniCourseCard
                                
                                icon={item.courseGroupIcon}
                                title={item.courseGroupNameAbbr}
                                color={item.courseGroupColor.length > 1 ? `linear-gradient(${item.courseGroupColor[0]}, ${item.courseGroupColor[1]})` : item.courseGroupColor[0]}
                            />
                        </Stack>
                    )}
            </SimpleGrid>
            <Box
                as={Swiper}
                className='boxSwiperOfflineCourse'
                display={{ base: 'block', 'xl-1': 'none' }}
                w='100%'
                h='100%'
                slidesPerView='auto'
                spaceBetween={30}
                centeredSlides={true}
                initialSlide={2}
                modules={[Pagination]}
            >
                {courseGroup.length > 0 && splitArray<TCourseGroup>(courseGroup, 3).map((item, i: number) =>
                    <SwiperSlide
                        key={i}
                        style={{
                            width: 'min-content',
                            height: 'min-content',
                        }}
                    >
                        <Grid
                            w='100%'
                            h='100%'
                            templateRows='repeat(3, 1fr)'
                            rowGap='2rem'
                        >
                            {
                                item.map((cg: TCourseGroup, index: number) =>
                                    <MiniCourseCard
                                        key={index}
                                        icon={cg.courseGroupIcon}
                                        title={cg.courseGroupNameAbbr}
                                        color={cg.courseGroupColor.length > 1 ? `linear-gradient(${cg.courseGroupColor[0]}, ${cg.courseGroupColor[1]})` : cg.courseGroupColor[0]}
                                    />
                                )
                            }
                        </Grid>
                    </SwiperSlide>
                )}
            </Box>
        </Stack>
    )
}