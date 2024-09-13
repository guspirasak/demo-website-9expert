'use client'

import { ExBlueOfflineCourseIcon } from "@/app/icons/HomeIcons"
import { Box, Button, Center, Checkbox, Container, HStack, Heading, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react"
import { FilterButton } from "./FilterButton"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Scrollbar } from "swiper/modules"
import { OnlineCard } from "../ContentCard/OnlineCard"
import { LevelList, TechnologyArea } from "@/libs/GlobalData"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { TCourseCard } from "../ContentCard/Card"
import { useState, useEffect, useRef } from "react"
import { TDifficultLevelCheckBox } from "./interfaces/Homepage"
import Link from "next/link"
import { getCoursesByArea } from "@/services/api/course"
import { containerBreakpoints } from "@/config/theme"
import { getTechnologyAreas } from "@/redux/technologyAreasSlide"
import { TTechnologyArea } from "@/app/admin/interface/CreateCourseInterface"
import { useSelector } from "react-redux"

export const HomepageOnlineCourse = ({ courses }: { courses: TCourseCard[] }) => {

    const [cache, setCache] = useState<TCourseCard[]>([])
    const [newCourse, setNewCourse] = useState<TCourseCard[]>(courses)
    const [checked, setChecked] = useState<TDifficultLevelCheckBox>({
        All: true,
        Beginner: false,
        Intermediate: false,
        Advance: false,
        Expert: false,
    })

    const [technologyAreas, setTechnologyAreas] = useState<string[]>(['All'])

    const ta = useSelector(getTechnologyAreas).map((a: TTechnologyArea) => a.technologyName)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>()

    useEffect(() => {
        async function fetchData() {
            const data = await getCoursesByArea(technologyAreas, 'Online');
            setCache(data as TCourseCard[])
            setNewCourse(data as TCourseCard[]);
        }
        fetchData();
    }, [technologyAreas]);

    useEffect(() => {

        if (Object.keys(checked).filter((key) => checked[key as keyof TDifficultLevelCheckBox] === true).length === 0) {
            setChecked({
                All: true,
                Beginner: false,
                Intermediate: false,
                Advance: false,
                Expert: false
            })
            setCache(newCourse)
            return
        }


        if (checked.All) {
            setCache(newCourse)
            return
        } else {
            setCache(newCourse.filter((course) => {
                if (checked.Beginner && course.difficultLevel === 'Beginner') return true
                if (checked.Intermediate && course.difficultLevel === 'Intermediate') return true
                if (checked.Advance && course.difficultLevel === 'Advance') return true
                if (checked.Expert && course.difficultLevel === 'Expert') return true
                return false
            }))
        }
    }, [checked])

    const selectedFilter = Object.keys(checked).filter((key) => checked[key] === true).toString()

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
                my='3rem'
                spacing='2rem'
            >
                <ExBlueOfflineCourseIcon patternid='icon-pattern-2' imageid='image-online-course' w='75px' h='75px' />
                <Heading as='h2' size={{ base: 'lg', md: '2xl' }} >{`คอร์สออนไลน์`}</Heading>
            </HStack>
            <Container
                p={0} maxW={containerBreakpoints}
            >
                <Stack
                    w='100%'
                    direction='row'
                    align='center'
                    justify='space-between'
                >
                    <Stack
                        w='100%'
                        h='100%'
                    >
                        <Text as='p' fontWeight='bold'>{`เทคโนโลยีที่น่าสนใจ `}</Text>
                        <Stack
                            display={{ base: 'none', lg: 'flex' }}
                            as='div'
                            direction='row'
                            spacing='1rem'
                            maxW='100%'
                            w='fit-content'
                        >
                            <FilterButton
                                onClick={() => {
                                    if (technologyAreas.length === TechnologyArea.length) {
                                        setTechnologyAreas([])
                                        return
                                    }
                                    setTechnologyAreas(['All'])
                                    return
                                }}
                                isActive={technologyAreas.includes('All')}
                            >
                                {`All`}
                            </FilterButton>
                            {
                                ta.slice(0, 4).map((value:string, index:number) => (
                                    <FilterButton
                                        key={index}
                                        onClick={() => {
                                            if (value === 'All') {
                                                if (technologyAreas.length === TechnologyArea.length) {
                                                    setTechnologyAreas([])
                                                    return
                                                }
                                                setTechnologyAreas(['All'])
                                                return
                                            }

                                            if (technologyAreas.includes(value)) {

                                                const newAreas = technologyAreas.filter((area) => area !== value && area !== 'All')

                                                if (newAreas.length === 0) {
                                                    setTechnologyAreas(['All'])
                                                    return
                                                } else {
                                                    setTechnologyAreas(newAreas)
                                                }

                                                return
                                            }

                                            setTechnologyAreas([...technologyAreas.filter((area) => area !== 'All'), value])
                                        }}
                                        isActive={technologyAreas.includes(value)}
                                    >
                                        {value}
                                    </FilterButton>
                                ))
                            }
                        </Stack>
                        <Stack
                            display={{ base: 'none', lg: 'flex' }}
                            as='div'
                            direction='row'
                            spacing='1rem'
                            maxW='100%'
                            w='fit-content'
                        >
                            {
                                ta.slice(4).map((value:string, index: number) => (
                                    <FilterButton
                                        key={index}
                                        onClick={() => {
                                            if (value === 'All') {
                                                if (technologyAreas.length === TechnologyArea.length) {
                                                    setTechnologyAreas([])
                                                    return
                                                }
                                                setTechnologyAreas(['All'])
                                                return
                                            }

                                            if (technologyAreas.includes(value)) {

                                                const newAreas = technologyAreas.filter((area) => area !== value && area !== 'All')

                                                if (newAreas.length === 0) {
                                                    setTechnologyAreas(['All'])
                                                    return
                                                } else {
                                                    setTechnologyAreas(newAreas)
                                                }

                                                return
                                            }

                                            setTechnologyAreas([...technologyAreas.filter((area) => area !== 'All'), value])
                                        }}
                                        isActive={technologyAreas.includes(value)}
                                    >
                                        {value}
                                    </FilterButton>
                                ))
                            }
                        </Stack>
                        <Box
                            as={Swiper}
                            display={{ base: 'flex', lg: 'none' }}
                            className='boxSwiperOfflineCourse'
                            w='100%'
                            h='100%'
                            freeMode={true}
                            slidesPerView={'auto'}
                            spaceBetween={7}
                            initialSlide={1}
                            modules={[FreeMode]}
                        >
                            {
                                TechnologyArea.map((value, index) => (
                                    <SwiperSlide
                                        key={index}
                                        style={{ width: 'auto' }}
                                    >
                                        <FilterButton
                                            onClick={() => {
                                                if (value === 'All') {
                                                    if (technologyAreas.length === TechnologyArea.length) {
                                                        setTechnologyAreas([])
                                                        return
                                                    }
                                                    setTechnologyAreas(['All'])
                                                    return
                                                }

                                                if (technologyAreas.includes(value)) {

                                                    const newAreas = technologyAreas.filter((area) => area !== value && area !== 'All')

                                                    if (newAreas.length === 0) {
                                                        setTechnologyAreas(['All'])
                                                        return
                                                    } else {
                                                        setTechnologyAreas(newAreas)
                                                    }

                                                    return
                                                }

                                                setTechnologyAreas([...technologyAreas.filter((area) => area !== 'All'), value])
                                            }}
                                            isActive={technologyAreas.includes(value)}
                                        >
                                            {value}
                                        </FilterButton>
                                    </SwiperSlide>
                                ))
                            }
                        </Box>
                    </Stack>
                    <Stack
                        display={{ base: 'none', '2xl': 'flex' }}
                        w='max-content'
                        h='112px'
                        direction='row'
                        align='end'
                        zIndex='10'
                    >
                        <Text
                            as='p'
                            h='30px'
                            fontSize='16px'
                            textAlign='center'
                            w='max-content'
                        >
                            {`ระดับความยาก : `}
                        </Text>
                        <Menu
                            isLazy
                            closeOnSelect={false}
                        >
                            <MenuButton
                                as={Button}
                                h='34px'
                                p='0'
                                rightIcon={<ChevronDownIcon />}
                                variant='ghost'
                                _hover={{ bg: 'transparent' }}
                                _active={{ bg: 'transparent' }}
                            >
                                <Text
                                    as='p'
                                    fontSize='16px'
                                    fontWeight='bold'
                                    w='max-content'
                                >
                                    {selectedFilter}
                                </Text>
                            </MenuButton>
                            <MenuList
                                as='ul'
                            >
                                {
                                    LevelList.map((value, index) => (
                                        <MenuItem
                                            as='li'
                                            key={index}
                                        >
                                            <Checkbox
                                                colorScheme='blue'
                                                isChecked={checked[value]}
                                                onChange={() => {
                                                    if (value === 'All') {
                                                        setChecked({
                                                            All: true,
                                                            Beginner: false,
                                                            Intermediate: false,
                                                            Advance: false,
                                                            Expert: false,
                                                        })
                                                    } else {
                                                        const newChecked = {
                                                            ...checked,
                                                            [value]: !checked[value]
                                                        }
                                                        const lenCheckedFilter = Object.keys(newChecked).filter((key) => newChecked[key] === true)
                                                        const lenAllFilter = Object.keys(newChecked)

                                                        if (lenCheckedFilter.length+1 === lenAllFilter.length) {
                                                            for (let key in newChecked) {
                                                                newChecked[key] = false;
                                                            }
                                                            newChecked['All'] = true
                                                        }else{
                                                            newChecked['All'] = false
                                                        }

                                                        setChecked(newChecked)
                                                    }
                                                }}
                                            >
                                                {value}
                                            </Checkbox>
                                        </MenuItem>
                                    ))
                                }
                            </MenuList>
                        </Menu>
                    </Stack>
                </Stack>
                <Box
                    w='100%'
                    h='700px'
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
                                    {`ไม่สามารถแสดงคอร์สได้เนื่องจาก ยังไม่มีคอร์สเรียนในขณะนี้`}
                                </Text>
                            </Stack>
                            :
                            <Box
                                as={Swiper}
                                className='boxSwiperOfflineCourse'
                                w='100%'
                                h='100%'
                                py='1rem'
                                px={{ base: '0rem', lg: '0.5rem' }}
                                mt='5rem'
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onSwiper={(swiper: any) => swiperRef.current = swiper}
                                freeMode={true}
                                loop={false}
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
                                {cache.slice(0, 8).map((c, index) => (
                                    <SwiperSlide
                                        key={index}
                                        style={{ width: '340px' }}
                                    >
                                        <Center
                                            as={Link}
                                            href={c.courseUrl ? `${window.origin}/course/${c.courseUrl}_online` : `/course/${c.courseName.replaceAll(' ', '_')}_online`}
                                        >
                                            <OnlineCard course={c} />
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
                            </Box>
                    }
                </Box>
            </Container>
        </Stack>
    )
}