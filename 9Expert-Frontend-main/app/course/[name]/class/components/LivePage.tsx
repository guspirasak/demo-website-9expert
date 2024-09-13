'use client'

import { Navbar } from "@/app/components/layout/Navbar"
import { Container, Stack, Wrap, WrapItem, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { LiveBanner } from "./LiveBanner"
import { LiveCalendar, MiniLiveCalendar } from "./LiveCalendar"
import { LiveTag } from "./LiveTag"
import { LiveTab } from "./LiveTab"
import { LiveCourseOutline } from "./LiveCourseOutline"
import { LiveDescription } from "./LiveDescription"
import { LiveRelatedCourse } from "./LiveRelatedCourse"
import { TCourseCard } from "@/app/components/ContentCard/Card"
import { ISingleCourseContext, useSingleCourse } from "@/app/course/context/SingleCourseContext"
import { useEffect, useRef, useState } from "react"
import { getCourseDetail } from "@/libs/AdminAPI"
import { TClassDetails } from "@/app/admin/interface/CreateCourseInterface"
import { TLiveRef } from "../interface/LiveTab"
import { Footer } from "@/app/components/layout/Footer"
import { LiveCourseRegister } from "./LiveCourseRegister"
import { LiveRoadmap } from "./LiveRoadmap"
import { Chat } from "@/app/components/Chat"

export const LivePage = ({ course }: { course: TCourseCard }) => {

    const { state, setState }: ISingleCourseContext = useSingleCourse()

    const benefitRef = useRef<HTMLDivElement>(null)
    const objectiveRef = useRef<HTMLDivElement>(null)
    const requirementRef = useRef<HTMLDivElement>(null)
    const topicRef = useRef<HTMLDivElement>(null)
    const roadmapRef = useRef<HTMLDivElement>(null)
    const relatedRef = useRef<HTMLDivElement>(null)
    const noteRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const [tabRef, setTabRef] = useState<TLiveRef>({
        benefit: benefitRef,
        objective: objectiveRef,
        requirement: requirementRef,
        topic: topicRef,
        roadmap: roadmapRef,
        related: relatedRef,
        note: noteRef,
    })

    const tagText = useColorModeValue(
        state.courseColor[1],
        'black'
    )

    const tagBg = useColorModeValue(
        `${state.courseColor[0]}10`,
        'white'
    )

    const breakpoint = useBreakpointValue({ base: false, xl: true })
    const breakpoint2XL = useBreakpointValue({ base: false, '2xl': true })

    useEffect(() => {
        getCourseDetail(course._id as string, (data: TClassDetails[], error: string) => {
            if (error) {
                return console.log(error)
            }
            setState({
                ...course,
                classDetails: data
            })
        })
    }, [])

    return (
        <>
            <Navbar />
            <Stack
                w='100%'
                h='max-content'
                align='center'
                position='relative'
            >
                <LiveBanner />
            </Stack>
            <Stack
                w='100%'
                h='min-content'
                align='start'
                justify='center'
                position='relative'
                direction={{ base: 'column', '2xl': 'row' }}
                mt='3rem'
            >
                <Stack
                    w={{ base: '100%', '2xl': '60%', '3xl': '70%' }}
                    h='min-content'
                    align='start'
                    ref={contentRef}
                >
                    <Container
                        maxW={{ base: '95%', xl: '80%' }}
                    >
                        <Stack
                            w='100%'
                            h='100%'
                            spacing='3rem'
                            justify='center'
                        >
                            <Wrap
                                w='100%'
                                display='flex'
                            >
                                <WrapItem>
                                    <LiveTag
                                        color={tagText}
                                        bg={tagBg}
                                    >
                                        {state.technologyArea}
                                    </LiveTag>
                                </WrapItem>
                                {
                                    state.skills.map((skill, index) => (
                                        <WrapItem
                                            key={index}
                                        >
                                            <LiveTag
                                                color={tagText}
                                                bg={tagBg}
                                            >
                                                {skill}
                                            </LiveTag>
                                        </WrapItem>
                                    ))
                                }
                                <WrapItem>
                                    <LiveTag
                                        color={tagText}
                                        bg={tagBg}
                                    >
                                        {`สอนสด`}
                                    </LiveTag>
                                </WrapItem>
                            </Wrap>
                            {
                                state.classDetails.length > 0 && breakpoint && <LiveCalendar classDetails={state.classDetails} course={course} />
                            }
                            <LiveDescription setTabRef={setTabRef} />
                            {
                                state.courseRoadmapNext || state.courseRoadmapPrevious ? (
                                    <LiveRoadmap setTabRef={setTabRef} />
                                ) : <></>
                            }
                        </Stack>
                    </Container>
                </Stack>
                <Stack
                    w={{ base: '100%', '2xl': '40%', '3xl': '564px' }}
                    h={{ base: 'max-content', '2xl': contentRef.current?.clientHeight }}
                    align='center'
                    position='relative'
                >
                    <Container
                        maxW={{ base: '95%', '2xl': '80%' }}
                        h={{ base: 'max-content', '2xl': contentRef.current?.clientHeight }}
                        display='flex'
                        justifyContent='center'
                    >
                        <Stack
                            w={{ base: '100%', md: '50%', '2xl': '100%' }}
                            maxW='100%'
                            h={{ base: 'max-content', '2xl': contentRef.current?.clientHeight }}
                            align='center'
                            justify={{ base: 'center', '2xl': 'start' }}
                            spacing='58px'
                            mt={{ base: '34px', '2xl': '0' }}
                        >
                            {breakpoint2XL && <LiveTab tabRef={tabRef} />}
                            {
                                state.classDetails.length > 0 && <MiniLiveCalendar classDetails={state.classDetails} course={course} />
                            }
                            {
                                state.catalogURL && <LiveCourseOutline />
                            }
                            <LiveCourseRegister id={course._id as string} />
                        </Stack>
                    </Container>
                </Stack>
            </Stack>

            <Stack
                w='100%'
                mt='5rem'
                pt={{ base: '2rem', xl: '5rem' }}
                align='center'
                bg={useColorModeValue('white', '#0B345D')}
            >
                {
                    state.relatedCourse.length > 0 && (
                        <Container
                            maxW={{ base: '95%', xl: '80%' }}
                        >
                            <LiveRelatedCourse setTabRef={setTabRef} relatedCourse={course.relatedCourse} />
                        </Container>
                    )
                }
            </Stack>

            <Chat />
            <Footer />
        </>
    )
}