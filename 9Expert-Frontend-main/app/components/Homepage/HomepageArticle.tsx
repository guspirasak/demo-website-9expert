'use client'

import { Box, Button, Center, Container, HStack, Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { ArticleFilterButton, ProgramFilterButton } from "./FilterButton"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Scrollbar } from "swiper/modules"
import { HomepageArticleCard } from "../ContentCard/HomepageArticleCard"
import { ProgramList, TechnologyArea } from "@/libs/GlobalData"
import { TArticle } from "@/app/admin/interface/CreateArticleInterface"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { containerBreakpoints } from "@/config/theme"
import { useSelector } from "react-redux"
import { getTechnologyAreas } from "@/redux/technologyAreasSlide"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { TCourseGroup, TTechnologyArea } from "@/app/admin/interface/CreateCourseInterface"
import { getAllArticlesByMultiAreaName, getAllArticlesByMultiCourseGroupName } from "@/libs/UserAPI"
import { TScheduleFilter } from "@/app/schedule/components/SchedulePage"

export const HomepageArticle = ({ articles }: { articles: TArticle[] }) => {
    const [cache, setCache] = useState<TArticle[]>(articles)
    const [filter, setFilter] = useState<TScheduleFilter>({
        technologyArea: ['All'],
        courseGroup: [],
        selectedCourseGroup: ['All'],
    })

    const ta = useSelector(getTechnologyAreas).map((a: TTechnologyArea) => ({ technologyName: a.technologyName, _id: a._id, courseGroup: a.courseGroup }))

    const technologyArea = useSelector(getTechnologyAreas)
    const courseGroup = useSelector(getCourseGroup)

    const tiggerScroll = useBreakpointValue({ base: 1, md: 2, '2xl': 5 }) || 1;

    const isShowScrollBar: boolean = cache.length > tiggerScroll;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>()

    useEffect(() => {
        setFilter({
            technologyArea: ['All'],
            courseGroup: courseGroup,
            selectedCourseGroup: ['All'],
        })
    }, [articles])

    useEffect(() => {
        if (filter.technologyArea.length === 0 || filter.technologyArea.includes('All')) {
            setFilter(prev => ({
                ...prev,
                courseGroup: courseGroup,
                selectedCourseGroup: ['All'],
            }))
            setCache(articles)
            return 
        } else {
            const filterTechnologyArea = technologyArea.filter((item: TTechnologyArea) => filter.technologyArea.includes(item.technologyName))

            const filterCourseGroup = filterTechnologyArea.map((item: TTechnologyArea) => item.courseGroup)

            setFilter({
                ...filter,
                courseGroup: courseGroup.filter((item: TCourseGroup) => filterCourseGroup.map((i: string[]) => i.includes(item._id as string)).includes(true))
            })
            getAllArticlesByMultiAreaName(filter.technologyArea, 'Article', (data: TArticle[], error: unknown) => {
                if (error) console.log(error)

                if (data) setCache(data)
            })
        }
    }, [filter.technologyArea])

    useEffect(() => {
        if (filter.selectedCourseGroup.length === 0 || filter.selectedCourseGroup.includes('All')) {
            if (filter.technologyArea.length === 0 || filter.technologyArea.includes('All')) {
                setCache(articles)
                return
            } else {
                getAllArticlesByMultiAreaName(filter.technologyArea, 'Article', (data: TArticle[], error: unknown) => {
                    if (error) console.log(error)

                    if (data) setCache(data)
                })
            }
        } else {
            getAllArticlesByMultiCourseGroupName(filter.selectedCourseGroup.map((item: string) => item), 'Article', (data: TArticle[], error: unknown) => {
                if (error) console.log(error)

                if (data) setCache(data)
            })
        }
    }, [filter.selectedCourseGroup])

    return (
        <Stack
            align='center'
            w='100%'
            h='100%'
            position='relative'
            px={{ base: '2rem', lg: '4rem' }}
            py={{ base: '3rem', lg: '4rem' }}
            spacing='2rem'
        >
            <HStack
                my={{ base: '1rem', lg: '3rem' }}
                spacing='2rem'
            >
                <Heading as='h2' size={{ base: 'lg', md: '2xl' }} >{`บทความ`}</Heading>
            </HStack>
            <Container
                p={0} maxW={containerBreakpoints}
            >
                <Stack
                    spacing='1.5rem'
                >
                    <Stack
                        direction={{ base: 'column', lg: 'row' }}
                        align={{ base: 'start', lg: 'center' }}
                    >
                        <Text as='b' w='10rem'>{`เทคโนโลยีที่น่าสนใจ : `}</Text>
                        <Box
                            as={Swiper}
                            className='boxSwiperOfflineCourse'
                            w='100%'
                            h='100%'
                            freeMode={true}
                            slidesPerView={'auto'}
                            spaceBetween={7}
                            initialSlide={0}
                            modules={[FreeMode]}
                        >
                            <SwiperSlide
                                style={{ width: 'auto' }}
                            >
                                <ArticleFilterButton
                                    onClick={() => {
                                        if (filter.technologyArea.length === filter.technologyArea.length) {
                                            setFilter({ ...filter, technologyArea: ['All'] })
                                            return
                                        }
                                        setFilter({ ...filter, technologyArea: ['All'] })
                                        return
                                    }}
                                    isActive={filter.technologyArea.includes('All')}
                                >
                                    {`All`}
                                </ArticleFilterButton>
                            </SwiperSlide>
                            {
                                ta.map((value: { technologyName: string, _id: string }, index: number) => (
                                    <SwiperSlide
                                        key={index}
                                        style={{ width: 'auto' }}
                                    >
                                        <ArticleFilterButton
                                            onClick={() => {

                                                if (filter.technologyArea.includes(value.technologyName)) {

                                                    const newAreas = filter.technologyArea.filter((area) => area !== value.technologyName && area !== 'All')

                                                    if (newAreas.length === 0) {
                                                        setFilter(prev => ({ ...prev, technologyArea: ['All'] }))
                                                        return
                                                    } else {
                                                        setFilter(prev => ({ ...prev, technologyArea: newAreas }))
                                                    }

                                                    return
                                                }

                                                setFilter(prev => ({
                                                    ...prev,
                                                    technologyArea: [...prev.technologyArea.filter((area) => area !== 'All'), value.technologyName]
                                                }))
                                            }}
                                            isActive={filter.technologyArea.includes(value.technologyName)}
                                        >
                                            {value.technologyName}
                                        </ArticleFilterButton>
                                    </SwiperSlide>
                                ))
                            }
                        </Box>
                    </Stack>
                    <Stack
                        direction={{ base: 'column', lg: 'row' }}
                        align={{ base: 'start', lg: 'center' }}
                    >
                        <Text as='b' w='5rem'>{`โปรแกรม : `}</Text>
                        <Box
                            as={Swiper}
                            className='boxSwiperOfflineCourse'
                            w='100%'
                            h='100%'
                            freeMode={true}
                            slidesPerView={'auto'}
                            spaceBetween={7}
                            initialSlide={0}
                            modules={[FreeMode]}
                        >
                            <SwiperSlide

                                style={{ width: 'auto' }}
                            >
                                <ProgramFilterButton
                                    onClick={() => setFilter({ ...filter, selectedCourseGroup: ['All'] })}
                                    isActive={filter.selectedCourseGroup[0] === 'All'}
                                >
                                    {'All'}
                                </ProgramFilterButton>
                            </SwiperSlide>
                            {
                                filter.courseGroup.map((value: TCourseGroup, index: number) => (
                                    <SwiperSlide
                                        key={index}
                                        style={{ width: 'auto' }}
                                    >
                                        <ProgramFilterButton
                                            onClick={() => {
                                                setFilter((prev) => {
                                                    if (prev.selectedCourseGroup.includes(value.courseGroupName)) {
                                                        return {
                                                            ...prev,
                                                            selectedCourseGroup: prev.selectedCourseGroup.length === 1 ? ['All'] : prev.selectedCourseGroup.filter((t: string) => t !== value.courseGroupName)
                                                        }
                                                    }
                                                    return {
                                                        ...prev,
                                                        selectedCourseGroup: [...prev.selectedCourseGroup.filter((t: string) => t !== 'All'), value.courseGroupName]
                                                    }
                                                })
                                            }}
                                            isActive={filter.selectedCourseGroup.includes(value.courseGroupName)}
                                        >
                                            {value.courseGroupName}
                                        </ProgramFilterButton>
                                    </SwiperSlide>
                                ))
                            }
                        </Box>
                    </Stack>
                </Stack>
                <Box
                    w='100%'
                    h='480px'
                    position='relative'
                >
                    {
                        cache.length === 0 ?
                            <Stack
                                w='100%'
                                h='300px'
                                align='center'
                                justify='center'
                            >
                                <Text
                                    fontSize='xl'
                                >
                                    {`ไม่สามารถแสดงบทความได้เนื่องจาก ยังไม่มีบทความในขณะนี้`}
                                </Text>
                            </Stack>
                            :
                            <Box
                                as={Swiper}
                                className='boxSwiperOfflineCourse'
                                w='100%'
                                h='100%'
                                py='1rem'
                                px='0.5rem'
                                mt={{ base: '2rem', lg: '5rem' }}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onSwiper={(swiper: any) => swiperRef.current = swiper}
                                loop={false}
                                slidesPerView='auto'
                                spaceBetween={30}
                                initialSlide={0}
                                scrollbar={{
                                    hide: false,
                                    draggable: true,
                                    snapOnRelease: true
                                }}
                                modules={[Scrollbar]}
                            >
                                {cache.map((data, index) => (
                                    <SwiperSlide
                                        key={index}
                                        style={{ width: '360px' }}
                                    >
                                        <Center
                                            as={Link}
                                            href={`/article/${data.articleTitle.replaceAll(' ', '_')}`}
                                        >
                                            <HomepageArticleCard article={data} />
                                        </Center>
                                    </SwiperSlide>
                                ))}
                                {
                                    isShowScrollBar && (
                                        <>
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
                                        </>
                                    )
                                }
                            </Box>
                    }
                </Box>
            </Container>
        </Stack>
    )
}