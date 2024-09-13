'use client'

import { CourseType, LevelList } from "@/libs/GlobalData"
import { Stack, Text, Wrap, WrapItem, useColorModeValue } from "@chakra-ui/react"
import { CourseFilterCheckbox, CourseProgramFilterButton, CourseTechnologyFilterButton, FilterButtonGroup } from "./CourseFilterButton"
import { useSelector } from "react-redux"
import { getTechnologyAreas } from "@/redux/technologyAreasSlide"
import { TCourseGroup, TTechnologyArea } from "@/app/admin/interface/CreateCourseInterface"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { useEffect, useState } from "react"
import { ICourseContext, TCourseContextState, useCourse } from "../context/CourseContext"
import { TCourseCard } from "@/app/components/ContentCard/Card"
import { useSearchParams } from "next/navigation"

export type TFilter = {
    technologyArea: string[]
    courseGroup: TCourseGroup[]
    selectedCourseGroup: string[]
    courseType: string[]
    difficultLevel: string[]
}

export const CourseFilter = () => {

    const { setState, cache }: ICourseContext = useCourse()

    const technology = useSearchParams().get('technology')

    const technologyArea = useSelector(getTechnologyAreas)
    const courseGroup = useSelector(getCourseGroup)

    const [ filter, setFilter ] = useState<TFilter>({
        technologyArea: ['All'],
        courseGroup: [],
        selectedCourseGroup: ['All'],
        courseType: ['All'],
        difficultLevel: ['All']
    })

    useEffect(() => {
        if (technology) {
            setFilter({
                courseGroup: courseGroup,
                selectedCourseGroup: ['All'],
                courseType: ['All'],
                difficultLevel: ['All'],
                technologyArea: [technology.replaceAll('_', ' ')]
            })
        } else {
            setFilter({
                technologyArea: ['All'],
                courseGroup: courseGroup,
                selectedCourseGroup: ['All'],
                courseType: ['All'],
                difficultLevel: ['All']
            }) 
        }
    }, [cache])

    useEffect(() => {
        if (filter.selectedCourseGroup[0] === 'All') {
            if (filter.technologyArea[0] === 'All') {
                setFilter({
                    ...filter,
                    courseGroup: courseGroup
                })
                setState(cache)
            } else {
                const newCache = cache.filter((c: TCourseContextState) => [
                    ...c.course.map((course: TCourseCard) => course.courseGroupName)
                ])
                setState(newCache)
            }
        }


        if (filter.technologyArea[0] !== 'All') {

            const filterTechnologyArea = technologyArea.filter((item: TTechnologyArea) => filter.technologyArea.includes(item.technologyName))

            const filterCourseGroup = filterTechnologyArea.map((item: TTechnologyArea) => item.courseGroup)

            setFilter({
                ...filter,
                courseGroup: courseGroup.filter((item: TCourseGroup) => filterCourseGroup.map((i: string[]) => i.includes(item._id as string)).includes(true))
            })
            
            setState((cache) => cache.filter((c: TCourseContextState) => filterCourseGroup.map((i: string[]) => i.includes(c.courseGroup._id as string)).includes(true)))
        }
    }, [filter.technologyArea])

    useEffect(() => {

        let newCache: TCourseContextState[] = cache

        if (filter.selectedCourseGroup[0] !== 'All') {
            cache.map(() => {
                newCache = cache.filter((g: TCourseContextState) => filter.selectedCourseGroup.includes(g.courseGroup.courseGroupName))
            })
        }

        if (filter.selectedCourseGroup[0] === 'All' && filter.technologyArea[0] !== 'All') {

            const filterTechnologyArea = technologyArea.filter((item: TTechnologyArea) => filter.technologyArea.includes(item.technologyName))

            const filterCourseGroup = filterTechnologyArea.map((item: TTechnologyArea) => item.courseGroup)

            setFilter({
                ...filter,
                courseGroup: courseGroup.filter((item: TCourseGroup) => filterCourseGroup.map((i: string[]) => i.includes(item._id as string)).includes(true))
            })

            newCache = cache.filter((c: TCourseContextState) => filterCourseGroup.map((i: string[]) => i.includes(c.courseGroup._id as string)).includes(true))
        }

        if (filter.courseType[0] !== 'All') {

            const newItem: TCourseContextState[] = []

            newCache.map((item: TCourseContextState) => {
                newItem.push({
                    ...item,
                    course: item.course.filter((c: TCourseCard) => filter.courseType.includes(c.courseType) ? c : null)
                })
            })

            newCache = newItem
        }

        if (filter.difficultLevel[0] !== 'All') {
            const newItem: TCourseContextState[] = []

            newCache.map((item: TCourseContextState) => {
                newItem.push({
                    ...item,
                    course: item.course.filter((c: TCourseCard) => filter.difficultLevel.includes(c.difficultLevel) ? c : null)
                })
            })
            const filterItem = newItem.filter((item: TCourseContextState) => item.course.length > 0)

            newCache = filterItem
        }

        setState(newCache)

    }, [filter.selectedCourseGroup, filter.courseType, filter.difficultLevel])

    return (
        <Stack
            w='100%'
            h='100%'
            spacing='2rem'
        >
            <Stack>
                <Text as='b' >{`เทคโนโลยีที่น่าสนใจ`}</Text>
                <Wrap>
                    <CourseTechnologyFilterButton
                        display={{ base: 'none', lg: 'block' }}
                        onClick={() => setFilter({ ...filter, technologyArea: ['All'], selectedCourseGroup: ['All'] })}
                        isActive={filter.technologyArea[0] === 'All'}
                    >
                        {'All'}
                    </CourseTechnologyFilterButton>
                    <CourseFilterCheckbox
                        display={{ base: 'flex', lg: 'none' }}
                        onChange={() => setFilter({ ...filter, technologyArea: ['All'], selectedCourseGroup: ['All'] })}
                        isChecked={filter.technologyArea[0] === 'All'}
                    >
                        {'All'}
                    </CourseFilterCheckbox>
                    {
                        technologyArea.map((item: TTechnologyArea, index: number) => (
                            <WrapItem key={index}>
                                <CourseTechnologyFilterButton 
                                    display={{ base: 'none', lg: 'block' }} 
                                    onClick={() => setFilter((prev: TFilter) => {
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
                                    })}
                                    isActive={filter.technologyArea.includes(item.technologyName)}
                                >
                                    {item.technologyName}
                                </CourseTechnologyFilterButton>
                                <CourseFilterCheckbox 
                                    display={{ base: 'flex', lg: 'none' }}
                                    onChange={() => setFilter((prev: TFilter) => {
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
                                    })}
                                    isChecked={filter.technologyArea.includes(item.technologyName)}
                                >
                                    {item.technologyName}
                                </CourseFilterCheckbox>
                            </WrapItem>
                        ))
                    }
                </Wrap>
            </Stack>
            <Stack>
                <Text as='b' >{`โปรแกรม`}</Text>
                <Wrap>
                    <CourseProgramFilterButton
                        display={{ base: 'none', lg: 'block' }}
                        onClick={() => setFilter({ ...filter, selectedCourseGroup: ['All'] })}
                        isActive={filter.selectedCourseGroup[0] === 'All'}
                    >
                        {`All`}
                    </CourseProgramFilterButton>
                    <CourseFilterCheckbox
                        display={{ base: 'flex', lg: 'none' }}
                        onChange={() => setFilter({ ...filter, selectedCourseGroup: ['All'] })}
                        isChecked={filter.selectedCourseGroup[0] === 'All'}
                    >
                        {'All'}
                    </CourseFilterCheckbox>
                    {
                        filter.courseGroup.map((item: TCourseGroup, index: number) => (
                            <WrapItem key={index}>
                                <CourseProgramFilterButton 
                                    display={{ base: 'none', lg: 'block' }}
                                    onClick={() => setFilter(prev => {
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
                                    })}
                                    isActive={filter.selectedCourseGroup.includes(item.courseGroupName)}
                                >
                                    {item.courseGroupNameAbbr}
                                </CourseProgramFilterButton>
                                <CourseFilterCheckbox 
                                    display={{ base: 'flex', lg: 'none' }}
                                    onChange={() => setFilter(prev => {
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
                                    })}
                                    isChecked={filter.selectedCourseGroup.includes(item.courseGroupName)}
                                >
                                    {item.courseGroupNameAbbr}
                                </CourseFilterCheckbox>
                            </WrapItem>
                        ))
                    }
                </Wrap>
            </Stack>
            <Stack
                direction={{ base: 'column', lg: 'row' }}
                w='100%'
                align='center'
                justify='space-between'
            >
                <Stack
                    w={{ base: '100%', lg: '50%' }}
                >
                    <Text as='b' >{`ประเภทหลักสูตร`}</Text>
                    <Stack
                        direction='row'
                        display={{ base: 'none', lg: 'flex' }}
                        m='0'
                        w='min-content'
                        h='50px'
                        color='#5D8BF4'
                        borderRadius='100px'
                        spacing='0'
                        bg={useColorModeValue('#EFF3FE', '#6584CD')}
                    >
                        {
                            CourseType.map((item, index) => (
                                <>
                                    <FilterButtonGroup
                                        key={index}
                                        onClick={() => setFilter((prev: TFilter) => {

                                            if (item.value === 'All') {
                                                return {
                                                    ...prev,
                                                    courseType: ['All']
                                                }
                                            }

                                            if (prev.courseType.includes(item.value)) {
                                                return {
                                                    ...prev,
                                                    courseType: prev.courseType.length === 1 ? ['All'] : prev.courseType.filter((t: string) => t !== item.value)
                                                }
                                            }
                                            return {
                                                ...prev,
                                                courseType: [...prev.courseType.filter((t: string) => t !== 'All'), item.value]
                                            }
                                        })}
                                        isActive={filter.courseType.includes(item.value)}
                                        textColor={useColorModeValue('#5D8BF4', 'white')}
                                        activeTextColor={useColorModeValue('white', 'white')}
                                        bgColor={useColorModeValue('#EFF3FE', '#6584CD')}
                                        activeBgColor={useColorModeValue('#5D8BF4', '#759CF6')}
                                    >
                                        {item.name}
                                    </FilterButtonGroup>
                                </>
                            ))
                        }
                    </Stack>
                    <Wrap
                        display={{ base: 'flex', lg: 'none' }}
                    >
                        {
                            CourseType.map((item, index) => (
                                <WrapItem key={index}>
                                    <CourseFilterCheckbox 
                                        onChange={() => setFilter(prev => {

                                            if (item.value === 'All') {
                                                return {
                                                    ...prev,
                                                    courseType: ['All']
                                                }
                                            }

                                            if (prev.courseType.includes(item.value)) {
                                                return {
                                                    ...prev,
                                                    courseType: prev.courseType.length === 1 ? ['All'] : prev.courseType.filter((t: string) => t !== item.value)
                                                }
                                            }
                                            return {
                                                ...prev,
                                                courseType: [...prev.courseType.filter((t: string) => t !== 'All'), item.value]
                                            }
                                        })}
                                        isChecked={filter.courseType.includes(item.value)}
                                    >
                                        {item.name}
                                    </CourseFilterCheckbox>
                                </WrapItem>
                            ))
                        }
                    </Wrap>
                </Stack>
                <Stack
                    w={{ base: '100%', lg: '50%' }}
                    spacing={{ base: '2rem', lg: '0' }}
                >
                    <Text as='b' >{`ระดับความยาก`}</Text>
                    <Stack
                        display={{ base: 'none', lg: 'flex' }}
                        direction='row'
                        m='0'
                        w='min-content'
                        h='50px'
                        color='#5D8BF4'
                        borderRadius='100px'
                        spacing='0'
                        bg={useColorModeValue('#EFEAFD', '#555EB3')}
                    >
                        {
                            LevelList.map((item, index) => (
                                <FilterButtonGroup
                                    key={index}
                                    onClick={() => setFilter((prev: TFilter) => {
                                        if (item === 'All') {
                                            return {
                                                ...prev,
                                                difficultLevel: ['All']
                                            }
                                        }

                                        if (prev.difficultLevel.includes(item)) {
                                            return {
                                                ...prev,
                                                difficultLevel: prev.difficultLevel.length === 1 ? ['All'] : prev.difficultLevel.filter((t: string) => t !== item)
                                            }
                                        }
                                        return {
                                            ...prev,
                                            difficultLevel: [...prev.difficultLevel.filter((t: string) => t !== 'All'), item]
                                        }
                                    })}
                                    isActive={filter.difficultLevel.includes(item)}
                                    textColor={useColorModeValue('#5F2DED', 'white')}
                                    activeTextColor={useColorModeValue('white', 'white')}
                                    bgColor={useColorModeValue('#EFEAFD', '#555EB3')}
                                    activeBgColor={useColorModeValue('#5F2DED', '#7244EF')}
                                >
                                    {item}
                                </FilterButtonGroup>
                            ))
                        }
                    </Stack>
                    <Wrap
                        display={{ base: 'flex', lg: 'none' }}
                    >
                        {
                            LevelList.map((item, index) => (
                                <WrapItem key={index}>
                                    <CourseFilterCheckbox 
                                        onChange={() => setFilter(prev => {
                                            if (item === 'All') {
                                                return {
                                                    ...prev,
                                                    difficultLevel: ['All']
                                                }
                                            }

                                            if (prev.difficultLevel.includes(item)) {
                                                return {
                                                    ...prev,
                                                    difficultLevel: prev.difficultLevel.length === 1 ? ['All'] : prev.difficultLevel.filter((t: string) => t !== item)
                                                }
                                            }
                                            return {
                                                ...prev,
                                                difficultLevel: [...prev.difficultLevel.filter((t: string) => t !== 'All'), item]
                                            }
                                        })}
                                        isChecked={filter.difficultLevel.includes(item)}
                                    >{item}</CourseFilterCheckbox>
                                </WrapItem>
                            ))
                        }
                    </Wrap>
                </Stack>
            </Stack>
        </Stack>
    )
}