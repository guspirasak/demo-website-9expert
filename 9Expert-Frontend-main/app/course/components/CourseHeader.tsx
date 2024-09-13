'use client'

import { TCourseCard } from "@/app/components/ContentCard/Card"
import { useDebounce } from "@/utils/useDebounce"
import { MagnifyingGlassIcon } from "@/app/icons/HomeIcons"
import { searchCourse } from "@/libs/AdminAPI"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { Heading, Highlight, Input, InputGroup, InputLeftAddon, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ICourseContext, TCourseContextState, useCourse } from "../context/CourseContext"
import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import _ from "lodash"

export const CourseHeader = () => {

    const { setState, setCache }: ICourseContext = useCourse()
    const courseGroup = useSelector(getCourseGroup)

    const [ search, setSearch ] = useState('')
    const debounceSearch = useDebounce(search, 1000)

    useEffect(() => {
        searchCourse(search, (data: TCourseCard[], error: unknown) => {
            if (error) {
                console.log(error)
            }

            const newGroup = _.groupBy(data, 'courseGroupName')

            const newCourse: TCourseContextState[] = []

            if (courseGroup.length > 0) {
                Object.values(newGroup).map((item: TCourseCard[], index: number) => {
                    const cg = courseGroup.find((cg: TCourseGroup) => cg.courseGroupName === Object.keys(newGroup)[index])
                    newCourse.push({
                        courseGroup: cg,
                        course: item
                    })
                })
            }

            const sortCg = newCourse.sort((a: TCourseContextState, b: TCourseContextState) => {
                if (a.courseGroup?.courseGroupName < b.courseGroup?.courseGroupName) {
                    return -1
                }
                if (a.courseGroup?.courseGroupName > b.courseGroup?.courseGroupName) {
                    return 1
                }
                return 0
            })


            setCache(sortCg)
            setState(sortCg)
        })
    }, [debounceSearch, courseGroup])
     
    return (
        <Stack
            id="service-topic"
            w='100%'
            h='100%'
            align='center'
            justify='center'
            bgImage={useColorModeValue('url("/banner/course_banner_bg.png")', 'url("/banner/course_banner_bg_dark.png")')}
            backgroundSize='cover'
            color='white'
        >
            <Heading as='h1' id="service-us" size={{ base: 'lg', lg: '2xl' }} >{`คอร์สเรียนทั้งหมด`}</Heading>
            <Text>
                <Highlight query={`ขับเคลื่อนประเทศไทย`} styles={{ color: 'white', fontWeight: 'bold' }}>
                    {`สอนแบ่งปันความรู้ เทคโนโลยีเพื่อ “ขับเคลื่อนประเทศไทย”`}
                </Highlight>
            </Text>
            <InputGroup
                id="search-course"
                w={{ base: '75%', lg: '50%' }}
                h={{ base: '31px', lg: '50px' }}
                mt='1rem'
                bg='white'
                alignItems='center'
                borderRadius='16px'
                border='0'
            >
                <InputLeftAddon
                    h={{ base: '31px', lg: '50px' }}
                    bg='white'
                    border='0'
                    borderRadius='16px'
                >
                    <MagnifyingGlassIcon color='#B2B0B0' w='20px' h='20px' />
                </InputLeftAddon>
                <Input
                    title="ค้นหาหลักสูตร"
                    h={{ base: '31px', lg: '50px' }}
                    borderRadius='16px'
                    placeholder='ค้นหาหลักสูตร'
                    textColor='black'
                    value={search}
                    border='0'
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
        </Stack>
    )
}