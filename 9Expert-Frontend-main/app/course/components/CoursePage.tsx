'use client'

import { Navbar } from "@/app/components/layout/Navbar"
import { Button, Center, Container, Heading, Stack, useColorModeValue } from "@chakra-ui/react"
import { CourseHeader } from "./CourseHeader"
import { CourseFilter } from "./CourseFilter"
import { CourseContent } from "./CourseContent"
import { TCourseCard } from "@/app/components/ContentCard/Card"
import { ICourseContext, TCourseContextState, useCourse } from "../context/CourseContext"
import { useEffect, useState } from "react"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { useSelector } from "react-redux"
import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { Footer } from "@/app/components/layout/Footer"
import { Chat } from "@/app/components/Chat"
import _ from "lodash"

export const CoursePage = ({ courses }: { courses: TCourseCard[] }) => {

    const { state, setState, setCache }: ICourseContext = useCourse()
    const courseGroup = useSelector(getCourseGroup)

    const [page, setPage] = useState(1)

    const bgColor = useColorModeValue('rgba(28, 167, 236, 0.1)', '#2E2E2E')

    useEffect(() => {

        const newGroup = _.groupBy(courses, 'courseGroupName')

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
    }, [courseGroup])

    return (
        <>
            <Navbar />
            <Heading as='h1' hidden>คอร์สทั้งหมด</Heading>
            <Stack
                w='100%'
                h={{ base: '180px', lg: '380px' }}
                align='center'
                position='relative'
            >
                <CourseHeader />
            </Stack>
            <Container
                maxW={{ base: '100%', lg: '80%' }}
                my='2rem'
            >
                <Center
                    w='100%'
                    h='100%'
                    gap='2rem'
                >
                    <Stack
                        w='100%'
                        h={{ base: 'min-content', lg: '380px' }}
                        align='center'
                        position='relative'
                    >
                        <CourseFilter />
                    </Stack>
                </Center>
            </Container>
            {
                state.slice(0, page * 2).map((item: TCourseContextState, index: number) => (
                    state.filter(c => c.course.length > 0).length > 0 &&
                        index % 2 === 1 ?
                        item.course.length > 0 &&
                        <Stack
                            key={index}
                            w='100%'
                            h='min-content'
                            my='3rem'
                            align='center'
                            position='relative'
                            spacing='10rem'
                            bg={bgColor}
                        >
                            <Container
                                maxW={{ base: '100%', lg: '80%' }}
                                my='2rem'
                            >
                                <CourseContent {...item} />
                            </Container>
                        </Stack>
                        :
                        item.course.length > 0 &&
                        <Stack
                            key={index}
                            w='100%'
                            h='min-content'
                            my='3rem'
                            align='center'
                            position='relative'
                            spacing='10rem'
                        >
                            <Container
                                maxW={{ base: '100%', lg: '80%' }}
                                my='2rem'
                            >
                                <CourseContent {...item} />
                            </Container>
                        </Stack>
                ))
            }
            {
                state.filter(c => c.course.length > 0).length === 0 &&
                <>
                    <Stack
                        w='100%'
                        h='min-content'
                        mt='5rem'
                        mb='15rem'
                        align='center'
                        position='relative'
                        spacing='10rem'
                    >
                        <Heading as='h2' size='xl' >{`ไม่สามารถแสดงคอร์สได้เนื่องจาก ยังไม่มีคอร์สเรียนในขณะนี้`}</Heading>
                    </Stack>
                </>
            }
            {
                state.length > page * 2 &&
                <Stack
                    w='100%'
                    h='min-content'
                    minH='300px'
                    mt={{ base: '3rem', lg: '10rem' }}
                    mb='3rem'
                    align='center'
                    position='relative'
                >
                    <Button
                        w='350px'
                        h='56px'
                        color='white'
                        bgGradient='linear(135deg, rgba(64, 145, 244, 1), rgba(86, 189, 249, 1))'
                        onClick={() => setPage(page + 1)}
                        _hover={{
                            bgGradient: 'linear(135deg, rgba(64, 145, 244, 1), rgba(86, 189, 249, 1))',
                        }}
                        _active={{
                            bgGradient: 'linear(135deg, rgba(64, 145, 244, 1), rgba(86, 189, 249, 1))',
                        }}
                    >
                        {`แสดงเพิ่มเติม`}
                    </Button>
                </Stack>
            }
            <Chat />
            <Footer />
        </>
    )
}