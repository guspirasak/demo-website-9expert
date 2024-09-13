'use client'

import { trainingScheduleUrl } from "@/config/schedule";
import { containerBreakpoints } from "@/config/theme";
import { getSchedule } from "@/libs/AdminAPI";
import { getCourseGroup } from "@/redux/courseGroupSlide";
import { getTechnologyAreas } from "@/redux/technologyAreasSlide";
import { DownloadIcon } from "@chakra-ui/icons";
import { useBreakpointValue, Container, Stack, Text, useColorModeValue, Heading, Button, HStack, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FreeMode, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TCourseGroup, TTechnologyArea } from "../../admin/interface/CreateCourseInterface";
import { HeroBanner } from "../../components/layout/Banner/HeroBanner";
import { Footer } from "../../components/layout/Footer";
import { Navbar } from "../../components/layout/Navbar";
import { CourseTechnologyFilterButton, CourseProgramFilterButton } from "../../course/components/CourseFilterButton";
import { PDFFileIcon } from "../../icons/CourseIcon";
import { ScheduleMobile } from "./ScheduleMobile";
import { TableStatus, ScheduleTable } from "./ScheduleTable";
import { Chat } from "../../components/Chat";

export type ClassSchedule = {
    _id: string
    classType: string
    classStartDate: string
    classEndDate: string
}

export type Course = {
    _id: string
    courseName: string
    courseType: string
    courseGroupName: string
    courseGroupNameAbbr: string
    courseUrl: string
    days: string
    hours: string
    price: number
    classSchedule: ClassSchedule[]
}

export type TCourseScheduleGroup = {
    courseGroupName: string,
    courseGroupColor: string[]
    courseGroupIcon: string
    course: Course[]
}

export type TCourseSchedule = {
    technologyArea: string
    order: number
    courseGroup: TCourseScheduleGroup[]
}

export type TScheduleFilter = {
    technologyArea: string[]
    courseGroup: TCourseGroup[]
    selectedCourseGroup: string[]
}

export const SchedulePage = () => {
    const technologyArea = useSelector(getTechnologyAreas)
    const courseGroup = useSelector(getCourseGroup)
    const fontColor = useColorModeValue('#2E2E2E', '#FFFFFF')
    const cardBg = useColorModeValue('#FFFFFFF', '#FFFFFF11')
    
    const [schedule, setSchedule] = useState<TCourseSchedule[]>([])
    const [cache, setCache] = useState<TCourseSchedule[]>([])

    const [filter, setFilter] = useState<TScheduleFilter>({
        technologyArea: ['All'],
        courseGroup: [],
        selectedCourseGroup: ['All'],
    })

    const isDesktop = useBreakpointValue({
        base: false,
        lg: true
    })

    useEffect(() => {
        getSchedule((data: TCourseSchedule[], error: unknown) => {
            if (error) console.log(error);
            if (data) {
                setSchedule(data)
                setCache(data)
            }
        })
    }, [])

    useEffect(() => {
        setFilter(prev => ({
            ...prev,
            courseGroup: courseGroup,
        }))
    }, [courseGroup])

    // useEffect(() => {
    //     setFilter({
    //         technologyArea: ['All'],
    //         courseGroup: courseGroup,
    //         selectedCourseGroup: ['All'],
    //     })
    // }, [cache])

    useEffect(() => {
        if (filter.selectedCourseGroup[0] === 'All') {
            if (filter.technologyArea[0] === 'All') {
                console.log('Technology area all')
                setFilter(prev => ({
                    ...prev,
                    courseGroup: courseGroup,
                    selectedCourseGroup: ['All'],
                }))
                setSchedule(cache)
            } else {
                const newCache = cache.filter((c) => [
                    ...c.courseGroup.map((course) => course.courseGroupName)
                ])
                setSchedule(newCache)
            }
        }


        if (filter.technologyArea[0] !== 'All') {

            const filterTechnologyArea = technologyArea.filter((item: TTechnologyArea) => filter.technologyArea.includes(item.technologyName))

            const filterCourseGroup = filterTechnologyArea.map((item: TTechnologyArea) => item.courseGroup)

            setFilter({
                ...filter,
                courseGroup: courseGroup.filter((item: TCourseGroup) => filterCourseGroup.map((i: string[]) => i.includes(item._id as string)).includes(true))
            })

            setSchedule(cache.filter((c) => filter.technologyArea.includes(c.technologyArea)))
        }
    }, [filter.technologyArea])

    useEffect(() => {

        let newCache: TCourseSchedule[] = cache

        if (filter.selectedCourseGroup[0] !== 'All') {

            if (filter.technologyArea[0] === 'All') {

                const cgName = courseGroup.map((c:any) => c.courseGroupName)

                const filterCourseGroup: string[] = cgName.filter((item: string) => filter.selectedCourseGroup.includes(item))

                const filterTechnologyArea = cache.filter((c) => {
                    const filterC = c.courseGroup.map((sc) => {
                        const filterCg = filterCourseGroup.map((i) => sc.courseGroupName.includes(i)).includes(true)

                        return filterCg
                    }).includes(true)

                    return filterC
                })

                const fcg = filterTechnologyArea.map((item: TCourseSchedule) => item.courseGroup.filter(c => filter.selectedCourseGroup.includes(c.courseGroupName)))

                const ta: TCourseSchedule[]= []

                filterTechnologyArea.forEach((item: TCourseSchedule, index: number) => {

                    const fta = fcg.map(i => {
                        const ftcg = i.filter(c => item.courseGroup.map((sc) => sc.courseGroupName.includes(c.courseGroupName)).includes(true))

                        return ftcg
                    })

                    const newFta = fta.filter((i) => i.length > 0)[0]

                    const newTa = { ...item, courseGroup: newFta }
                    

                    ta.push(newTa)
                })

                newCache = ta


            } else if (filter.technologyArea.length > 1 && filter.technologyArea[0] !== 'All') {

                const filterTechnologyArea = cache.filter((c) => filter.technologyArea.includes(c.technologyArea))

                const filterCourseGroup = filterTechnologyArea.map((item: TCourseSchedule) => item.courseGroup.filter(c => filter.selectedCourseGroup.includes(c.courseGroupName)))

                const ta = filterTechnologyArea.map((item: TCourseSchedule, index: number) => {
                    const newTa = { ...item, courseGroup: filterCourseGroup[index] }
                    return newTa
                })


                newCache = ta
            } else {
                const filterTechnologyArea = cache.filter(c => filter.technologyArea.includes(c.technologyArea))[0]

                const filterCourseGroup = filterTechnologyArea.courseGroup.filter(c => filter.selectedCourseGroup.includes(c.courseGroupName))

                const ta = { ...filterTechnologyArea, courseGroup: filterCourseGroup }

                newCache = [ta]
            }
            
        }

        if (filter.selectedCourseGroup[0] === 'All' && filter.technologyArea[0] !== 'All') {
            console.log('Selected course group all')
            newCache = cache.filter((c) => filter.technologyArea.includes(c.technologyArea))
        }

        setSchedule(newCache)

    }, [filter.selectedCourseGroup])

    return (
        <>
            <Navbar />
            <HeroBanner title="ตารางการฝึกอบรม" subtitle="ลูกค้าสามารถอบรมได้ทั้งแบบ Virtual Training และแบบ Classroom ตามรอบอบรมที่กำหนด" />
            <Stack w='100%'
                align='center'
                justify='center'
                px={{ base: '2rem', lg: '4rem' }}
                py={{ base: '3rem', lg: '4rem' }}>
                <Container p={0} maxW={containerBreakpoints}
                >
                    <Stack
                        w='100%'
                        h='100%'
                        minH='519px'
                        p={{ base: '1rem', lg: '2rem' }}
                        align='center'
                        justify='start'
                        borderRadius='20px'
                        bg={cardBg}
                        shadow={{ base: 'none', lg: 'lg' }}
                        spacing={{ base: '1rem', lg: '2rem' }}
                    >
                        <Stack
                            w='100%'
                            h='100%'
                            direction={{ base: 'column', lg: 'row' }}
                            align='start'
                            justify='center'
                            spacing='1rem'
                        >
                            <Text
                                minW='max-content'
                                fontSize='1.25rem'
                            >
                                เทคโนโลยีที่น่าสนใจ
                            </Text>
                            <Stack
                                className='technologyAreaScheduleFilter'
                                as={Swiper}
                                w='100%'
                                pb='1rem'
                                direction='row'
                                freeMode={true}
                                slidesPerView={'auto'}
                                spaceBetween={8}
                                scrollbar={{
                                    hide: false,
                                    draggable: true,
                                    snapOnRelease: true
                                }}
                                modules={[FreeMode, Scrollbar]}
                            >
                                <SwiperSlide
                                    style={{ width: 'max-content' }}
                                >
                                    <CourseTechnologyFilterButton
                                        onClick={() => setFilter({ ...filter, technologyArea: ['All'], selectedCourseGroup: ['All'] })}
                                        isActive={filter.technologyArea[0] === 'All'}
                                    >
                                        {`All`}
                                    </CourseTechnologyFilterButton>
                                </SwiperSlide>
                                {
                                    technologyArea.map((item: TTechnologyArea, index: number) => (
                                        <SwiperSlide
                                            key={index}
                                            style={{ width: 'max-content' }}
                                        >
                                            <CourseTechnologyFilterButton
                                                onClick={() => {
                                                    setFilter((prev) => {
                                                        if (prev.technologyArea.includes(item.technologyName)) {
                                                            return {
                                                                ...prev,
                                                                technologyArea: prev.technologyArea.length === 1 ? ['All'] : prev.technologyArea.filter((t: string) => t !== item.technologyName && t !== 'All')
                                                            }
                                                        }
                                                        return {
                                                            ...prev,
                                                            technologyArea: [...prev.technologyArea.filter((t: string) => t !== 'All'), item.technologyName]
                                                        }
                                                    })
                                                }}
                                                isActive={filter.technologyArea.includes(item.technologyName)}
                                            >
                                                {item.technologyName}
                                            </CourseTechnologyFilterButton>
                                        </SwiperSlide>
                                    ))
                                }
                            </Stack>
                        </Stack>
                        <Stack
                            w='100%'
                            h='100%'
                            direction={{ base: 'column', lg: 'row' }}
                            align='start'
                            justify='center'
                            spacing='1rem'
                        >
                            <Text
                                minW='max-content'
                                fontSize='1.25rem'
                            >
                                {`โปรแกรม`}
                            </Text>
                            <Stack
                                className='technologyAreaScheduleFilter'
                                as={Swiper}
                                w='100%'
                                pb='1rem'
                                direction='row'
                                freeMode={true}
                                slidesPerView={'auto'}
                                spaceBetween={8}
                                scrollbar={{
                                    hide: false,
                                    draggable: true,
                                    snapOnRelease: true
                                }}
                                modules={[FreeMode, Scrollbar]}
                            >
                                <SwiperSlide
                                    style={{ width: 'max-content' }}
                                >
                                    <CourseProgramFilterButton
                                        onClick={() => setFilter({ ...filter, selectedCourseGroup: ['All'] })}
                                        isActive={filter.selectedCourseGroup[0] === 'All'}
                                    >
                                        {`All`}
                                    </CourseProgramFilterButton>
                                </SwiperSlide>
                                {
                                    filter.courseGroup.map((item: TCourseGroup, index: number) => (
                                        <SwiperSlide
                                            key={index}
                                            style={{ width: 'max-content' }}
                                        >
                                            <CourseProgramFilterButton
                                                onClick={() => {
                                                    setFilter((prev) => {
                                                        if (prev.selectedCourseGroup.includes(item.courseGroupName)) {
                                                            return {
                                                                ...prev,
                                                                selectedCourseGroup: prev.selectedCourseGroup.length === 1 ? ['All'] : prev.selectedCourseGroup.filter((t: string) => t !== item.courseGroupName)
                                                            }
                                                        }
                                                        return {
                                                            ...prev,
                                                            selectedCourseGroup: [...prev.selectedCourseGroup.filter((t: string) => t !== 'All'), item.courseGroupName]
                                                        }
                                                    })
                                                }}
                                                isActive={filter.selectedCourseGroup.includes(item.courseGroupName)}
                                            >
                                                {item.courseGroupName}
                                            </CourseProgramFilterButton>
                                        </SwiperSlide>
                                    ))
                                }
                            </Stack>
                        </Stack>
                        <Stack
                            mt='2rem'
                            w={{ base: '100%', lg: '398px' }}
                            align='center'
                            justify='center'
                            p='30px'
                            bg='#FF211633'
                            borderRadius='20px'
                        >
                            <Stack
                                w='100%'
                                h='100%'
                                align='center'
                                justify='center'
                                direction='row'
                                spacing='23px'
                            >
                                <PDFFileIcon w={{ base: '48px', lg: '69px' }} h={{ base: '61px', lg: '86px' }} />
                                <Stack
                                    w='100%'
                                    h='100%'
                                    align='start'
                                    justify='space-between'
                                >
                                    <Text
                                        fontWeight='bold'
                                        fontSize={{ base: '16px', lg: '20px' }}
                                        textColor='#F65A5A'
                                    >
                                        ดาวน์โหลดตารางการฝึกอบรม
                                    </Text>
                                    <Button
                                        as={Link}
                                        href={trainingScheduleUrl}
                                        target="_blank"
                                        w='131px'
                                        h='40px'
                                        bg='#F65A5A'
                                        borderRadius='full'
                                        textColor='white'
                                        fontSize='16px'
                                        rightIcon={<DownloadIcon w='16px' h='16px' />}
                                        _hover={{
                                            bg: '#F65A5A'
                                        }}
                                        _active={{
                                            bg: '#F65A5A'
                                        }}
                                    >
                                        {`ดาวน์โหลด`}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack
                        w='100%'
                        h='100%'
                        align='center'
                        justify='center'
                        spacing='2rem'
                    >
                        {
                            schedule.filter((i) => i.courseGroup.length > 0 && i.courseGroup.filter(c => c.course.length > 0).length > 0).map((item, index) => (
                                item.courseGroup.length > 0 && (
                                    <React.Fragment key={index}>
                                        <Stack
                                            w='100%'
                                            h='93px'
                                            direction='row'
                                            align='center'
                                            justify={{ base: 'center', lg: 'space-between' }}
                                            borderBottom='1px'
                                        >
                                            <Heading
                                                w={{ base: '100%', lg: 'max-content' }}
                                                textAlign={{ base: 'center', lg: 'start' }}
                                                fontSize={{ base: '24px', lg: '32px' }}
                                                textColor={fontColor}
                                            >
                                                {item.technologyArea}
                                            </Heading>
                                            {
                                                isDesktop &&
                                                <HStack
                                                    spacing='30px'
                                                    zIndex={10}
                                                >
                                                    <Tooltip
                                                        label='อบรม Class Room ณ ห้องอบรม 9EXPERT'
                                                        hasArrow
                                                        bg='#2E2E2E'
                                                        w='143px'
                                                        textAlign='center'
                                                        borderRadius='5px'
                                                    >
                                                        <Stack
                                                            as='span'
                                                            zIndex='10000'
                                                        >
                                                            <TableStatus status={'Classroom'} />
                                                        </Stack>
                                                    </Tooltip>
                                                    <Tooltip
                                                        label='สอนสดออนไลน์ผ่าน Microsoft Teams'
                                                        hasArrow
                                                        bg='#2E2E2E'
                                                        w='143px'
                                                        textAlign='center'
                                                        borderRadius='5px'
                                                    >
                                                        <Stack
                                                            as='span'
                                                            zIndex='10000'
                                                        >
                                                            <TableStatus status={'Live'} />
                                                        </Stack>
                                                    </Tooltip>
                                                    <Tooltip
                                                        label='เลือกอบรม Class Room หรือ Live'
                                                        hasArrow
                                                        bg='#2E2E2E'
                                                        w='143px'
                                                        textAlign='center'
                                                        borderRadius='5px'
                                                    >
                                                        <Stack
                                                            as='span'
                                                            zIndex='10000'
                                                        >
                                                            <TableStatus status={'Hybrid'} />
                                                        </Stack>
                                                    </Tooltip>
                                                </HStack>
                                            }
                                        </Stack>
                                        {
                                            item.courseGroup.filter(c => c.course.length > 0).map((cg, i) => (
                                                isDesktop ?
                                                    <ScheduleTable key={i} courseGroup={cg} />
                                                    :
                                                    <ScheduleMobile key={i} courseGroup={cg} />
                                            ))
                                        }
                                    </React.Fragment>
                                )
                            ))
                        }
                    </Stack>

                </Container>
            </Stack>
            <Chat />
            <Footer />
        </>
    )
}