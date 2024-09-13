'use client'

import { TCourseGroup } from "@/app/admin/interface/CreateCourseInterface"
import { TCourseDrawer } from "@/app/course/interface/CourseInterface"
import { useSingleCourse } from "@/app/course/context/SingleCourseContext"
import { getAllCourseNameByMultiId } from "@/libs/AdminAPI"
import { getCourseGroup } from "@/redux/courseGroupSlide"
import { Box, Stack, Text, Center, Image, Divider, Portal, useBreakpointValue } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { TLiveRef } from "../interface/LiveTab"

const RoadmapIcon = ({ type }: { type: string }) => {

    const { state } = useSingleCourse()

    const courseGroup = useSelector(getCourseGroup)

    const renderIcon = () => {
        if (type === 'prev' && state.courseRoadmapPrevious) {
            return (
                <Center
                    w='60px'
                    h='60px'
                    borderRadius='full'
                    bg={state.courseColor[0] || '#E8F1FB'}
                    flexDirection='row'
                >
                    <Image
                        w='100%'
                        h='100%'
                        borderRadius='full'
                        src={
                            courseGroup.length > 0 && courseGroup.map((c: TCourseGroup) => {
                                const id = c.course
                                if (id?.includes(state.courseRoadmapPrevious)) {
                                    return c.courseGroupIcon
                                }
                            }).filter((c: string) => c !== undefined)
                            || 
                            ''
                        }
                        alt='roadmap previous course icon'
                    />
                </Center>
            )
        } else if ( type === 'current' ) {
            return (
                <Center
                    w='60px'
                    h='60px'
                    borderRadius='full'
                    border='2px'
                    borderColor={state.courseColor[1] || '#E8F1FB'}
                    bg={state.courseColor[0] || '#E8F1FB'}
                >
                    <Image
                        w='100%'
                        h='100%'
                        borderRadius='full'
                        src={
                            courseGroup.length > 0 && courseGroup.filter((c: TCourseGroup) => c.courseGroupName === state.courseGroupName).length > 0 ? courseGroup.filter((c: TCourseGroup) => c.courseGroupName === state.courseGroupName)[0].courseGroupIcon : ''
                        }
                        alt='roadmap current course icon'
                    />
                </Center>
            )
        } else if ( type === 'next' && state.courseRoadmapNext) {
            return (
                <Center
                    w='60px'
                    h='60px'
                    borderRadius='full'
                    bg={state.courseColor[0] || '#E8F1FB'}
                >
                    <Image
                        w='100%'
                        h='100%'
                        borderRadius='full'
                        src={
                            courseGroup.length > 0 && courseGroup.map((c: TCourseGroup) => {
                                const id = c.course
                                if (id?.includes(state.courseRoadmapNext)) {
                                    return c.courseGroupIcon
                                }
                            }).filter((c: string) => c !== undefined)
                            ||
                            ''
                        }
                        alt='roadmap next course icon'
                    />
                </Center>
            )
        } else {
            return <></>
        }
    }

    return renderIcon()
}

export const LiveRoadmap = ({ setTabRef }: { setTabRef: Dispatch<SetStateAction<TLiveRef>> }) => {

    const { state } = useSingleCourse()

    const [ roadmap, setRoadMap ] = useState<{
        prev: TCourseDrawer
        next: TCourseDrawer
    }>({
        prev: {
            _id: '',
            courseName: '',
            courseUrl: '',
        },
        next: {
            _id: '',
            courseName: '',
            courseUrl: '',
        }
    })

    const roadmapRef = useRef<HTMLDivElement>(null)

    const portalCurrent = useRef<HTMLDivElement | null>(null)
    const portalPrev = useRef<HTMLDivElement | null>(null)
    const portalNext = useRef<HTMLDivElement | null>(null)

    const router = useRouter()

    const breakpoint = useBreakpointValue({ base: false, md: true })

    useEffect(() => {
        setTabRef((prev) => ({
            ...prev,
            roadmap: roadmapRef
        }))

    }, [])
    useEffect(() => {
        if (state.courseRoadmapPrevious) {
            getAllCourseNameByMultiId([state.courseRoadmapPrevious], (data: TCourseDrawer[], error: unknown) => {
                if (error) console.log(error)
                if (data && data[0]) {
                    setRoadMap(prev => ({
                        ...prev,
                        prev: data[0]
                    }))
                }
            })
        }

        if (state.courseRoadmapNext) {
            getAllCourseNameByMultiId([state.courseRoadmapNext], (data: TCourseDrawer[], error: unknown) => {
                if (error) console.log(error)
                if (data && data[0]) {
                    setRoadMap(prev => ({
                        ...prev,
                        next: data[0]
                    }))
                }
            })
        }   
    }, [state.courseRoadmapPrevious, state.courseRoadmapNext])

    const handleClickPrev = () => {
        router.push(`/course/${roadmap.prev.courseUrl}`)
    }

    const handleClickNext = () => {
        router.push(`/course/${roadmap.next.courseUrl}`)
    }

    return (
        <Stack
            w='100%'
            h='100%'
            spacing='20px'
            ref={roadmapRef}
            scrollMarginTop='150px'
        >
            <Stack
                aria-label="Description"
                w='100%'
                direction='row'
                spacing='1rem'
            >
                <Box
                    w='7px'
                    h='53px'
                    bg='exBlue'
                    borderRadius='15px'
                >

                </Box>
                <Stack
                    w='100%'
                    spacing='1rem'
                >
                    <Text
                        as='h2'
                        fontWeight='bold'
                        fontSize='36px'
                    >
                        {`Roadmap`}
                    </Text>
                </Stack>
            </Stack>
            <Stack
                w='fit-content'
                h='100%'
                align='center'
                justify={{ base: 'center', 'md': 'start' }}
                direction={{ base: 'column', 'md': 'row' }}
                spacing={{ base: '0', '2xl': '0' }}
                mt={{ base: '2rem', 'md': '0' }}
            >
                {
                    roadmap.prev.courseName &&
                    <>
                        <Stack
                            w='fit-content'
                            h='100%'
                            spacing='0'
                            align='center'
                            textAlign='center'
                            ref={portalPrev}
                            position='relative'
                            cursor='pointer'
                            onClick={handleClickPrev}
                        >
                            <RoadmapIcon type='prev' />
                            <Portal
                                containerRef={portalPrev}
                            >
                                <Text
                                    w={{ base: 'max-content', 'md': '12rem' }}
                                    px={{ base: '1rem', 'md': '0' }}
                                    position='absolute'
                                    bottom={{ base: '30%', 'md': '-3rem' }}
                                    left={{ base: '100%', 'md': '-100%' }}
                                    fontWeight='900'
                                >
                                    {roadmap.prev.courseName}
                                </Text>
                            </Portal>
                        </Stack>
                        {
                            breakpoint ?
                                <Divider w='200px' h='10px' bg={state.courseColor[0]} />
                                :
                                <Divider w='10px' h='125px' bg={state.courseColor[0]} orientation="vertical" />
                        }
                    </>
                }
                <Stack
                    w='fit-content'
                    h='100%'
                    align='center'
                    textAlign='center'
                    ref={portalCurrent}
                    position='relative'
                    spacing='0'
                >
                    <RoadmapIcon type='current' />
                    <Portal
                        containerRef={portalCurrent}
                    >
                        <Text
                            w={{ base: 'max-content', 'md': '12rem' }}
                            px={{ base: '1rem', 'md': '0' }}
                            position='absolute'
                            bottom={{ base: '30%', 'md': '-3rem' }}
                            left={{ base: '100%', 'md': '-100%' }}
                            fontWeight='900'
                        >
                            {state.courseName}
                        </Text>
                    </Portal>
                </Stack>
                {
                    roadmap.next.courseName &&
                    <>
                        {
                            breakpoint ?
                                <Divider w='200px' h='10px' bg={'#E8F1FB'} />
                                :
                                <Divider w='10px' h='125px' bg={'#E8F1FB'} orientation="vertical" />
                        }
                        <Stack
                            w='fit-content'
                            h='100%'
                            spacing='0'
                            align='center'
                            textAlign='center'
                            ref={portalNext}
                            position='relative'
                            cursor='pointer'
                            onClick={handleClickNext}
                            direction={{ base: 'row', '2xl': 'column' }}
                        >
                            <RoadmapIcon type='next' />
                            <Portal
                                containerRef={portalNext}
                            >
                                <Text
                                    w={{ base: 'max-content', 'md': '12rem' }}
                                    px={{ base: '1rem', 'md': '0' }}
                                    position='absolute'
                                    bottom={{ base: '30%', 'md': '-3rem' }}
                                    left={{ base: '100%', 'md': '-100%' }}
                                    fontWeight='900'
                                >
                                    {roadmap.next.courseName}
                                </Text>
                            </Portal>
                        </Stack>
                    </>
                }
            </Stack>
        </Stack>
    )
}